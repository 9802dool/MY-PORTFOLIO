import { useCallback, useEffect, useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import Papa from "papaparse";
import { getApi } from "../lib/api";
import type { Category, ItemWithCategory } from "../../../shared/types";

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function Reports() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<ItemWithCategory[]>([]);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalQty, setTotalQty] = useState(0);

  const load = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const api = getApi();
      const categoryId =
        categoryFilter === ""
          ? undefined
          : Number.parseInt(categoryFilter, 10) || undefined;
      const [cats, report] = await Promise.all([
        api.categories.list(),
        api.reports.data({
          query: query.trim() || undefined,
          categoryId,
        }),
      ]);
      setCategories(cats);
      setItems(report.items);
      setTotalQty(report.totalQty);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [query, categoryFilter]);

  useEffect(() => {
    const t = window.setTimeout(() => void load(), 200);
    return () => window.clearTimeout(t);
  }, [load]);

  const exportCsv = () => {
    const rows = items.map((i) => ({
      Name: i.name,
      SKU: i.sku ?? "",
      Category: i.category_name ?? "",
      Quantity: i.quantity,
      Description: i.description ?? "",
    }));
    const csv = Papa.unparse(rows, { header: true });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
    downloadBlob(blob, `hm-solutions-inventory-${stamp}.csv`);
  };

  const exportPdf = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const margin = 48;
    let y = margin;

    doc.setFontSize(16);
    doc.text("HM SOLUTIONS — Donation Inventory Report", margin, y);
    y += 28;
    doc.setFontSize(10);
    doc.setTextColor(80);
    doc.text(`Generated ${new Date().toLocaleString()}`, margin, y);
    y += 24;
    doc.setTextColor(0);

    const filterLine =
      (query.trim() ? `Search: ${query.trim()}` : "Search: (all)") +
      " · " +
      (categoryFilter
        ? `Category: ${categories.find((c) => String(c.id) === categoryFilter)?.name ?? categoryFilter}`
        : "Category: (all)");
    doc.text(filterLine, margin, y);
    y += 28;

    doc.setFontSize(11);
    doc.text(`Items: ${items.length}`, margin, y);
    y += 18;
    doc.text(`Total quantity: ${totalQty.toFixed(2)}`, margin, y);
    y += 28;

    doc.setFontSize(9);
    const lineHeight = 14;
    const maxY = doc.internal.pageSize.getHeight() - margin;

    for (const item of items) {
      const block = [
        `${item.name}  |  Qty ${item.quantity}`,
        `  ${item.category_name ?? "Uncategorized"}${item.sku ? `  ·  SKU ${item.sku}` : ""}`,
      ];
      if (y + block.length * lineHeight > maxY) {
        doc.addPage();
        y = margin;
      }
      for (const line of block) {
        doc.text(line, margin, y);
        y += lineHeight;
      }
      y += 6;
    }

    const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
    doc.save(`hm-solutions-inventory-${stamp}.pdf`);
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
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Reports</h1>
        <p className="mt-1 text-sm text-slate-600">
          Filter your inventory, then export to CSV or PDF.
        </p>
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
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm"
        >
          <option value="">All categories</option>
          {categoryOptions}
        </select>
        <button
          type="button"
          onClick={exportCsv}
          disabled={loading || items.length === 0}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Export CSV
        </button>
        <button
          type="button"
          onClick={exportPdf}
          disabled={loading || items.length === 0}
          className="rounded-lg bg-brand-accent px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Export PDF
        </button>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </div>
      ) : null}

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-600">
          <strong className="text-slate-900">{items.length}</strong> rows · Total quantity{" "}
          <strong>{totalQty.toFixed(2)}</strong>
        </p>
        {loading ? (
          <p className="mt-4 text-sm text-slate-500">Loading…</p>
        ) : items.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">No data for this filter.</p>
        ) : (
          <p className="mt-2 text-xs text-slate-400">
            Preview uses the same filters as export. Open Inventory for full editing.
          </p>
        )}
      </div>
    </div>
  );
}
