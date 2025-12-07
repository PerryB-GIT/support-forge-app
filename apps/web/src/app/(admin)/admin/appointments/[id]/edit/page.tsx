"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

interface Client {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
}

interface Appointment {
  id: string;
  date: string;
  duration: number;
  type: string;
  status: string;
  notes: string | null;
  meetingUrl: string | null;
  client: Client;
}

export default function EditAppointmentPage() {
  const router = useRouter();
  const params = useParams();
  const appointmentId = params.id as string;

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    duration: "60",
    type: "consultation",
    status: "SCHEDULED",
    notes: "",
    meetingUrl: "",
  });

  useEffect(() => {
    async function fetchAppointment() {
      try {
        const res = await fetch(`/api/admin/appointments/${appointmentId}`);
        if (res.ok) {
          const data = await res.json();
          setAppointment(data.appointment);

          const dateObj = new Date(data.appointment.date);
          setFormData({
            date: dateObj.toISOString().split("T")[0],
            time: dateObj.toTimeString().slice(0, 5),
            duration: String(data.appointment.duration),
            type: data.appointment.type,
            status: data.appointment.status,
            notes: data.appointment.notes || "",
            meetingUrl: data.appointment.meetingUrl || "",
          });
        } else {
          setError("Failed to load appointment");
        }
      } catch {
        setError("Failed to load appointment");
      } finally {
        setLoading(false);
      }
    }

    fetchAppointment();
  }, [appointmentId]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const dateTime = new Date(`${formData.date}T${formData.time}`);

      const res = await fetch(`/api/admin/appointments/${appointmentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: dateTime.toISOString(),
          duration: parseInt(formData.duration),
          type: formData.type,
          status: formData.status,
          notes: formData.notes || null,
          meetingUrl: formData.meetingUrl || null,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Failed to update appointment");
      } else {
        router.push("/admin/appointments");
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
      <div className="max-w-2xl animate-pulse">
        <div className="h-8 bg-elevated rounded w-48 mb-8" />
        <div className="bg-surface border border-border-subtle rounded-xl p-6 space-y-5">
          <div className="h-10 bg-elevated rounded" />
          <div className="h-10 bg-elevated rounded" />
          <div className="h-32 bg-elevated rounded" />
        </div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">Appointment not found</h2>
        <Link href="/admin/appointments" className="text-accent hover:underline">
          Back to Appointments
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      {/* Header */}
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
          Edit Appointment
        </h1>
        <p className="text-text-secondary mt-1">
          Appointment with {appointment.client.name}
        </p>
      </div>

      {/* Client Info */}
      <div className="bg-surface border border-border-subtle rounded-xl p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
            {appointment.client.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <Link
              href={`/admin/clients/${appointment.client.id}`}
              className="font-semibold text-accent hover:underline"
            >
              {appointment.client.name}
            </Link>
            <p className="text-sm text-text-muted">{appointment.client.email}</p>
            {appointment.client.phone && (
              <p className="text-sm text-text-muted">{appointment.client.phone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-surface border border-border-subtle rounded-xl p-6 space-y-5"
      >
        {error && (
          <div className="p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm">
            {error}
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-text-secondary mb-1.5"
            >
              Date *
            </label>
            <input
              id="date"
              name="date"
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="time"
              className="block text-sm font-medium text-text-secondary mb-1.5"
            >
              Time *
            </label>
            <input
              id="time"
              name="time"
              type="time"
              required
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="duration"
              className="block text-sm font-medium text-text-secondary mb-1.5"
            >
              Duration (minutes)
            </label>
            <select
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
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
            <label
              htmlFor="type"
              className="block text-sm font-medium text-text-secondary mb-1.5"
            >
              Type *
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
            >
              <option value="consultation">Consultation</option>
              <option value="support">Support</option>
              <option value="review">Review</option>
              <option value="onboarding">Onboarding</option>
              <option value="demo">Demo</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

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
            <option value="SCHEDULED">Scheduled</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="NO_SHOW">No Show</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="meetingUrl"
            className="block text-sm font-medium text-text-secondary mb-1.5"
          >
            Meeting URL
          </label>
          <input
            id="meetingUrl"
            name="meetingUrl"
            type="url"
            value={formData.meetingUrl}
            onChange={(e) => setFormData({ ...formData, meetingUrl: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
            placeholder="https://zoom.us/j/..."
          />
        </div>

        <div>
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-text-secondary mb-1.5"
          >
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors resize-none"
            placeholder="Additional notes about this appointment..."
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
