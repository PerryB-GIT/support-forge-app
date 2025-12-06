import { BookingForm } from "@/components/appointments/booking-form";
import Link from "next/link";

export const metadata = {
  title: "Book Appointment - Support Forge",
  description: "Schedule a consultation with Support Forge",
};

export default function NewAppointmentPage() {
  return (
    <div>
      <div className="mb-8">
        <Link
          href="/appointments"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-4"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Appointments
        </Link>
        <h1
          className="text-2xl lg:text-3xl font-bold"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Book a Consultation
        </h1>
        <p className="text-text-secondary mt-1">
          Schedule a meeting with our team
        </p>
      </div>

      <BookingForm />
    </div>
  );
}
