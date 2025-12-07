"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Client {
  id: string;
  name: string;
  email: string;
}

export default function NewAppointmentPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    fetch("/api/admin/clients")
      .then((res) => res.json())
      .then((data) => setClients(data.clients || []))
      .catch(() => setClients([]));
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;

    const data = {
      clientId: formData.get("clientId") as string,
      date: new Date(`${date}T${time}`).toISOString(),
      duration: parseInt(formData.get("duration") as string),
      type: formData.get("type") as string,
      status: formData.get("status") as string,
      notes: formData.get("notes") as string,
      meetingUrl: formData.get("meetingUrl") as string,
    };

    try {
      const res = await fetch("/api/admin/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Failed to create appointment");
      } else {
        router.push("/admin/appointments");
        router.refresh();
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <Link
          href="/admin/appointments"
          className="text-text-muted hover:text-text-secondary text-sm inline-flex items-center gap-1 mb-4"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Appointments
        </Link>
        <h1
          className="text-2xl lg:text-3xl font-bold"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Schedule Appointment
        </h1>
        <p className="text-text-secondary mt-1">Schedule a new appointment with a client</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-surface border border-border-subtle rounded-xl p-6 space-y-5"
      >
        {error && (
          <div className="p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="clientId" className="block text-sm font-medium text-text-secondary mb-1.5">
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

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-text-secondary mb-1.5">
              Date *
            </label>
            <input
              id="date"
              name="date"
              type="date"
              required
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-medium text-text-secondary mb-1.5">
              Time *
            </label>
            <input
              id="time"
              name="time"
              type="time"
              required
              className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-text-secondary mb-1.5">
              Type *
            </label>
            <select
              id="type"
              name="type"
              required
              className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
            >
              <option value="consultation">Consultation</option>
              <option value="support">Support</option>
              <option value="review">Project Review</option>
              <option value="planning">Planning</option>
              <option value="training">Training</option>
            </select>
          </div>

          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-text-secondary mb-1.5">
              Duration (minutes)
            </label>
            <select
              id="duration"
              name="duration"
              defaultValue="60"
              className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">1 hour</option>
              <option value="90">1.5 hours</option>
              <option value="120">2 hours</option>
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-text-secondary mb-1.5">
              Status
            </label>
            <select
              id="status"
              name="status"
              defaultValue="SCHEDULED"
              className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
            >
              <option value="SCHEDULED">Scheduled</option>
              <option value="CONFIRMED">Confirmed</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="meetingUrl" className="block text-sm font-medium text-text-secondary mb-1.5">
            Meeting URL
          </label>
          <input
            id="meetingUrl"
            name="meetingUrl"
            type="url"
            className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
            placeholder="https://zoom.us/j/..."
          />
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-text-secondary mb-1.5">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors resize-none"
            placeholder="Agenda, topics to discuss..."
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-subtle">
          <Link
            href="/admin/appointments"
            className="px-4 py-2.5 rounded-lg text-text-secondary hover:text-text-primary transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Scheduling..." : "Schedule Appointment"}
          </button>
        </div>
      </form>
    </div>
  );
}
