"use client";
import Hero from "@/components/ui/Hero";
import StatGrid from "@/components/ui/StatGrid";
import CallToActionBanner from "@/components/ui/CTA";
import ImageCarousel from "@/components/ui/ImageCarousel";
import Title from "@/components/ui/Title";
import { useState } from "react";

import EventTypeGrid from "@/components/events/EventTypeGrid";
import ObservationDeckBookingForm from "@/components/forms/ObservationDeckBookingForm";

export default function ObservationDeckPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Stats Data
  const stats = [
    { label: "Capacity", value: "20–35 Guests" },
    { label: "Atmosphere", value: "Scenic + Immersive" },
    { label: "Best For", value: "Group Experiences" },
    { label: "Highlight", value: "Unique Viewpoint" },
  ];

  // Gallery Images
  const galleryImages = [
    {
      image: "https://placehold.co/900x600",
      title: "Observation Deck",
      subtitle: "A space above it all — designed for unforgettable moments.",
    },
    {
      image: "https://placehold.co/900x600",
      title: "Immersive Views",
      subtitle: "A futuristic deck for events, gatherings, and discovery.",
    },
    {
      image: "https://placehold.co/900x600",
      title: "Pixoul Atmosphere",
      subtitle: "Where gaming culture meets elevated hosting.",
    },
  ];

  // Services Data
  const services = [
    {
      title: "Open Social Layout",
      description:
        "A flexible space perfect for mingling, group activities, and relaxed hosting.",
    },
    {
      title: "Immersive Lighting",
      description:
        "Futuristic ambiance with Pixoul’s signature neon atmosphere.",
    },
    {
      title: "School-Friendly Sessions",
      description:
        "Ideal for structured school visits, supervised group trips, and learning experiences.",
    },
    {
      title: "Private Event Hosting",
      description:
        "A unique venue option for guests seeking something beyond the ordinary.",
    },
    {
      title: "Entertainment Ready",
      description:
        "Perfect for showcases, group viewing, and interactive presentations.",
    },
    {
      title: "Staff Support",
      description:
        "Our team ensures smooth execution for both private and group events.",
    },
  ];

  // Event Types Possible Here
  const eventTypes = [
    {
      title: "School Trips",
      subtitle: "Structured group experiences in an inspiring environment.",
    },
    {
      title: "Private Gatherings",
      subtitle: "Reserve the deck for exclusive celebrations and events.",
    },
    {
      title: "Corporate Groups",
      subtitle: "Host team sessions with a unique elevated atmosphere.",
    },
    {
      title: "Entertainment Nights",
      subtitle: "Special events, showcases, and community experiences.",
    },
  ];

  return (
    <>
      {/* HERO */}
      <Hero
        videoSrc="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
        overlay={true}
      >
        <div className="flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white ">
            THE{" "}
            <span className="text-[#38C2D9]">OBSERVATION DECK</span>
          </h1>

          <p className="text-white/80 max-w-2xl mb-10 text-base md:text-lg">
            A futuristic elevated venue space built for group discovery,
            private gatherings, and unforgettable Pixoul experiences.
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

      {/* ABOUT */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-6">
            A New Perspective on Events
          </h2>

          <p className="dark:text-white/80 text-gray-600 leading-relaxed mb-6">
            The Observation Deck is one of Pixoul’s most unique venues — a space
            designed for guests who want something elevated, immersive, and
            visually unforgettable.
          </p>

          <p className="dark:text-gray-400 text-gray-500 leading-relaxed mb-10">
            Whether you're planning a school visit, hosting a private gathering,
            or organizing a corporate group experience, the Deck provides an
            inspiring atmosphere unlike any other.
          </p>

          {/* EVENT TYPES */}
          <Title align="center">Perfect For</Title>
          <EventTypeGrid types={eventTypes} />

        </div>
      </section>

      {/* SERVICES */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Observation Deck Features
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
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
                <h3 className="text-lg font-semibold mb-3 text-[#38C2D9]">
                  {service.title}
                </h3>
                <p className="text-sm dark:text-gray-400 text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-12 md:py-16">
        <div>
          <Title align="center">Gallery</Title>
          <ImageCarousel items={galleryImages} />
        </div>
      </section>

      {/* FINAL CTA */}
      <CallToActionBanner
        title="Host at the Observation Deck"
        highlight="Observation Deck"
        description="Reserve the Observation Deck and create something unforgettable above the ordinary."
         primaryAction={{
          label: "Reserve Now",
          onClick: () => setIsModalOpen(true),
        }}
      />
        {/* MODAL */}
      {isModalOpen && (
        <ObservationDeckBookingForm onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
