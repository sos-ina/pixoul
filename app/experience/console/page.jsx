import Hero from '@/components/ui/Hero';
import Link from "next/link";
import CallToActionBanner from "@/components/ui/CTA";
import GameGrid from '@/components/vr/GameGrid';
import Title from '@/components/ui/Title';

export const metadata = {
  title: " Console Experience | Pixoul Gaming",
};


export const consoleGames = [
  {
    experience_id: "tekken-7",
    title: "Tekken 7",
    slug: "tekken-7",
    category_name: "console",
    image_url: "/images/PG-0133.jpg",
    genre: "fighting",

    can_book: false,
    has_details: false,

    duration_minutes: null,
    min_players: 1,
    max_players: 2,
    min_age: 12,
  },

  {
    experience_id: "mortal-kombat-11",
    title: "Mortal Kombat 11",
    slug: "mortal-kombat-11",
    category_name: "console",
    image_url: "/images/PG-0133.jpg",
    genre: "fighting",

    can_book: false,
    has_details: false,

    duration_minutes: null,
    min_players: 1,
    max_players: 2,
    min_age: 18,
  },

  {
    experience_id: "gran-turismo",
    title: "Gran Turismo",
    slug: "gran-turismo",
    category_name: "console",
    image_url: "/images/PG-0133.jpg",
    genre: "racing",

    can_book: false,
    has_details: false,

    duration_minutes: null,
    min_players: 1,
    max_players: 2,
    min_age: 3,
  },

  {
    experience_id: "nba-2k",
    title: "NBA 2K",
    slug: "nba-2k",
    category_name: "console",
    image_url: "/images/PG-0133.jpg",
    genre: "sports",

    can_book: false,
    has_details: false,

    duration_minutes: null,
    min_players: 1,
    max_players: 4,
    min_age: 3,
  },

  {
    experience_id: "call-of-duty-console",
    title: "Call of Duty",
    slug: "call-of-duty-console",
    category_name: "console",
    image_url: "/images/PG-0133.jpg",
    genre: "shooter",

    can_book: false,
    has_details: false,

    duration_minutes: null,
    min_players: 1,
    max_players: 4,
    min_age: 18,
  },

  {
    experience_id: "fifa-console",
    title: "EA Sports FC",
    slug: "ea-sports-fc-console",
    category_name: "console",
    image_url: "/images/PG-0133.jpg",
    genre: "sports",

    can_book: false,
    has_details: false,

    duration_minutes: null,
    min_players: 1,
    max_players: 4,
    min_age: 3,
  },
];





export default function ConsoleGamesPage(){
    

    return(
        <>
        <Hero
        imageSrc="/images/PG-0204.jpg"
        overlay={true}
        >
            <div className="flex flex-col items-center justify-center h-full text-center px-6">

        {/* Main headline */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          NEXT-GEN  
          <br />
          <span className="text-[#38C2D9]">REACH</span>
        </h1>

        {/* Supporting text */}
        <p className="text-gray-300 max-w-2xl mb-10 text-base md:text-lg">
          The heart of the living room. Dive into cinematic exclusives and seamless 4K gaming on the world’s most powerful systems.
        </p>
        </div>
        </Hero>


        <Title align="center">Our Console Games</Title>

        <GameGrid experiences={consoleGames} />


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