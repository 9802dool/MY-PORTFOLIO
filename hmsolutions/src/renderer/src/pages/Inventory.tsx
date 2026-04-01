import { useCallback, useEffect, useMemo, useState } from "react";
import Modal from "../components/Modal";
import { getApi } from "../lib/api";
import type { Category, CreateItemInput, ItemWithCategory, UpdateItemInput } from "../../../shared/types";

const emptyForm: CreateItemInput = {
  name: "",
  sku: "",
  category_id: null,
  quantity: 0,
  description: "",
};

export default function Inventory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<ItemWithCategory[]>([]);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<CreateItemInput>(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState<ItemWithCategory | null>(null);

  const loadCategories = useCallback(async () => {
    const api = getApi();
    setCategories(await api.categories.list());
  }, []);

  const loadItems = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const api = getApi();
      const catId =
        categoryFilter === "" ? undefined : Number.parseInt(categoryFilter, 10);
      const list = await api.items.search({
        query: query.trim() || undefined,
        categoryId: Number.isNaN(catId as number) ? undefined : catId,
      });
      setItems(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load inventory");
    } finally {
      setLoading(false);
    }
  }, [query, categoryFilter]);

  useEffect(() => {
    void loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    const t = window.setTimeout(() => void loadItems(), 200);
    return () => window.clearTimeout(t);
  }, [loadItems]);

  const openCreate = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
    setModalOpen(true);
  };

  const openEdit = (item: ItemWithCategory) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      sku: item.sku ?? "",
      category_id: item.category_id,
      quantity: item.quantity,
      description: item.description ?? "",
    });
    setModalOpen(true);
  };

  const submitItem = async () => {
    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }
    setError(null);
    try {
      const api = getApi();
      if (editingId != null) {
        const input: UpdateItemInput = { ...form, id: editingId };
        await api.items.update(input);
      } else {
        await api.items.create(form);
      }
      setModalOpen(false);
      await loadItems();
      await loadCategories();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save item");
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      const api = getApi();
      await api.items.delete(deleteTarget.id);
      setDeleteTarget(null);
      await loadItems();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not delete item");
    }
  };

  const categoryOptions = useMemo(
    () =>
      categories.map((c) => (
        <option key={c.id} value={c.id}>
          {c.name}
        </option>
      )),
    [categories],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Inventory</h1>
          <p className="mt-1 text-sm text-slate-600">Track donated items and stock levels.</p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="rounded-lg bg-brand-accent px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-600"
        >
          Add item
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <input
          type="search"
          placeholder="Search name, SKU, description…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="min-w-[200px] flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          <option value="">All categories</option>
          {categoryOptions}
        </select>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </div>
      ) : null}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-700">Name</th>
                <th className="px-4 py-3 font-semibold text-slate-700">SKU</th>
                <th className="px-4 py-3 font-semibold text-slate-700">Category</th>
                <th className="px-4 py-3 font-semibold text-slate-700">Qty</th>
                <th className="px-4 py-3 font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-slate-500">
                    Loading…
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-slate-500">
                    No items match your filters.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80">
                    <td className="px-4 py-3 font-medium text-slate-900">{item.name}</td>
                    <td className="px-4 py-3 text-slate-600">{item.sku ?? "—"}</td>
                    <td className="px-4 py-3 text-slate-600">{item.category_name ?? "—"}</td>
                    <td className="px-4 py-3">{item.quantity}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(item)}
                          className="text-brand-accent hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(item)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        title={editingId != null ? "Edit item" : "Add item"}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        footer={
          <>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => void submitItem()}
              className="rounded-lg bg-brand-accent px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
            >
              Save
            </button>
          </>
        }
      >
        <div className="grid gap-3">
          <label className="block text-sm font-medium text-slate-700">
            Name *
            <input
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            SKU
            <input
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              value={form.sku ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, sku: e.target.value || null }))}
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Category
            <select
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              value={form.category_id ?? ""}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  category_id: e.target.value === "" ? null : Number(e.target.value),
                }))
              }
            >
              <option value="">None</option>
              {categoryOptions}
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Quantity
            <input
              type="number"
              min={0}
              step="any"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              value={form.quantity}
              onChange={(e) =>
                setForm((f) => ({ ...f, quantity: Number(e.target.value) || 0 }))
              }
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Description
            <textarea
              rows={3}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              value={form.description ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value || null }))}
            />
          </label>
        </div>
      </Modal>

      <Modal
        title="Delete item?"
        open={deleteTarget != null}
        onClose={() => setDeleteTarget(null)}
        footer={
          <>
            <button
              type="button"
              onClick={() => setDeleteTarget(null)}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => void confirmDelete()}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Delete
            </button>
          </>
        }
      >
        <p className="text-sm text-slate-600">
          Remove <strong>{deleteTarget?.name}</strong> from inventory? This cannot be undone.
        </p>
      </Modal>
    </div>
  );
}
