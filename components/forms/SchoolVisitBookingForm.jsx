"use client";

import { useEffect, useMemo, useState } from "react";

function SchoolVisitBookingForm({ onClose }) {
  const gradeOptions = useMemo(() => {
    const grades = ["KG1", "KG2"];
    for (let i = 1; i <= 12; i++) grades.push(`Grade ${i}`);
    return grades;
  }, []);

  // Timing options (grouped like your screenshot)
  // TODO: Replace these time slots with your real availability
  const timeGroups = useMemo(
    () => [
      {
        label: "Mon to Thu",
        slots: ["8:45am to 10:45am", "11:00am to 1:00pm"],
      },
      {
        label: "Fri",
        slots: ["9:00am to 11:30am"],
      },
    ],
    []
  );

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    jobTitle: "",
    gradeLevel: "",
    students: "",
    date: "",
    timing: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Prevent background scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("School Visit Request:", formData);
    setSubmitted(true);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      style={{ backgroundColor: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white dark:bg-black dark:text-white text-black border border-[#38C2D9]/40 shadow-2xl"
        style={{ boxShadow: "0 0 60px rgba(56,194,217,0.15)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#38C2D9] transition text-xl leading-none"
          aria-label="Close"
        >
          ✕
        </button>

        {submitted ? (
          <div className="p-10 text-center">
            <h2 className="text-2xl font-semibold text-[#38C2D9] mb-4">
              Request Submitted
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Thank you. Our team will contact you shortly to confirm availability and
              finalize your school visit booking.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 border border-[#38C2D9] text-[#38C2D9] hover:bg-[#38C2D9] hover:text-black transition font-semibold"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            <h2 className="text-2xl font-semibold text-[#38C2D9] text-center mb-1">
              School Visit Booking Request
            </h2>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-4">
              Please submit your request and our team will confirm the visit schedule.
            </p>

            {/* Full Name */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name <span className="text-[#38C2D9]">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full p-3 bg-transparent border border-black/10 dark:border-white/10 focus:border-[#38C2D9] outline-none transition"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Contact Number <span className="text-[#38C2D9]">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+971 5X XXX XXXX"
                className="w-full p-3 bg-transparent border border-black/10 dark:border-white/10 focus:border-[#38C2D9] outline-none transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address <span className="text-[#38C2D9]">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className="w-full p-3 bg-transparent border border-black/10 dark:border-white/10 focus:border-[#38C2D9] outline-none transition"
              />
            </div>

            {/* Job Title (optional) */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Job Title <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="Teacher, Coordinator, Principal, etc."
                className="w-full p-3 bg-transparent border border-black/10 dark:border-white/10 focus:border-[#38C2D9] outline-none transition"
              />
            </div>

            {/* Grade Level */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Grade Level <span className="text-[#38C2D9]">*</span>
              </label>
              <select
                name="gradeLevel"
                required
                value={formData.gradeLevel}
                onChange={handleChange}
                className="w-full p-3 bg-white dark:bg-black text-black dark:text-white border border-black/10 dark:border-white/10 focus:border-[#38C2D9] outline-none transition"
              >
                <option value="">Select grade level</option>
                {gradeOptions.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            {/* Number of Students */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Number of Students <span className="text-[#38C2D9]">*</span>
              </label>
              <input
                type="number"
                name="students"
                required
                min="1"
                value={formData.students}
                onChange={handleChange}
                placeholder="Enter total number of students"
                className="w-full p-3 bg-transparent border border-black/10 dark:border-white/10 focus:border-[#38C2D9] outline-none transition"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Preferred Visit Date <span className="text-[#38C2D9]">*</span>
              </label>
              <input
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full p-3 bg-transparent border border-black/10 dark:border-white/10 focus:border-[#38C2D9] outline-none transition"
              />
            </div>

            {/* Timing dropdown */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Preferred Timing <span className="text-[#38C2D9]">*</span>
              </label>
              <select
                name="timing"
                required
                value={formData.timing}
                onChange={handleChange}
                className="w-full p-3 bg-white dark:bg-black text-black dark:text-white border border-black/10 dark:border-white/10 focus:border-[#38C2D9] outline-none transition"
              >
                <option value="">Select</option>
                {timeGroups.map((group) => (
                  <optgroup key={group.label} label={group.label}>
                    {group.slots.map((slot) => (
                      <option key={`${group.label}-${slot}`} value={`${group.label} • ${slot}`}>
                        {slot}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                Available time slots may vary based on bookings and operational requirements.
              </p>
            </div>

            {/* Message */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Message / Notes
              </label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Any special requirements, objectives for the visit, accessibility needs, etc."
                className="w-full p-3 bg-transparent border border-black/10 dark:border-white/10 focus:border-[#38C2D9] outline-none transition resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#38C2D9] text-black font-semibold hover:bg-[#2fa8bb] transition"
            >
              Submit Request
            </button>

            <p className="text-xs text-center text-gray-600 dark:text-gray-400">
              By submitting this request, you agree to be contacted regarding availability and scheduling.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default SchoolVisitBookingForm;