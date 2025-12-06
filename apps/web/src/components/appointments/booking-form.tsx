"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const APPOINTMENT_TYPES = [
  { value: "consultation", label: "Initial Consultation", duration: 60 },
  { value: "technical", label: "Technical Support", duration: 30 },
  { value: "review", label: "Project Review", duration: 60 },
  { value: "strategy", label: "Strategy Session", duration: 90 },
];

const TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
];

export function BookingForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    type: "",
    date: "",
    time: "",
    notes: "",
  });

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  // Get maximum date (2 months from now)
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 2);
    return maxDate.toISOString().split("T")[0];
  };

  const selectedType = APPOINTMENT_TYPES.find((t) => t.value === formData.type);

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: formData.type,
          date: `${formData.date}T${formData.time}:00`,
          duration: selectedType?.duration || 60,
          notes: formData.notes,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to book appointment");
      }

      router.push("/appointments?booked=true");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm} EST`;
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress steps */}
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                s === step
                  ? "bg-accent text-white"
                  : s < step
                  ? "bg-success text-white"
                  : "bg-elevated text-text-muted"
              }`}
            >
              {s < step ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                s
              )}
            </div>
            {s < 4 && (
              <div
                className={`w-12 h-0.5 ${s < step ? "bg-success" : "bg-elevated"}`}
              />
            )}
          </div>
        ))}
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-error/10 border border-error/20 text-error">
          {error}
        </div>
      )}

      {/* Step 1: Select Type */}
      {step === 1 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Select Appointment Type</h2>
          <p className="text-text-secondary mb-6">
            Choose the type of consultation you need
          </p>
          <div className="grid gap-3">
            {APPOINTMENT_TYPES.map((type) => (
              <button
                key={type.value}
                onClick={() => {
                  setFormData({ ...formData, type: type.value });
                  setStep(2);
                }}
                className={`p-4 rounded-xl border text-left transition-all ${
                  formData.type === type.value
                    ? "border-accent bg-accent/10"
                    : "border-border-subtle hover:border-accent/50 bg-surface"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{type.label}</h3>
                    <p className="text-sm text-text-secondary">
                      {type.duration} minutes
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 ${
                      formData.type === type.value
                        ? "border-accent bg-accent"
                        : "border-border-default"
                    }`}
                  >
                    {formData.type === type.value && (
                      <svg className="w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Select Date */}
      {step === 2 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Select Date</h2>
          <p className="text-text-secondary mb-6">
            Choose your preferred date for the {selectedType?.label.toLowerCase()}
          </p>
          <div className="bg-surface border border-border-subtle rounded-xl p-6">
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              min={getMinDate()}
              max={getMaxDate()}
              className="w-full p-4 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none text-lg"
            />
            <p className="text-sm text-text-muted mt-3">
              Available Monday - Friday, excluding holidays
            </p>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 rounded-lg border border-border-subtle hover:bg-elevated transition-colors"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!formData.date}
              className="flex-1 px-6 py-3 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Select Time */}
      {step === 3 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Select Time</h2>
          <p className="text-text-secondary mb-6">
            Available time slots for {formatDate(formData.date)}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TIME_SLOTS.map((time) => (
              <button
                key={time}
                onClick={() => setFormData({ ...formData, time })}
                className={`p-3 rounded-lg border text-center transition-all ${
                  formData.time === time
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border-subtle hover:border-accent/50 bg-surface"
                }`}
              >
                {formatTime(time)}
              </button>
            ))}
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-3 rounded-lg border border-border-subtle hover:bg-elevated transition-colors"
            >
              Back
            </button>
            <button
              onClick={() => setStep(4)}
              disabled={!formData.time}
              className="flex-1 px-6 py-3 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Confirm */}
      {step === 4 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Confirm Booking</h2>
          <p className="text-text-secondary mb-6">
            Review your appointment details
          </p>
          <div className="bg-surface border border-border-subtle rounded-xl p-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-text-secondary">Type</span>
              <span className="font-medium">{selectedType?.label}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Duration</span>
              <span className="font-medium">{selectedType?.duration} minutes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Date</span>
              <span className="font-medium">{formatDate(formData.date)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Time</span>
              <span className="font-medium">{formatTime(formData.time)}</span>
            </div>
            <div className="border-t border-border-subtle pt-4">
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                placeholder="Any specific topics you'd like to discuss..."
                className="w-full p-3 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none resize-none"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setStep(3)}
              className="px-6 py-3 rounded-lg border border-border-subtle hover:bg-elevated transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 px-6 py-3 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
