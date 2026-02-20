"use client";

import { useState } from "react";

export default function BirthdayBookingForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    package: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // For now just console log
    console.log("Birthday Request:", formData);

    setSubmitted(true);

    // Later this will POST to backend
  }

  if (submitted) {
    return (
      <div className="p-10 text-center border border-[#38C2D9] bg-black/50 dark:bg-black">
        <h2 className="text-2xl font-semibold text-[#38C2D9] mb-4">
          Request Submitted 🎉
        </h2>
        <p className="text-gray-400">
          Our events team will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-8 bg-white dark:bg-black border dark:border-white/10 border-black/10 space-y-6"
    >
      <h2 className="text-2xl font-semibold text-[#38C2D9] text-center mb-6">
        Request Pixoul Birthday
      </h2>

      {/* Full Name */}
      <div>
        <label className="block mb-2 text-sm font-medium">
          Full Name *
        </label>
        <input
          type="text"
          name="fullName"
          required
          value={formData.fullName}
          onChange={handleChange}
          className="w-full p-3 bg-transparent border dark:border-white/20 border-black/20 focus:border-[#38C2D9] outline-none transition"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block mb-2 text-sm font-medium">
          Email *
        </label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 bg-transparent border dark:border-white/20 border-black/20 focus:border-[#38C2D9] outline-none transition"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block mb-2 text-sm font-medium">
          Phone Number *
        </label>
        <input
          type="tel"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-3 bg-transparent border dark:border-white/20 border-black/20 focus:border-[#38C2D9] outline-none transition"
        />
      </div>

      {/* Date */}
      <div>
        <label className="block mb-2 text-sm font-medium">
          Preferred Booking Date
        </label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-3 bg-transparent border dark:border-white/20 border-black/20 focus:border-[#38C2D9] outline-none transition"
        />
      </div>

      {/* Time */}
      <div>
        <label className="block mb-2 text-sm font-medium">
          Preferred Booking Time
        </label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="w-full p-3 bg-transparent border dark:border-white/20 border-black/20 focus:border-[#38C2D9] outline-none transition"
        />
      </div>

      {/* Package Select */}
      <div>
        <label className="block mb-2 text-sm font-medium">
          Select Birthday Package
        </label>
        <select
          name="package"
          value={formData.package}
          onChange={handleChange}
          className="w-full p-3 bg-transparent border dark:border-white/20 border-black/20 focus:border-[#38C2D9] outline-none transition"
        >
          <option value="">Choose Package</option>
          <option value="starter">Starter Party Pack</option>
          <option value="megaverse">MegaVerse Birthday Experience</option>
          <option value="vip">VIP Premium Celebration</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="
          w-full
          py-3
          bg-[#38C2D9]
          dark:text-black text-white
          font-semibold
          hover:bg-[#2fa8bb]
          transition
        "
      >
        Submit Request
      </button>
    </form>
  );
}