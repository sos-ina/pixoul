import Hero from "@/components/ui/Hero";
import StatGrid from "@/components/ui/StatGrid";
import CallToActionBanner from "@/components/ui/CTA";
import ImageCarousel from "@/components/ui/ImageCarousel";
import BookNowButton from "@/components/ui/BookNowButton";
import Title from "@/components/ui/Title";

import EventTypeGrid from "@/components/events/EventTypeGrid";

export const metadata = {
  title: "Social Room | Pixoul Events",
};

export default function SocialRoomPage() {
  // Stats Data
  const stats = [
    { label: "Capacity", value: "15–25 Guests" },
    { label: "Best For", value: "Casual Events" },
    { label: "Setup", value: "Flexible Seating" },
    { label: "Atmosphere", value: "Social + Immersive" },
  ];

  // Gallery Images
  const galleryImages = [
    {
      image: "https://placehold.co/900x600",
      title: "Social Room",
      subtitle: "A space designed for connection and fun.",
    },
    {
      image: "https://placehold.co/900x600",
      title: "Group Gaming",
      subtitle: "Perfect for friends, families, and celebrations.",
    },
    {
      image: "https://placehold.co/900x600",
      title: "Pixoul Atmosphere",
      subtitle: "Immersive lighting and futuristic comfort.",
    },
  ];

  // Services Data
  const services = [
    {
      title: "Comfort Seating",
      description:
        "Relaxed lounge-style furniture designed for social gatherings.",
    },
    {
      title: "Gaming Access",
      description:
        "Direct access to Pixoul arcade and interactive experiences.",
    },
    {
      title: "Custom Setup",
      description:
        "Flexible arrangement for birthdays, group nights, or private sessions.",
    },
    {
      title: "Staff Support",
      description:
        "Our team ensures smooth hosting and guest assistance throughout.",
    },
    {
      title: "Food & Drinks",
      description:
        "Optional catering packages available through Pixoul partners.",
    },
    {
      title: "Private Atmosphere",
      description:
        "A semi-private space with immersive lighting and premium vibes.",
    },
  ];

  // Event Types Possible Here
  const eventTypes = [
    {
      title: "Birthday Parties",
      subtitle: "Celebrate with friends in a fun social space.",
    },
    {
      title: "Private Bookings",
      subtitle: "Reserve the room exclusively for your group.",
    },
    {
      title: "Casual Gatherings",
      subtitle: "Perfect for hangouts, meetups, and game nights.",
    },
    {
      title: "Small Corporate Groups",
      subtitle: "Team bonding in a relaxed environment.",
    },
  ];

  return (
    <>
      {/* HERO */}
      <Hero
        videoSrc="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
        overlay={true}
      >
        <div className="flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            THE{" "}
            <span className="text-[#38C2D9]">SOCIAL ROOM</span>
          </h1>

          <p className="text-gray-300 max-w-2xl mb-10 text-base md:text-lg">
            A relaxed and immersive space built for celebrations, gatherings,
            and unforgettable group moments at Pixoul.
          </p>
        </div>
      </Hero>

      {/* STATS */}
      <StatGrid stats={stats} />

      {/* ABOUT */}
      <section className="py-15">
        <div className="max-w-6xl mx-auto px-6 text-center max-w-3xl">
          <h2 className="text-3xl font-semibold mb-6">
            A Space Designed for Connection
          </h2>

          <p className="text-gray-300 leading-relaxed mb-6">
            The Social Room is Pixoul’s dedicated venue for smaller events,
            casual celebrations, and private gatherings. Whether you're hosting
            a birthday, meeting friends, or booking a private session, this
            space provides the perfect atmosphere.
          </p>

          <p className="text-gray-400 leading-relaxed mb-10">
            Enjoy comfort, immersive lighting, and easy access to Pixoul’s
            gaming experiences — all in one social hub.
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
            Social Room Features
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="
                  bg-black/70
                  border border-white/10
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
                <p className="text-sm text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CallToActionBanner
        title="Host Your Next Gathering at Pixoul"
        highlight="Social Room"
        description="A premium space for birthdays, meetups, and unforgettable group nights."
        primaryAction={{
          label: "Book the Social Room",
          href: "/book?venue=social-room",
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
        title="Make It a Night to Remember"
        highlight="Pixoul"
        description="Reserve the Social Room and create your own immersive celebration."
        primaryAction={{
          label: "Reserve Now",
          href: "/book?venue=social-room",
        }}
      />
    </>
  );
}
