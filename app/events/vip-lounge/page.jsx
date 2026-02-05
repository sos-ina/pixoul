import Hero from "@/components/ui/Hero";
import StatGrid from "@/components/ui/StatGrid";
import CallToActionBanner from "@/components/ui/CTA";
import ImageCarousel from "@/components/ui/ImageCarousel";
import BookNowButton from "@/components/ui/BookNowButton";
import Title from "@/components/ui/Title";

import EventTypeGrid from "@/components/events/EventTypeGrid";

export const metadata = {
  title: "VIP Lounge | Pixoul Events",
};

export default function VipLoungePage() {
  // Stats Data
  const stats = [
    { label: "Capacity", value: "8–15 Guests" },
    { label: "Atmosphere", value: "Exclusive + Private" },
    { label: "Best For", value: "Premium Events" },
    { label: "Experience", value: "Elite Hosting" },
  ];

  // Gallery Images
  const galleryImages = [
    {
      image: "https://placehold.co/900x600",
      title: "VIP Lounge",
      subtitle: "A premium space for private experiences.",
    },
    {
      image: "https://placehold.co/900x600",
      title: "Luxury Comfort",
      subtitle: "Designed for elite-level hosting and atmosphere.",
    },
    {
      image: "https://placehold.co/900x600",
      title: "Pixoul Prestige",
      subtitle: "Where immersive gaming meets luxury events.",
    },
  ];

  // Services Data
  const services = [
    {
      title: "Private Lounge Seating",
      description:
        "Premium seating and a luxurious environment built for comfort and exclusivity.",
    },
    {
      title: "Elite Hosting",
      description:
        "Dedicated staff support ensuring a seamless and high-end experience.",
    },
    {
      title: "Corporate Ready",
      description:
        "Ideal for executive gatherings, private meetings, and team celebrations.",
    },
    {
      title: "Immersive Atmosphere",
      description:
        "Custom lighting, futuristic design, and Pixoul’s signature aesthetic.",
    },
    {
      title: "Premium Catering Options",
      description:
        "Exclusive food and beverage packages available upon request.",
    },
    {
      title: "VIP Privacy",
      description:
        "A space designed for guests who want a more personal and private setting.",
    },
  ];

  // Event Types Possible Here
  const eventTypes = [
    {
      title: "Corporate Events",
      subtitle: "Host executive gatherings in a premium space.",
    },
    {
      title: "Private Celebrations",
      subtitle: "Exclusive bookings for special occasions.",
    },
    {
      title: "VIP Birthdays",
      subtitle: "Luxury birthday experiences with privacy and style.",
    },
    {
      title: "Elite Group Nights",
      subtitle: "A high-end social experience for small groups.",
    },
  ];

  return (
    <>
      {/* HERO */}
      <Hero
        imageSrc="/images/AQ3C5358.jpg"
        overlay={true}
      >
        <div className="flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            THE{" "}
            <span className="text-[#38C2D9]">VIP LOUNGE</span>
          </h1>

          <p className="text-gray-300 max-w-2xl mb-10 text-base md:text-lg">
            A private and premium space crafted for elite gatherings,
            unforgettable celebrations, and exclusive Pixoul experiences.
          </p>
        </div>
      </Hero>

      {/* STATS */}
      <StatGrid stats={stats} />

      {/* ABOUT */}
      <section className="py-15">
        <div className="max-w-6xl mx-auto px-6 text-center max-w-3xl">
          <h2 className="text-3xl font-semibold mb-6">
            Exclusivity Meets Immersion
          </h2>

          <p className="text-gray-300 leading-relaxed mb-6">
            The VIP Lounge is Pixoul’s most private and premium venue space —
            designed for guests who want an elevated event experience.
          </p>

          <p className="text-gray-400 leading-relaxed mb-10">
            Whether you're hosting a corporate gathering, celebrating in style,
            or reserving a luxury gaming night, the VIP Lounge delivers comfort,
            privacy, and futuristic atmosphere.
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
            VIP Lounge Features
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
        title="Reserve the VIP Lounge Experience"
        highlight="VIP Lounge"
        description="Host your next private or corporate gathering in Pixoul’s most exclusive space."
        primaryAction={{
          label: "Book the VIP Lounge",
          href: "/book?venue=vip-lounge",
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
        title="Luxury Hosting, Pixoul Style"
        highlight="Exclusive"
        description="Step into the VIP Lounge and create an unforgettable premium event experience."
        primaryAction={{
          label: "Reserve Now",
          href: "/book?venue=vip-lounge",
        }}
      />
    </>
  );
}
