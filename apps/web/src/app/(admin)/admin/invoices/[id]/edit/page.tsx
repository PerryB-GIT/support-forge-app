"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

interface InvoiceItem {
  id?: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

interface Client {
  id: string;
  name: string;
  email: string;
}

interface Invoice {
  id: string;
  number: string;
  amount: string;
  status: string;
  dueDate: string;
  paidDate: string | null;
  client: Client;
  items: InvoiceItem[];
}

export default function EditInvoicePage() {
  const router = useRouter();
  const params = useParams();
  const invoiceId = params.id as string;

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    status: "pending",
    dueDate: "",
    paidDate: "",
  });

  const [items, setItems] = useState<InvoiceItem[]>([]);

  useEffect(() => {
    async function fetchInvoice() {
      try {
        const res = await fetch(`/api/admin/invoices/${invoiceId}`);
        if (res.ok) {
          const data = await res.json();
          setInvoice(data.invoice);
          setFormData({
            status: data.invoice.status,
            dueDate: new Date(data.invoice.dueDate).toISOString().split("T")[0],
            paidDate: data.invoice.paidDate
              ? new Date(data.invoice.paidDate).toISOString().split("T")[0]
              : "",
          });
          setItems(
            data.invoice.items.map((item: InvoiceItem) => ({
              description: item.description,
              quantity: item.quantity,
              unitPrice: Number(item.unitPrice),
            }))
          );
        } else {
          setError("Failed to load invoice");
        }
      } catch {
        setError("Failed to load invoice");
      } finally {
        setLoading(false);
      }
    }

    fetchInvoice();
  }, [invoiceId]);

  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, unitPrice: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...items];
    if (field === "quantity" || field === "unitPrice") {
      newItems[index][field] = Number(value);
    } else {
      newItems[index][field] = value as string;
    }
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/invoices/${invoiceId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          paidDate: formData.paidDate || null,
          items,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Failed to update invoice");
      } else {
        router.push(`/admin/invoices/${invoiceId}`);
        router.refresh();
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-3xl animate-pulse">
        <div className="h-8 bg-elevated rounded w-48 mb-8" />
        <div className="bg-surface border border-border-subtle rounded-xl p-6 space-y-5">
          <div className="h-10 bg-elevated rounded" />
          <div className="h-10 bg-elevated rounded" />
          <div className="h-32 bg-elevated rounded" />
        </div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">Invoice not found</h2>
        <Link href="/admin/invoices" className="text-accent hover:underline">
          Back to Invoices
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          href={`/admin/invoices/${invoiceId}`}
          className="text-text-muted hover:text-text-secondary text-sm inline-flex items-center gap-1 mb-4"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Invoice
        </Link>
        <h1
          className="text-2xl lg:text-3xl font-bold"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Edit Invoice {invoice.number}
        </h1>
        <p className="text-text-secondary mt-1">
          Client: {invoice.client.name}
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-surface border border-border-subtle rounded-xl p-6 space-y-6"
      >
        {error && (
          <div className="p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm">
            {error}
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-text-secondary mb-1.5"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-text-secondary mb-1.5"
            >
              Due Date *
            </label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              required
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="paidDate"
              className="block text-sm font-medium text-text-secondary mb-1.5"
            >
              Paid Date
            </label>
            <input
              id="paidDate"
              name="paidDate"
              type="date"
              value={formData.paidDate}
              onChange={(e) => setFormData({ ...formData, paidDate: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
            />
          </div>
        </div>

        {/* Line Items */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Line Items</h3>
            <button
              type="button"
              onClick={addItem}
              className="text-sm text-accent hover:underline"
            >
              + Add Item
            </button>
          </div>

          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="flex gap-3 items-start">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => updateItem(index, "description", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                    required
                  />
                </div>
                <div className="w-20">
                  <input
                    type="number"
                    placeholder="Qty"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, "quantity", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                    required
                  />
                </div>
                <div className="w-28">
                  <input
                    type="number"
                    placeholder="Price"
                    step="0.01"
                    min="0"
                    value={item.unitPrice}
                    onChange={(e) => updateItem(index, "unitPrice", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="p-2.5 text-text-muted hover:text-error transition-colors"
                  disabled={items.length === 1}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-border-subtle flex justify-end">
            <div className="text-right">
              <p className="text-sm text-text-muted">Total</p>
              <p className="text-xl font-bold">${calculateTotal().toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-subtle">
          <Link
            href={`/admin/invoices/${invoiceId}`}
            className="px-4 py-2.5 rounded-lg text-text-secondary hover:text-text-primary transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
