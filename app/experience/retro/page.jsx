import Hero from '@/components/ui/Hero';
import Link from "next/link";
import CallToActionBanner from "@/components/ui/CTA";
import GameGrid from '@/components/vr/GameGrid';
import Title from '@/components/ui/Title';

export const metadata = {
  title: " Retro Experience | Pixoul Gaming",
};



export const retroGames = [
  {
    experience_id: "pac-man",
    title: "Pac-Man",
    slug: "pac-man",
    category_name: "retro",
    image_url: "/images/PG-0180.jpg",
    genre: "arcade classic",

    can_book: false,
    has_details: false,

    duration_minutes: null,
    min_players: 1,
    max_players: 1,
    min_age: 5,
  },

  {
    experience_id: "space-invaders",
    title: "Space Invaders",
    slug: "space-invaders",
    category_name: "retro",
    image_url: "/images/PG-0180.jpg",
    genre: "arcade shooter",

    can_book: false,
    has_details: false,

    duration_minutes: null,
    min_players: 1,
    max_players: 1,
    min_age: 6,
  },

  {
    experience_id: "donkey-kong",
    title: "Donkey Kong",
    slug: "donkey-kong",
    category_name: "retro",
    image_url: "/images/PG-0180.jpg",
    genre: "platformer",

    can_book: false,
    has_details: false,

    duration_minutes: null,
    min_players: 1,
    max_players: 1,
    min_age: 6,
  },

  {
    experience_id: "galaga",
    title: "Galaga",
    slug: "galaga",
    category_name: "retro",
    image_url: "/images/PG-0180.jpg",
    genre: "arcade shooter",

    can_book: false,
    has_details: false,

    duration_minutes: null,
    min_players: 1,
    max_players: 1,
    min_age: 6,
  },

  {
    experience_id: "street-fighter-ii",
    title: "Street Fighter II",
    slug: "street-fighter-ii",
    category_name: "retro",
    image_url: "/images/PG-0180.jpg",
    genre: "fighting",

    can_book: false,
    has_details: false,

    duration_minutes: null,
    min_players: 1,
    max_players: 2,
    min_age: 10,
  },

  {
    experience_id: "metal-slug",
    title: "Metal Slug",
    slug: "metal-slug",
    category_name: "retro",
    image_url: "/images/PG-0180.jpg",
    genre: "run and gun",

    can_book: false,
    has_details: false,

    duration_minutes: null,
    min_players: 1,
    max_players: 2,
    min_age: 8,
  },
];

export default function RetroGamesPage(){
    

    return(
        <>
        <Hero
        imageSrc="/images/PG-0204.jpg"
        overlay={true}
        >
            <div className="flex flex-col items-center justify-center h-full text-center px-6">

        {/* Main headline */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          LEGACY 
          <br />
          <span className="text-[#38C2D9]">PROTOCOL</span>
        </h1>

        {/* Supporting text */}
        <p className="text-gray-300 max-w-2xl mb-10 text-base md:text-lg">
          Where it all began. Revisit the 8-bit classics and 16-bit legends that defined a generation of play.
        </p>
        </div>
        </Hero>


        <Title align="center">Our Retro Games</Title>

        <GameGrid experiences={retroGames} />


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
