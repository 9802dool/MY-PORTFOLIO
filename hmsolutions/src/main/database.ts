import Database from "better-sqlite3";
import { app } from "electron";
import { join } from "path";
import type {
  Category,
  CreateCategoryInput,
  CreateItemInput,
  DashboardStats,
  ItemWithCategory,
  ReportData,
  SearchItemsParams,
  UpdateCategoryInput,
  UpdateItemInput,
} from "../shared/types";

let db: Database.Database | null = null;

const LOW_STOCK_THRESHOLD = 5;
/** Bump and add conditional `ALTER` / data migrations when schema changes. */
const SCHEMA_VERSION = 2;

export function getDb(): Database.Database {
  if (!db) {
    throw new Error("Database not initialized");
  }
  return db;
}

export function closeDatabase(): void {
  if (db) {
    db.close();
    db = null;
  }
}

export function initDatabase(): void {
  const userData = app.getPath("userData");
  const dbPath = join(userData, "hm-solutions-inventory.db");
  db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE COLLATE NOCASE,
      description TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      sku TEXT UNIQUE COLLATE NOCASE,
      category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
      quantity REAL NOT NULL DEFAULT 0 CHECK (quantity >= 0),
      description TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_items_category ON items(category_id);
    CREATE INDEX IF NOT EXISTS idx_items_updated ON items(updated_at DESC);
  `);

  runMigrations(getDb());
}

/**
 * Incremental migrations: when SCHEMA_VERSION increases, add steps that run only once
 * (e.g. ALTER TABLE). Base tables are created above with IF NOT EXISTS.
 */
function runMigrations(database: Database.Database): void {
  const userVersion = Number(database.pragma("user_version", { simple: true }));
  if (userVersion < 2) {
    // v2: drop unit_price (HM Solutions tracks donations, not sales).
    // SQLite doesn't support DROP COLUMN before 3.35; recreate the table to be safe.
    database.exec(`
      CREATE TABLE IF NOT EXISTS items_v2 (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        sku TEXT UNIQUE COLLATE NOCASE,
        category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
        quantity REAL NOT NULL DEFAULT 0 CHECK (quantity >= 0),
        description TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
      INSERT OR IGNORE INTO items_v2 (id, name, sku, category_id, quantity, description, created_at, updated_at)
        SELECT id, name, sku, category_id, quantity, description, created_at, updated_at FROM items;
      DROP TABLE IF EXISTS items;
      ALTER TABLE items_v2 RENAME TO items;
      CREATE INDEX IF NOT EXISTS idx_items_category ON items(category_id);
      CREATE INDEX IF NOT EXISTS idx_items_updated ON items(updated_at DESC);
    `);
  }
  if (userVersion < SCHEMA_VERSION) {
    database.pragma(`user_version = ${SCHEMA_VERSION}`);
  }
}

export function listCategories(): Category[] {
  const stmt = getDb().prepare(
    `SELECT id, name, description, created_at FROM categories ORDER BY name COLLATE NOCASE ASC`,
  );
  return stmt.all() as Category[];
}

export function createCategory(input: CreateCategoryInput): Category {
  const stmt = getDb().prepare(
    `INSERT INTO categories (name, description) VALUES (@name, @description)
     RETURNING id, name, description, created_at`,
  );
  const row = stmt.get({
    name: input.name.trim(),
    description: input.description?.trim() || null,
  }) as Category;
  return row;
}

export function updateCategory(input: UpdateCategoryInput): Category | null {
  const stmt = getDb().prepare(
    `UPDATE categories SET name = @name, description = @description WHERE id = @id
     RETURNING id, name, description, created_at`,
  );
  const row = stmt.get({
    id: input.id,
    name: input.name.trim(),
    description: input.description?.trim() || null,
  }) as Category | undefined;
  return row ?? null;
}

export function deleteCategory(id: number): boolean {
  const stmt = getDb().prepare(`DELETE FROM categories WHERE id = ?`);
  const result = stmt.run(id);
  return result.changes > 0;
}

function mapItemRow(row: Record<string, unknown>): ItemWithCategory {
  return {
    id: row.id as number,
    name: row.name as string,
    sku: (row.sku as string | null) ?? null,
    category_id: (row.category_id as number | null) ?? null,
    quantity: Number(row.quantity),
    description: (row.description as string | null) ?? null,
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
    category_name: (row.category_name as string | null) ?? null,
  };
}

export function listItems(): ItemWithCategory[] {
  const stmt = getDb().prepare(`
    SELECT i.id, i.name, i.sku, i.category_id, i.quantity, i.description,
           i.created_at, i.updated_at, c.name AS category_name
    FROM items i
    LEFT JOIN categories c ON c.id = i.category_id
    ORDER BY i.updated_at DESC, i.name COLLATE NOCASE ASC
  `);
  const rows = stmt.all() as Record<string, unknown>[];
  return rows.map(mapItemRow);
}

export function searchItems(params: SearchItemsParams): ItemWithCategory[] {
  const query = (params.query ?? "").trim();
  const categoryId = params.categoryId;

  let sql = `
    SELECT i.id, i.name, i.sku, i.category_id, i.quantity, i.description,
           i.created_at, i.updated_at, c.name AS category_name
    FROM items i
    LEFT JOIN categories c ON c.id = i.category_id
    WHERE 1=1
  `;
  const bind: Record<string, string | number | null> = {};

  if (query.length > 0) {
    sql += ` AND (
      i.name LIKE @q OR IFNULL(i.sku, '') LIKE @q OR IFNULL(i.description, '') LIKE @q
    )`;
    bind.q = `%${query}%`;
  }
  if (categoryId !== undefined && categoryId !== null) {
    sql += ` AND i.category_id = @cat`;
    bind.cat = categoryId;
  }
  sql += ` ORDER BY i.updated_at DESC, i.name COLLATE NOCASE ASC`;

  const stmt = getDb().prepare(sql);
  const rows = stmt.all(bind) as Record<string, unknown>[];
  return rows.map(mapItemRow);
}

export function getReportData(params: SearchItemsParams): ReportData {
  const items = searchItems(params);
  let totalQty = 0;
  for (const i of items) {
    totalQty += i.quantity;
  }
  return { items, totalQty };
}

export function createItem(input: CreateItemInput): ItemWithCategory {
  const stmt = getDb().prepare(`
    INSERT INTO items (name, sku, category_id, quantity, description)
    VALUES (@name, @sku, @category_id, @quantity, @description)
  `);
  const result = stmt.run({
    name: input.name.trim(),
    sku: input.sku?.trim() || null,
    category_id: input.category_id ?? null,
    quantity: input.quantity,
    description: input.description?.trim() || null,
  });
  const id = Number(result.lastInsertRowid);
  return getItemById(id)!;
}

export function updateItem(input: UpdateItemInput): ItemWithCategory | null {
  const stmt = getDb().prepare(`
    UPDATE items SET
      name = @name,
      sku = @sku,
      category_id = @category_id,
      quantity = @quantity,
      description = @description,
      updated_at = datetime('now')
    WHERE id = @id
  `);
  const result = stmt.run({
    id: input.id,
    name: input.name.trim(),
    sku: input.sku?.trim() || null,
    category_id: input.category_id ?? null,
    quantity: input.quantity,
    description: input.description?.trim() || null,
  });
  if (result.changes === 0) return null;
  return getItemById(input.id);
}

export function deleteItem(id: number): boolean {
  const stmt = getDb().prepare(`DELETE FROM items WHERE id = ?`);
  const result = stmt.run(id);
  return result.changes > 0;
}

export function getItemById(id: number): ItemWithCategory | null {
  const stmt = getDb().prepare(`
    SELECT i.id, i.name, i.sku, i.category_id, i.quantity, i.description,
           i.created_at, i.updated_at, c.name AS category_name
    FROM items i
    LEFT JOIN categories c ON c.id = i.category_id
    WHERE i.id = ?
  `);
  const row = stmt.get(id) as Record<string, unknown> | undefined;
  return row ? mapItemRow(row) : null;
}

export function getDashboardStats(): DashboardStats {
  const totalRow = getDb()
    .prepare(`SELECT COUNT(*) AS c FROM items`)
    .get() as { c: number };
  const lowStock = getDb()
    .prepare(`SELECT COUNT(*) AS c FROM items WHERE quantity <= ? AND quantity >= 0`)
    .get(LOW_STOCK_THRESHOLD) as { c: number };
  const catCount = getDb()
    .prepare(`SELECT COUNT(*) AS c FROM categories`)
    .get() as { c: number };

  return {
    totalItems: totalRow.c,
    lowStockCount: lowStock.c,
    categoryCount: catCount.c,
  };
}

export function getRecentItems(limit = 10): ItemWithCategory[] {
  const stmt = getDb().prepare(`
    SELECT i.id, i.name, i.sku, i.category_id, i.quantity, i.description,
           i.created_at, i.updated_at, c.name AS category_name
    FROM items i
    LEFT JOIN categories c ON c.id = i.category_id
    ORDER BY i.updated_at DESC
    LIMIT ?
  `);
  const rows = stmt.all(limit) as Record<string, unknown>[];
  return rows.map(mapItemRow);
}

export function getLowStockItems(): ItemWithCategory[] {
  const stmt = getDb().prepare(`
    SELECT i.id, i.name, i.sku, i.category_id, i.quantity, i.description,
           i.created_at, i.updated_at, c.name AS category_name
    FROM items i
    LEFT JOIN categories c ON c.id = i.category_id
    WHERE i.quantity <= ?
    ORDER BY i.quantity ASC, i.name COLLATE NOCASE ASC
  `);
  const rows = stmt.all(LOW_STOCK_THRESHOLD) as Record<string, unknown>[];
  return rows.map(mapItemRow);
}
