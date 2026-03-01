"use client";

import { useEffect, useState } from "react";

function VipLoungeBookingForm({ onClose }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    organization: "",

    purpose: "",
    date: "",
    startTime: "",
    durationHours: "",
    guests: "",

    privacyLevel: "",
    catering: "",
    avNeeds: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Prevent background scroll
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
    console.log("VIP Lounge Request:", formData);
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
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white dark:bg-black text-black dark:text-white border border-[#38C2D9]/40 shadow-2xl"
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
              Thank you. Our team will contact you shortly to confirm availability
              and finalize your VIP Lounge booking.
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
              VIP Lounge Booking Request
            </h2>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-4">
              A premium space for private gatherings, meetings, and VIP experiences.
              Submit your request and our team will confirm details.
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

            {/* Organization (optional) */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Company / Organization <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="Optional"
                className="w-full p-3 bg-transparent border border-black/10 dark:border-white/10 focus:border-[#38C2D9] outline-none transition"
              />
            </div>

            {/* Purpose */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Booking Purpose <span className="text-[#38C2D9]">*</span>
              </label>
              <select
                name="purpose"
                required
                value={formData.purpose}
                onChange={handleChange}
                className="w-full p-3 bg-white dark:bg-black border border-black/10 dark:border-white/10 focus:border-[#38C2D9] outline-none transition"
              >
                <option value="">Select purpose</option>
                <option value="private-gathering">Private Gathering</option>
                <option value="birthday-upgrade">Birthday / Celebration (VIP)</option>
                <option value="corporate-meeting">Corporate Meeting</option>
                <option value="watch-party">Gaming / Watch Party</option>
                <option value="content-shoot">Content / Photo Shoot</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Preferred Date <span className="text-[#38C2D9]">*</span>
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

            {/* Start Time */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Preferred Start Time <span className="text-[#38C2D9]">*</span>
              </label>
              <input
                type="time"
                name="startTime"
                required
                value={formData.startTime}
                onChange={handleChange}
                className="w-full p-3 bg-transparent border border-black/10 dark:border-white/10 focus:border-[#38C2D9] outline-none transition"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Estimated Duration (Hours) <span className="text-[#38C2D9]">*</span>
              </label>
              <input
                type="number"
                name="durationHours"
                required
                min="1"
                value={formData.durationHours}
                onChange={handleChange}
                placeholder="e.g., 2"
                className="w-full p-3 bg-transparent border border-black/10 dark:border-white/10 focus:border-[#38C2D9] outline-none transition"
              />
            </div>

            {/* Guests */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Estimated Number of Guests <span className="text-[#38C2D9]">*</span>
              </label>
              <input
                type="number"
                name="guests"
                required
                min="1"
                value={formData.guests}
                onChange={handleChange}
                placeholder="Enter expected guest count"
                className="w-full p-3 bg-transparent border border-black/10 dark:border-white/10 focus:border-[#38C2D9] outline-none transition"
              />
            </div>

            {/* VIP-specific options */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Privacy Preference <span className="text-gray-400">(optional)</span>
              </label>
              <select
                name="privacyLevel"
                value={formData.privacyLevel}
                onChange={handleChange}
                className="w-full p-3 bg-white dark:bg-black border border-black/10 dark:border-white/10 focus:border-[#38C2D9] outline-none transition"
              >
                <option value="">Select preference</option>
                <option value="standard">Standard</option>
                <option value="more-private">More Private</option>
                <option value="fully-private">Fully Private (subject to availability)</option>
              </select>
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Catering Requirement <span className="text-gray-400">(optional)</span>
              </label>
              <select
                name="catering"
                value={formData.catering}
                onChange={handleChange}
                className="w-full p-3 bg-white dark:bg-black border border-black/10 dark:border-white/10 focus:border-[#38C2D9] outline-none transition"
              >
                <option value="">Select an option</option>
                <option value="none">No catering</option>
                <option value="light">Light refreshments</option>
                <option value="full">Full catering</option>
                <option value="tbd">To be discussed</option>
              </select>
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Audio / Visual Requirements <span className="text-gray-400">(optional)</span>
              </label>
              <select
                name="avNeeds"
                value={formData.avNeeds}
                onChange={handleChange}
                className="w-full p-3 bg-white dark:bg-black border border-black/10 dark:border-white/10 focus:border-[#38C2D9] outline-none transition"
              >
                <option value="">Select an option</option>
                <option value="none">None</option>
                <option value="tv">TV / Screen</option>
                <option value="mic">Microphone</option>
                <option value="presentation">Presentation setup</option>
                <option value="tbd">To be discussed</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Additional Notes / Requests
              </label>
              <textarea
                name="notes"
                rows="4"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any special requirements, timing details, accessibility needs, etc."
                className="w-full p-3 bg-transparent border border-black/10 dark:border-white/10 focus:border-[#38C2D9] outline-none transition resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#38C2D9] text-black font-semibold hover:bg-[#2fa8bb] transition"
            >
              Request Booking
            </button>

            <p className="text-xs text-center text-gray-600 dark:text-gray-400">
              By submitting this request, you agree to be contacted regarding availability and booking details.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default VipLoungeBookingForm;