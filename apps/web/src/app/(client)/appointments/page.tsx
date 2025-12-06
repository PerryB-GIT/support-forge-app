"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AppointmentCard } from "@/components/appointments/appointment-card";

interface Appointment {
  id: string;
  date: string;
  duration: number;
  type: string;
  status: "SCHEDULED" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "NO_SHOW";
  notes?: string;
  meetingUrl?: string;
}

export default function AppointmentsPage() {
  const searchParams = useSearchParams();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"upcoming" | "past" | "all">("upcoming");
  const showBooked = searchParams.get("booked") === "true";

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("/api/appointments");
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      }
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this appointment?")) return;

    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "CANCELLED" }),
      });

      if (response.ok) {
        setAppointments((prev) =>
          prev.map((apt) =>
            apt.id === id ? { ...apt, status: "CANCELLED" } : apt
          )
        );
      }
    } catch (error) {
      console.error("Failed to cancel appointment:", error);
    }
  };

  const now = new Date();
  const filteredAppointments = appointments.filter((apt) => {
    const aptDate = new Date(apt.date);
    if (filter === "upcoming") return aptDate >= now && apt.status !== "CANCELLED";
    if (filter === "past") return aptDate < now || apt.status === "COMPLETED";
    return true;
  });

  const upcomingCount = appointments.filter(
    (apt) => new Date(apt.date) >= now && apt.status !== "CANCELLED"
  ).length;

  return (
    <div>
      {/* Success message */}
      {showBooked && (
        <div className="mb-6 p-4 rounded-xl bg-success/10 border border-success/20 text-success flex items-center gap-3">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Your appointment has been booked successfully! You&apos;ll receive a confirmation email shortly.</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1
            className="text-2xl lg:text-3xl font-bold"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Appointments
          </h1>
          <p className="text-text-secondary mt-1">
            {upcomingCount} upcoming appointment{upcomingCount !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/appointments/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Book Appointment
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {(["upcoming", "past", "all"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f
                ? "bg-accent text-white"
                : "bg-surface border border-border-subtle hover:border-border-default"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Appointments list */}
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-surface border border-border-subtle rounded-xl p-5 animate-pulse"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-elevated" />
                <div className="flex-1">
                  <div className="h-5 bg-elevated rounded w-32 mb-2" />
                  <div className="h-4 bg-elevated rounded w-20" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-elevated rounded w-40" />
                <div className="h-4 bg-elevated rounded w-32" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-surface border border-border-subtle flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">No appointments found</h3>
          <p className="text-text-secondary mb-6">
            {filter === "upcoming"
              ? "You don't have any upcoming appointments"
              : filter === "past"
              ? "You don't have any past appointments"
              : "You haven't booked any appointments yet"}
          </p>
          <Link
            href="/appointments/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors"
          >
            Book Your First Appointment
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onCancel={handleCancel}
            />
          ))}
        </div>
      )}
    </div>
  );
}
