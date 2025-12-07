"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Client {
  id: string;
  name: string;
  email: string;
  company?: string;
}

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export default function NewInvoicePage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [items, setItems] = useState<InvoiceItem[]>([
    { description: "", quantity: 1, unitPrice: 0 },
  ]);

  useEffect(() => {
    fetch("/api/admin/clients")
      .then((res) => res.json())
      .then((data) => setClients(data.clients || []))
      .catch(() => setClients([]));
  }, []);

  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, unitPrice: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
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

  const total = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      clientId: formData.get("clientId") as string,
      dueDate: formData.get("dueDate") as string,
      items: items.filter((item) => item.description && item.unitPrice > 0),
      sendEmail: formData.get("sendEmail") === "on",
    };

    if (data.items.length === 0) {
      setError("Please add at least one item");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Failed to create invoice");
      } else {
        router.push("/admin/invoices");
        router.refresh();
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/invoices"
          className="text-text-muted hover:text-text-secondary text-sm inline-flex items-center gap-1 mb-4"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Invoices
        </Link>
        <h1
          className="text-2xl lg:text-3xl font-bold"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Create Invoice
        </h1>
        <p className="text-text-secondary mt-1">Generate a new invoice for a client</p>
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

        {/* Client Selection */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="clientId"
              className="block text-sm font-medium text-text-secondary mb-1.5"
            >
              Client *
            </label>
            <select
              id="clientId"
              name="clientId"
              required
              className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
            >
              <option value="">Select a client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name} ({client.email})
                </option>
              ))}
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
              min={new Date().toISOString().split("T")[0]}
              defaultValue={
                new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
              }
              className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
            />
          </div>
        </div>

        {/* Line Items */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-text-secondary">Line Items</label>
            <button
              type="button"
              onClick={addItem}
              className="text-accent hover:text-accent-hover text-sm font-medium flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Item
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
                  />
                </div>
                <div className="w-24">
                  <input
                    type="number"
                    placeholder="Qty"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, "quantity", e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors text-center"
                  />
                </div>
                <div className="w-32">
                  <input
                    type="number"
                    placeholder="Price"
                    min="0"
                    step="0.01"
                    value={item.unitPrice || ""}
                    onChange={(e) => updateItem(index, "unitPrice", e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                  />
                </div>
                <div className="w-28 py-2.5 text-right font-medium">
                  {formatCurrency(item.quantity * item.unitPrice)}
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

          {/* Total */}
          <div className="flex justify-end mt-4 pt-4 border-t border-border-subtle">
            <div className="text-right">
              <p className="text-text-muted text-sm">Total Amount</p>
              <p className="text-2xl font-bold text-accent">{formatCurrency(total)}</p>
            </div>
          </div>
        </div>

        {/* Send Email Option */}
        <div className="flex items-center gap-3 p-4 rounded-lg bg-elevated">
          <input
            id="sendEmail"
            name="sendEmail"
            type="checkbox"
            className="w-4 h-4 rounded border-border-subtle bg-elevated text-accent focus:ring-accent focus:ring-offset-0"
          />
          <label htmlFor="sendEmail" className="text-sm">
            <span className="font-medium">Send invoice via email</span>
            <p className="text-text-muted">The client will receive an email with the invoice details</p>
          </label>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-subtle">
          <Link
            href="/admin/invoices"
            className="px-4 py-2.5 rounded-lg text-text-secondary hover:text-text-primary transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading || total === 0}
            className="px-6 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create Invoice"}
          </button>
        </div>
      </form>
    </div>
  );
}
