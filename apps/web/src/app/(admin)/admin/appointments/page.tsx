import { prisma } from "@support-forge/database";
import Link from "next/link";

export default async function AdminAppointmentsPage() {
  const appointments = await prisma.appointment.findMany({
    orderBy: { date: "asc" },
    include: {
      client: {
        select: { id: true, name: true, email: true },
      },
    },
  });

  const upcomingAppointments = appointments.filter(
    (a) => new Date(a.date) >= new Date() && a.status !== "CANCELLED"
  );
  const todayAppointments = appointments.filter((a) => {
    const today = new Date();
    const appointmentDate = new Date(a.date);
    return (
      appointmentDate.toDateString() === today.toDateString() &&
      a.status !== "CANCELLED"
    );
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SCHEDULED":
        return "bg-blue-500/10 text-blue-500";
      case "CONFIRMED":
        return "bg-green-500/10 text-green-500";
      case "COMPLETED":
        return "bg-gray-500/10 text-gray-500";
      case "CANCELLED":
        return "bg-red-500/10 text-red-500";
      case "NO_SHOW":
        return "bg-yellow-500/10 text-yellow-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(date));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-2xl lg:text-3xl font-bold"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Appointments
          </h1>
          <p className="text-text-secondary mt-1">
            Schedule and manage client appointments
          </p>
        </div>
        <Link
          href="/admin/appointments/new"
          className="px-4 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Schedule Appointment
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="bg-surface border border-border-subtle rounded-xl p-4">
          <p className="text-text-muted text-sm">Today</p>
          <p className="text-2xl font-bold mt-1 text-accent">{todayAppointments.length}</p>
        </div>
        <div className="bg-surface border border-border-subtle rounded-xl p-4">
          <p className="text-text-muted text-sm">Upcoming</p>
          <p className="text-2xl font-bold mt-1 text-green-500">{upcomingAppointments.length}</p>
        </div>
        <div className="bg-surface border border-border-subtle rounded-xl p-4">
          <p className="text-text-muted text-sm">Total</p>
          <p className="text-2xl font-bold mt-1">{appointments.length}</p>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-surface border border-border-subtle rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-elevated">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Date & Time</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Client</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Type</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Duration</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Status</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-text-muted">
                    No appointments yet.{" "}
                    <Link href="/admin/appointments/new" className="text-accent hover:underline">
                      Schedule your first appointment
                    </Link>
                  </td>
                </tr>
              ) : (
                appointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-elevated/50">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium">{formatDateTime(appointment.date)}</p>
                        {appointment.meetingUrl && (
                          <a
                            href={appointment.meetingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-accent hover:underline"
                          >
                            Join Meeting
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-medium">
                          {appointment.client.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{appointment.client.name}</p>
                          <p className="text-xs text-text-muted">{appointment.client.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 capitalize">{appointment.type}</td>
                    <td className="px-4 py-3">{appointment.duration} min</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/appointments/${appointment.id}/edit`}
                          className="p-2 rounded-lg hover:bg-elevated text-text-secondary hover:text-text-primary transition-colors"
                          title="Edit"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
