"use client";

import { useEffect, useState } from "react";

export default function FortniteTournamentForm({ onClose }) {
  const [formData, setFormData] = useState({
    onlineName: "",
    phone: "",
    email: "",
    qualifierDay: "",
    dateWindow: "",
    age: "",
    nationality: "",
    mediaConsent: false,
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Fortnite Tournament Registration:", formData);
    setSubmitted(true);
  }

  const nationalities = [
    "UAE",
    "Saudi Arabia",
    "Oman",
    "Kuwait",
    "Bahrain",
    "Qatar",
    "India",
    "Pakistan",
    "Philippines",
    "Egypt",
    "Jordan",
    "Lebanon",
    "United Kingdom",
    "United States",
    "Canada",
    "Other",
  ];

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
              Registration Submitted
            </h2>
            <p className="text-gray-400 mb-6">
              Thank you! We’ll contact you to confirm your qualifier slot and next steps.
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
            <h2 className="text-2xl font-semibold text-[#38C2D9] text-center mb-2">
              Fortnite Tournament Registration
            </h2>

            {/* Online Name */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Online Name <span className="text-[#38C2D9]">*</span>
              </label>
              <input
                type="text"
                name="onlineName"
                required
                value={formData.onlineName}
                onChange={handleChange}
                placeholder="Your Fortnite / Epic display name"
                className="w-full p-3 bg-transparent border border-black/10 dark:border-white/10 focus:border-[#38C2D9] outline-none transition"
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Mobile Number <span className="text-[#38C2D9]">*</span>
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

            {/* Preferred Qualifier Day */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Preferred Qualifier Day (Mon–Thu) <span className="text-[#38C2D9]">*</span>
              </label>
              <select
                name="qualifierDay"
                required
                value={formData.qualifierDay}
                onChange={handleChange}
                className="w-full p-3 bg-white dark:bg-black text-black dark:text-white border border-black/10 dark:border-white/10 focus:border-[#38C2D9] outline-none transition"
              >
                <option value="">Select a day</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
              </select>
            </div>

            {/* Preferred Date Window */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Preferred Date Window <span className="text-[#38C2D9]">*</span>
              </label>
              <select
                name="dateWindow"
                required
                value={formData.dateWindow}
                onChange={handleChange}
                className="w-full p-3 bg-white dark:bg-black text-black dark:text-white border border-black/10 dark:border-white/10 focus:border-[#38C2D9] outline-none transition"
              >
                <option value="">Select a window</option>
                <option value="feb-12-29">February 12 – 29</option>
                <option value="mar-04-07">March 04 – 07</option>
              </select>
            </div>

            {/* Age */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Age <span className="text-[#38C2D9]">*</span>
              </label>
              <input
                type="number"
                name="age"
                required
                min="1"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter your age"
                className="w-full p-3 bg-transparent border border-black/10 dark:border-white/10 focus:border-[#38C2D9] outline-none transition"
              />
            </div>

            {/* Nationality */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Nationality <span className="text-[#38C2D9]">*</span>
              </label>
              <select
                name="nationality"
                required
                value={formData.nationality}
                onChange={handleChange}
                className="w-full p-3 bg-white dark:bg-black text-black dark:text-white border border-black/10 dark:border-white/10 focus:border-[#38C2D9] outline-none transition"
              >
                <option value="">Select nationality</option>
                {nationalities.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            {/* Media Consent (Required) */}
            <div className="flex items-start gap-3 border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-4">
              <input
                id="mediaConsent"
                type="checkbox"
                name="mediaConsent"
                checked={formData.mediaConsent}
                onChange={handleChange}
                required
                className="mt-1 h-4 w-4 accent-[#38C2D9]"
              />
              <label htmlFor="mediaConsent" className="text-sm text-black/70 dark:text-gray-300">
                I agree for my tournament photos/images to appear on Pixoul media content/channels.
                <span className="text-[#38C2D9]"> *</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#38C2D9] text-black font-semibold hover:bg-[#2fa8bb] transition"
            >
              Submit Registration
            </button>
          </form>
        )}
      </div>
    </div>
  );
}