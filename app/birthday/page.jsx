"use client";

import { useState } from "react";
import Hero from "@/components/ui/Hero";
import Title from "@/components/ui/Title";
import CallToActionBanner from "@/components/ui/CTA";
import ExploreGrid from '@/components/ui/ExploreGrid';


//import BlurModal from "@/components/ui/BlurModal";
import BirthdayBookingForm from "@/components/forms/BirthdayBookingForm";

//export const metadata = {
  //title: "Birthday Parties | Pixoul Gaming",
//};

export default function BirthdayPartiesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Venue Cards (links to existing venue pages)
  const venues = [
    {
      title: "Social Room",
      description:
        "A vibrant space for fun group celebrations, perfect for kids and families.",
      image: "/images/social-room.jpg",
      href: "/events/social-room",
    },
    {
      title: "VIP Lounge",
      description:
        "Premium private birthdays with luxury seating, exclusivity, and upgraded service.",
      image: "/images/vip-lounge.jpg",
      href: "/events/vip-lounge",
    },
    {
      title: "Observation Deck",
      description:
        "Celebrate above the city with futuristic views and immersive atmosphere.",
      image: "/images/observation-deck.jpg",
      href: "/events/observation-deck",
    },
  ];

  // Birthday Packages Preview
  const packages = [
  {
    title: "Weekday Birthday Bash",
    price: "199",
    unit: "per kid",
    description: "Celebrate during the week for a high-energy VR and gaming experience at a great value.",
  },
  {
    title: "Weekend Birthday Bash",
    price: "235",
    unit: "per kid",
    description: "The ultimate weekend celebration featuring full access to our immersive adventures and arcade.",
  },
];
  
  return (
    <>
      {/* HERO */}
      <Hero imageSrc="/images/birthday.jpg" overlay={true}>
        <div className="flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white dark:text-white">
            BIRTHDAY PARTIES AT{" "}
            <span className="text-[#38C2D9]">PIXOUL</span>
          </h1>

          <p className="text-gray-300  max-w-2xl mb-10 text-base md:text-lg">
            Celebrate your next birthday inside Abu Dhabi’s most immersive VR and
            gaming universe — where parties become adventures.
          </p>

          <div className="flex gap-4">
             <button
          onClick={() => setIsModalOpen(true)}
          className="px-8 py-3 bg-[#38C2D9]"
          >
          Build Your Party
        </button>

            <button
              onClick={() => window.location.href = "#venues"}
              className="
                px-8 py-3
                border border-white/20
                hover:border-[#38C2D9]
                hover:text-[#38C2D9]
                transition
              "
            >
              Explore Venues
            </button>
          </div>
        </div>
      </Hero>

      {/* ABOUT */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Title align="center">Why Pixoul Birthdays?</Title>

          <p className="dark:text-gray-300 text-gray-600 leading-relaxed mt-6">
            Pixoul birthdays combine cutting-edge VR adventures, esports gaming,
            private venues, and premium hospitality — creating unforgettable
            celebrations for kids, teens, and adults.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              "Immersive VR & Arcade Access",
              "Private Rooms & Custom Packages",
              "Staff Support + Catering Options",
            ].map((point) => (
              <div
                key={point}
                className="
                  dark:bg-black/70 bg-white/70
                  border border-white/10
                  p-6
                  hover:border-[#38C2D9]/70
                  transition
                  shadow-[0_0_25px_rgba(56,194,217,0.08)]
                "
              >
                <p className="text-sm dark:text-gray-200 text-gray-600">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="py-12 dark:bg-black/40 bg-white/40">
  <div className="max-w-5xl mx-auto px-6">
    <Title align="center">Birthday Bash Packages</Title>

    <p className="dark:text-gray-400 text-gray-600 text-center max-w-2xl mx-auto mt-4 mb-12">
      Choose the perfect celebration package for your big day at Pixoul Gaming.
    </p>

    {/* Changed grid-cols-3 to grid-cols-2 since we only have two packages */}
    <div className="grid md:grid-cols-2 gap-8">
      {packages.map((pkg) => (
        <div
          key={pkg.title}
          className="
            dark:bg-black/70 bg-white/70 
            border border-white/10 
            p-10 /* Increased padding for a more premium feel */
            hover:border-[#38C2D9]/70 
            transition 
            shadow-[0_0_30px_rgba(56,194,217,0.10)]
            flex flex-col items-center text-center
          "
        >
          <h3 className="text-2xl font-bold text-[#38C2D9] mb-4 uppercase tracking-tight">
            {pkg.title}
          </h3>

          {/* Price Display */}
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-4xl font-black dark:text-white text-gray-900">
              {pkg.price} AED
            </span>
            <span className="text-sm dark:text-gray-400 text-gray-500 uppercase">
              / {pkg.unit}
            </span>
          </div>

          <p className="text-sm dark:text-gray-300 text-gray-600 leading-relaxed mb-8">
            {pkg.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* VENUE OPTIONS */}
      <section className="py-12" id="venues">
        <div className="max-w-6xl mx-auto px-6" >
          <Title align="center">Your Venues</Title>

          <p className="dark:text-gray-400 text-gray-600 text-center max-w-2xl mx-auto mt-4 mb-12">
            Birthday parties can be hosted across Pixoul’s premium spaces. Select
            the venue that fits your celebration style.
          </p>

          {/* Venue Cards */}
          <ExploreGrid 
          items={venues} />
        </div>
      </section>

      {/* FINAL CTA */}
      {/* CTA */}
      <CallToActionBanner
        title="Ready to Celebrate at Pixoul?"
        highlight="at Pixoul?"
        description="Build your birthday session today."
        primaryAction={{
          label: "Book For Your Birthday",
          onClick: () => setIsModalOpen(true),
        }}
      />

      {/* MODAL */}
      {isModalOpen && (
        <BirthdayBookingForm onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
