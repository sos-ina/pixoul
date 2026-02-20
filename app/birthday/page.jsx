import Hero from "@/components/ui/Hero";
import Title from "@/components/ui/Title";
import CallToActionBanner from "@/components/ui/CTA";
import ExploreGrid from '@/components/ui/ExploreGrid';

//import BlurModal from "@/components/ui/BlurModal";
//import BirthdayBookingForm from "@/components/forms/BirthdayBookingForm";

export const metadata = {
  title: "Birthday Parties | Pixoul Gaming",
};

export default function BirthdayPartiesPage() {
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
      title: "Starter Party Pack",
      description: "Perfect for small groups with VR + arcade access.",
    },
    {
      title: "MegaVerse Birthday Experience",
      description:
        "Step into Pixoul’s VR storyline with immersive adventures and characters.",
    },
    {
      title: "VIP Premium Celebration",
      description:
        "Private lounge, catering upgrades, premium support, and unforgettable luxury.",
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
            <a
              href="/session-cart"
              className="
                px-8 py-3
                bg-[#38C2D9]
                dark:text-black text-white
                font-semibold
                hover:bg-[#2fa8bb]
                transition
              "
            >
              Build Your Party
            </a>

            <a
              href="/events/hall"
              className="
                px-8 py-3
                border border-white/20
                hover:border-[#38C2D9]
                hover:text-[#38C2D9]
                transition
              "
            >
              Explore Venues
            </a>
          </div>
        </div>
      </Hero>

      {/* ABOUT */}
      <section className="py-20">
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
      <section className="py-20 dark:bg-black/40 bg-white/40">
        <div className="max-w-6xl mx-auto px-6">
          <Title align="center">Birthday Packages</Title>

          <p className="dark:text-gray-400 text-gray-600 text-center max-w-2xl mx-auto mt-4 mb-12">
            Choose a ready-made celebration package or build your own custom
            Pixoul birthday experience.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.title}
                className="
                  dark:bg-black/70 bg-white/70
                  border border-white/10
                  p-8
                  hover:border-[#38C2D9]/70
                  transition
                  shadow-[0_0_30px_rgba(56,194,217,0.10)]
                "
              >
                <h3 className="text-lg font-semibold text-[#38C2D9] mb-3">
                  {pkg.title}
                </h3>
                <p className="text-sm dark:text-gray-200 text-gray-600 leading-relaxed">
                  {pkg.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VENUE OPTIONS */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <Title align="center">Choose Your Venue</Title>

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
      <CallToActionBanner
        title="Ready to Celebrate at Pixoul?"
        highlight="at Pixoul?"
        description="Build your birthday session today or contact our events team for custom packages."
        primaryAction={{
          label: "Book For Your Birthday",
          href: "/birthday/form",
        }}
      />
    </>
  );
}
