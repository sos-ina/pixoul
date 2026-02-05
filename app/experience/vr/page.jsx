import Hero from '@/components/ui/Hero';
import Link from "next/link";
import CallToActionBanner from "@/components/ui/CTA";
import GameGrid from '@/components/vr/GameGrid';
import Title from '@/components/ui/Title';
import VRStoryPreview from '@/components/vr/VRStoryPreview';

export const metadata = {
  title: "VR Experience | Pixoul Gaming",
};


export const experiences = [
  {
    experience_id: "cryo-capsule",
    title: "Cryo Capsule",
    slug: "cryo-capsule",
    category_name: "vr",
    image_url: "/images/CRYO-GENESIS.png",
    genre: "adventure",

    can_book: true,
    has_details: true,

    duration_minutes: 30,
    min_players: 1,
    max_players: 1,
    min_age: 12,
  },

  {
    experience_id: "the-lift",
    title: "The Lift",
    slug: "the-lift",
    category_name: "vr",
    image_url: "/images/THE-LIFT.png",
    genre: "action / thriller",

    can_book: true,
    has_details: true,

    duration_minutes: 30,
    min_players: 1,
    max_players: 4,
    min_age: 12,
  },

  {
    experience_id: "operation-b",
    title: "Operation B",
    slug: "operation-b",
    category_name: "vr",
    image_url: "/images/OPERATION-B.png",
    genre: "action / adventure",

    can_book: true,
    has_details: true,

    duration_minutes: 30,
    min_players: 2,
    max_players: 2,
    min_age: 12,
  },

  {
    experience_id: "parashift",
    title: "Parashift",
    slug: "parashift",
    category_name: "vr",
    image_url: "/images/PARASHIFT.png",
    genre: "action / adventure",

    can_book: true,
    has_details: true,

    duration_minutes: 15,
    min_players: 1,
    max_players: 1,
    min_age: 10,
  },

  {
    experience_id: "hexa-looper",
    title: "Hexa Looper",
    slug: "hexa-looper",
    category_name: "vr",
    image_url: "/images/HEXA-LOOPER.png",
    genre: "thriller / adventure",

    can_book: true,
    has_details: true,

    duration_minutes: 5,
    min_players: 1,
    max_players: 1,
    min_age: 10,
  },

  {
    experience_id: "planked",
    title: "Planked!",
    slug: "planked",
    category_name: "vr",
    image_url: "/images/PLANKED.png",
    genre: "vr thriller",

    can_book: true,
    has_details: true,

    duration_minutes: 10,
    min_players: 1,
    max_players: 1,
    min_age: 13,
  },

  {
    experience_id: "mach-6-racer",
    title: "Mach 6 Racer",
    slug: "mach-6-racer",
    category_name: "vr",
    image_url: "/images/SPEED-RACER.png",
    genre: "racing",

    can_book: true,
    has_details: true,

    duration_minutes: 10,
    min_players: 1,
    max_players: 1,
    min_age: 10,
  },

  {
    experience_id: "solosoul",
    title: "Solosoul",
    slug: "solosoul",
    category_name: "vr",
    image_url: "/images/SOLOSOUL.png",
    genre: "action / adventure",

    can_book: true,
    has_details: true,

    duration_minutes: 20,
    min_players: 1,
    max_players: 1,
    min_age: 12,
  },

  {
    experience_id: "battle-rush",
    title: "Battle Rush",
    slug: "battle-rush",
    category_name: "vr",
    image_url: "/images/BATTLE-RUSH.png",
    genre: "action / adventure",

    can_book: true,
    has_details: true,

    duration_minutes: 30,
    min_players: 4,
    max_players: 4,
    min_age: 13,
  },

  {
    experience_id: "pixel-recon",
    title: "Pixel Recon",
    slug: "pixel-recon",
    category_name: "vr",
    image_url: "/images/PIXEL-RECON.png",
    genre: "strategy",

    can_book: true,
    has_details: true,

    duration_minutes: 45,
    min_players: 4,
    max_players: 4,
    min_age: 13,
  },
];




export default function VrGamesPage(){
    

    return(
        <>
        <Hero
        imageSrc="/images/PG-0116.jpg"
        overlay={true}
        >
            <div className="flex flex-col items-center justify-center h-full text-center px-6">

        {/* Main headline */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Step Into Another
          <br />
          <span className="text-[#38C2D9]">Reality</span>
        </h1>

        {/* Supporting text */}
        <p className="text-gray-300 max-w-2xl mb-10 text-base md:text-lg">
          Step beyond the screen. Experience 360-degree digital worlds with cutting-edge haptic feedback and spatial audio.
        </p>
        </div>
        </Hero>

         {/* Story Preview */}
      <VRStoryPreview
        title="Pixoul Megaverse"
        description={[
          "Pixoul VR is more than a collection of games — it is a connected universe of realities, characters, and evolving worlds.",
          "Each experience is a fragment of a larger story, where players step into roles that shape the fate of the Pixoul Megaverse.",
        ]}
        storyHref="/experience/vr/story"
      />

        <Title align="center">Our VR Games</Title>

        <GameGrid experiences={experiences} />


        <CallToActionBanner
              title="CAN'T DECIDE?"
              highlight="DECIDE?"
              description="Try our Pixoul Pass! Get access to multiple experiences at a discounted rate. Perfect for first-timers."
              primaryAction={{
                label: "View All Games",
                href: "/experience/all",
              }}
            />

        </>

    );
}