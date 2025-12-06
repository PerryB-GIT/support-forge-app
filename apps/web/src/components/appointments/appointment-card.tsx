"use client";

interface Appointment {
  id: string;
  date: string;
  duration: number;
  type: string;
  status: "SCHEDULED" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "NO_SHOW";
  notes?: string;
  meetingUrl?: string;
}

const STATUS_STYLES = {
  SCHEDULED: { bg: "bg-blue-500/10", text: "text-blue-500", label: "Scheduled" },
  CONFIRMED: { bg: "bg-success/10", text: "text-success", label: "Confirmed" },
  COMPLETED: { bg: "bg-text-muted/10", text: "text-text-muted", label: "Completed" },
  CANCELLED: { bg: "bg-error/10", text: "text-error", label: "Cancelled" },
  NO_SHOW: { bg: "bg-warning/10", text: "text-warning", label: "No Show" },
};

const TYPE_LABELS: Record<string, string> = {
  consultation: "Initial Consultation",
  technical: "Technical Support",
  review: "Project Review",
  strategy: "Strategy Session",
};

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel?: (id: string) => void;
}

export function AppointmentCard({ appointment, onCancel }: AppointmentCardProps) {
  const date = new Date(appointment.date);
  const statusStyle = STATUS_STYLES[appointment.status];
  const isPast = date < new Date();
  const canCancel = !isPast && ["SCHEDULED", "CONFIRMED"].includes(appointment.status);

  const formatDate = () => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = () => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZoneName: "short",
    });
  };

  return (
    <div className="bg-surface border border-border-subtle rounded-xl p-5 hover:border-border-default transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold">
              {TYPE_LABELS[appointment.type] || appointment.type}
            </h3>
            <p className="text-sm text-text-secondary">
              {appointment.duration} minutes
            </p>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}
        >
          {statusStyle.label}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <svg className="w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{formatDate()}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <svg className="w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{formatTime()}</span>
        </div>
      </div>

      {appointment.notes && (
        <p className="text-sm text-text-secondary mb-4 line-clamp-2">
          {appointment.notes}
        </p>
      )}

      <div className="flex gap-2">
        {appointment.meetingUrl && !isPast && appointment.status !== "CANCELLED" && (
          <a
            href={appointment.meetingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 rounded-lg bg-accent hover:bg-accent-hover text-white text-center text-sm font-medium transition-colors"
          >
            Join Meeting
          </a>
        )}
        {canCancel && onCancel && (
          <button
            onClick={() => onCancel(appointment.id)}
            className="px-4 py-2 rounded-lg border border-border-subtle hover:border-error hover:text-error text-sm font-medium transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
