import Hero from "@/components/ui/Hero";
import StatGrid from "@/components/ui/StatGrid";
import CallToActionBanner from "@/components/ui/CTA";
import ImageCarousel from "@/components/ui/ImageCarousel";
import BookNowButton from "@/components/ui/BookNowButton";
import Title from "@/components/ui/Title";

import EventTypeGrid from "@/components/events/EventTypeGrid";

export const metadata = {
  title: "Observation Deck | Pixoul Events",
};

export default function ObservationDeckPage() {
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            THE{" "}
            <span className="text-[#38C2D9]">OBSERVATION DECK</span>
          </h1>

          <p className="text-gray-300 max-w-2xl mb-10 text-base md:text-lg">
            A futuristic elevated venue space built for group discovery,
            private gatherings, and unforgettable Pixoul experiences.
          </p>
        </div>
      </Hero>

      {/* STATS */}
      <StatGrid stats={stats} />

      {/* ABOUT */}
      <section className="py-15">
        <div className="max-w-6xl mx-auto px-6 text-center max-w-3xl">
          <h2 className="text-3xl font-semibold mb-6">
            A New Perspective on Events
          </h2>

          <p className="dark:text-gray-300 text-gray-600 leading-relaxed mb-6">
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

          {/* BOOK BUTTON */}
          <div className="flex justify-center mt-10">
            <BookNowButton className="px-10 py-4 text-lg" />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-15">
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

      {/* CTA */}
      <CallToActionBanner
        title="Host an Elevated Experience"
        highlight="Observation Deck"
        description="A unique venue for school groups, private bookings, and unforgettable gatherings."
        primaryAction={{
          label: "Book the Observation Deck",
          href: "/book?venue=observation-deck",
        }}
      />

      {/* GALLERY */}
      <section className="py-15">
        <div>
          <Title align="center">Gallery</Title>
          <ImageCarousel items={galleryImages} />
        </div>
      </section>

      {/* FINAL CTA */}
      <CallToActionBanner
        title="Discover Events From a New Perspective"
        highlight="Pixoul"
        description="Reserve the Observation Deck and create something unforgettable above the ordinary."
        primaryAction={{
          label: "Reserve Now",
          href: "/book?venue=observation-deck",
        }}
      />
    </>
  );
}
