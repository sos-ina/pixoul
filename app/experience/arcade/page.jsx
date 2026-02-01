import Hero from '@/components/ui/Hero';
import Link from "next/link";
import CallToActionBanner from "@/components/ui/CTA";
import GameGrid from '@/components/vr/GameGrid';
import Title from '@/components/ui/Title';

export const arcadeGames = [
  {
    experience_id: "air-hockey",
    title: "Air Hockey",
    slug: "air-hockey",
    category_name: "arcade",
    image_url: "/images/PG-0151.jpg",
    genre: "arcade sports",

    can_book: false,
    has_details: false,

    duration_minutes: null,
    min_players: 2,
    max_players: 2,
    min_age: 6,
  },

  {
    experience_id: "basketball-hoops",
    title: "Basketball Hoops",
    slug: "basketball-hoops",
    category_name: "arcade",
    image_url: "/images/PG-0151.jpg",
    genre: "arcade sports",

    can_book: false,
    has_details: false,

    duration_minutes: null,
    min_players: 1,
    max_players: 2,
    min_age: 6,
  },

  {
    experience_id: "boxing-machine",
    title: "Boxing Machine",
    slug: "boxing-machine",
    category_name: "arcade",
    image_url: "/images/PG-0151.jpg",
    genre: "reaction / strength",

    can_book: false,
    has_details: false,

    duration_minutes: null,
    min_players: 1,
    max_players: 1,
    min_age: 10,
  },

  {
    experience_id: "whack-a-mole",
    title: "Whack-A-Mole",
    slug: "whack-a-mole",
    category_name: "arcade",
    image_url: "/images/PG-0151.jpg",
    genre: "reaction",

    can_book: false,
    has_details: false,

    duration_minutes: null,
    min_players: 1,
    max_players: 1,
    min_age: 5,
  },

  {
    experience_id: "claw-machine",
    title: "Claw Machine",
    slug: "claw-machine",
    category_name: "arcade",
    image_url: "/images/PG-0151.jpg",
    genre: "skill / luck",

    can_book: false,
    has_details: false,

    duration_minutes: null,
    min_players: 1,
    max_players: 1,
    min_age: 4,
  },

  {
    experience_id: "racing-arcade",
    title: "Racing Arcade",
    slug: "racing-arcade",
    category_name: "arcade",
    image_url: "/images/PG-0151.jpg",
    genre: "racing",

    can_book: false,
    has_details: false,

    duration_minutes: null,
    min_players: 1,
    max_players: 2,
    min_age: 7,
  },
];

export const metadata = {
  title: " Arcade Experience | Pixoul Gaming",
};
export default function ArcadeGamesPage(){
    

    return(
        <>
        <Hero
        imageSrc="/images/PG-0204.jpg"
        overlay={true}
        >
            <div className="flex flex-col items-center justify-center h-full text-center px-6">

        {/* Main headline */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
         KINETIC  
          <br />
          <span className="text-[#38C2D9]">ARENA</span>
        </h1>

        {/* Supporting text */}
        <p className="text-gray-300 max-w-2xl mb-10 text-base md:text-lg">
          High-score chasing in its purest form. Experience the neon-drenched thrill of lightning-fast reflexes and classic coin-op mastery.
        </p>
        </div>
        </Hero>


        <Title align="center">Our Arcade Games</Title>

        <GameGrid experiences={arcadeGames} />


        <CallToActionBanner
              title="CAN'T DECIDE?"
              highlight="DECIDE?"
              description="Try our Pixoul Pass! Get access to multiple experiences at a discounted rate. Perfect for first-timers."
              primaryAction={{
                label: "View All Games",
                href: "/",
              }}
            />

        </>

    );
}