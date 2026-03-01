"use client";
import Hero from "@/components/ui/Hero";
import StatGrid from "@/components/ui/StatGrid";
import CallToActionBanner from "@/components/ui/CTA";
import Title from "@/components/ui/Title";

import { useState } from "react";
import SchoolVisitBookingForm from "@/components/forms/SchoolVisitBookingForm";



export default function SchoolVisitPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Stats
  const stats = [
    { label: "Price Per Student", value: "AED 55" },
    { label: "Minimum Booking", value: "30 Students" },
    { label: "Guided Duration", value: "2–2.5 Hours" },
    { label: "Grades", value: "1 to 12" },
  ];

  return (
    <>
      {/* HERO */}
      <Hero
        videoSrc="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
        overlay={true}
      >
        <div className="flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
            EDUCATIONAL{" "}
            <span className="text-[#38C2D9]">FIELD TRIPS</span>
          </h1>

          <p className="text-white/80 max-w-2xl mb-10 text-base md:text-lg">
            Immerse students in the UAE’s most advanced VR and Esports venue —
            where technology becomes an unforgettable learning experience.
          </p>
          <div className="flex gap-4">
             <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 sm:px-8 sm:py-3 rounded-none bg-[#38C2D9] text-black font-semibold hover:brightness-110 transition focus:outline-none focus:ring-2 focus:ring-[#38C2D9]/40"
          >
          Request Booking
        </button>
        </div>
        </div>
      </Hero>

      {/* STATS */}
      <StatGrid stats={stats} />

      {/* INTRO */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Title align="center">A Guided Visit Into the Future</Title>

          <p className="dark:text-white/80 text-gray-600 leading-relaxed mt-6">
            Have you ever wondered what powers the technological advances of the
            21st century?
          </p>

          <p className="dark:text-gray-400 text-gray-500 leading-relaxed mt-4">
            Pixoul Academy invites schools across the UAE to explore the science
            behind computers, programming, video games, and Esports — through a
            safe, immersive, hands-on educational journey.
          </p>

          <p className="dark:text-gray-400 text-gray-500 italic mt-8">
            “If we teach today as we taught yesterday, we rob our children of
            tomorrow.” — John Dewey
          </p>
        </div>
      </section>

      {/* PROGRAM HIGHLIGHTS */}
      <section className="py-12 md:py-16 dark:bg-black/40 bg-white/40">
        <div className="max-w-6xl mx-auto px-6">
          <Title align="center">What Students Will Experience</Title>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              {
                title: "Virtual Reality",
                desc: "Experience the most advanced VR technology in the region.",
              },
              {
                title: "Programming & Coding",
                desc: "Challenge problem-solving skills with Scratch or Python activities.",
              },
              {
                title: "Esports Discipline",
                desc: "Learn teamwork, strategy, and how Esports became a global sport.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="
                  dark:bg-black/70 bg-white/70
                  border dark:border-white/10 border-black/10
                  p-6
                  rounded-none
                  hover:border-[#38C2D9]/70
                  transition
                  shadow-[0_0_30px_rgba(56,194,217,0.08)]
                "
              >
                <h3 className="text-lg font-semibold text-[#38C2D9] mb-3">
                  {item.title}
                </h3>
                <p className="text-sm dark:text-gray-400 text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <Title align="center">Program Overview</Title>

          <p className="dark:text-gray-400 text-gray-500 mt-6 max-w-3xl mx-auto">
            Daily guided sessions include Virtual Reality, Programming, Esports,
            and Multiplayer Gaming experiences.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <div className="border dark:border-white/10 border-black/10 p-6 sm:p-8 dark:bg-black/60 bg-white/60">
              <h3 className="text-lg sm:text-xl font-semibold text-[#38C2D9] mb-4">
                Monday – Thursday
              </h3>
              <p className="dark:text-white/80 text-gray-500">8:45 AM – 10:45 AM</p>
              <p className="dark:text-white/80 text-gray-500">11:00 AM – 1:00 PM</p>
            </div>

            <div className="border dark:border-white/10 border-black/10 p-6 sm:p-8 dark:bg-black/60 bg-white/60">
              <h3 className="text-lg sm:text-xl font-semibold text-[#38C2D9] mb-4">
                Fantastic Fridays
              </h3>
              <p className="dark:text-white/80 text-gray-500">9:00 AM – 11:30 AM</p>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING RULES */}
      <section className="py-12 md:py-16 dark:bg-black/40 bg-white/40">
        <div className="max-w-6xl mx-auto px-6">
          <Title align="center">Booking Requirements</Title>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="border dark:border-white/10 border-black/10 p-6 sm:p-8 dark:bg-black/60 bg-white/60">
              <h3 className="text-lg font-semibold text-[#38C2D9] mb-4">
                Important Notes
              </h3>
              <ul className="space-y-3 text-sm dark:text-gray-400 text-gray-600">
                <li>• Minimum group size: 30 students</li>
                <li>• Book at least one week in advance</li>
                <li>• Payment is processed on the day of the visit</li>
                <li>• Each student receives 2 Free Play VR vouchers</li>
              </ul>
            </div>

            <div className="border dark:border-white/10 border-black/10 p-8 dark:bg-black/60 bg-white/60">
              <h3 className="text-lg font-semibold text-[#38C2D9] mb-4">
                Contact to Book
              </h3>
              <p className="dark:text-gray-400 text-gray-500 text-sm mb-4">
                To arrange your school visit, email or call us with:
              </p>

              <p className="dark:text-gray-400 text-gray-500 text-sm break-words">
                📞 +971 52 104 0469 <br />
                ✉️ education@pixoulgaming.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SCHOOL BROCHURE (COMPACT) */}
<section className="py-6">
  <div className="max-w-6xl mx-auto px-6">
    <div
      className="
        flex flex-col sm:flex-row 
        items-center justify-between 
        gap-4 
        border border-black/10 dark:border-white/10 
        rounded-none 
        px-5 py-4 
        bg-white/60 dark:bg-black/50
      "
    >
      {/* Text */}
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 text-center sm:text-left">
        Looking for full program details, schedules, and learning outcomes?{" "}
        <span className="text-[#38C2D9] font-medium">
          Download the complete school brochure.
        </span>
      </p>

      {/* Button */}
      <a
        href="https://pixoulgaming.com/wp-content/uploads/2024/08/Schools-Brochure-AY-24-25.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="
          px-5 py-2.5 
          rounded-none 
          border border-[#38C2D9] 
          text-[#38C2D9] 
          font-medium 
          text-sm
          hover:bg-[#38C2D9] hover:text-black 
          transition
        "
      >
        Download Brochure (PDF)
      </a>
    </div>
  </div>
</section>

      {/* FINAL CTA */}
      <CallToActionBanner
        title="Bring Your Students Into the Future"
        highlight="Pixoul Academy"
        description="An unforgettable educational journey through VR, programming, and Esports."
        primaryAction={{
          label: "Request a School Visit",
          onClick: () => setIsModalOpen(true),
        }}
      />
      {/* MODAL */}
      {isModalOpen && (
        <SchoolVisitBookingForm onClose={() => setIsModalOpen(false)} />
      )}

    </>
  );
}
