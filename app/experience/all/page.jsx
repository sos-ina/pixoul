import Hero from '@/components/ui/Hero';
import Link from "next/link";
import CallToActionBanner from "@/components/ui/CTA";
import GameGrid from '@/components/vr/GameGrid';
import Title from '@/components/ui/Title';

export const allExperiences = [
  // ===== VR EXPERIENCES =====
  {
    experience_id: "the-lift",
    title: "The Lift",
    slug: "the-lift",
    category_name: "vr",
    image_url: "/images/PG-0063.jpg",
    genre: "action / thriller",

    can_book: true,
    has_details: true,

    duration_minutes: 30,
    min_players: 1,
    max_players: 4,
    min_age: 12,
  },

  {
    experience_id: "pixel-recon",
    title: "Pixel Recon",
    slug: "pixel-recon",
    category_name: "vr",
    image_url: "/images/PG-0063.jpg",
    genre: "strategy",

    can_book: true,
    has_details: true,

    duration_minutes: 45,
    min_players: 4,
    max_players: 4,
    min_age: 13,
  },

  // ===== PC GAMES =====
  {
    experience_id: "fortnite",
    title: "Fortnite",
    slug: "fortnite",
    category_name: "pc",
    image_url: "/images/PG-0063.jpg",
    genre: "battle royale",

    can_book: false,
    has_details: false,

    duration_minutes: null,
    min_players: 1,
    max_players: 4,
    min_age: 10,
  },

  {
    experience_id: "valorant",
    title: "Valorant",
    slug: "valorant",
    category_name: "pc",
    image_url: "/images/PG-0063.jpg",
    genre: "tactical shooter",

    can_book: false,
    has_details: false,

    duration_minutes: null,
    min_players: 1,
    max_players: 5,
    min_age: 12,
  },

  // ===== ARCADE GAMES =====
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

  // ===== RETRO GAMES =====
  {
    experience_id: "pac-man",
    title: "Pac-Man",
    slug: "pac-man",
    category_name: "retro",
    image_url: "/images/PG-0151.jpg",
    genre: "arcade classic",

    can_book: false,
    has_details: false,

    duration_minutes: null,
    min_players: 1,
    max_players: 1,
    min_age: 5,
  },

  {
    experience_id: "street-fighter-ii",
    title: "Street Fighter II",
    slug: "street-fighter-ii",
    category_name: "retro",
    image_url: "/images/PG-0151.jpg",
    genre: "fighting",

    can_book: false,
    has_details: false,

    duration_minutes: null,
    min_players: 1,
    max_players: 2,
    min_age: 10,
  },

  // ===== CONSOLE GAMES =====
  {
    experience_id: "tekken-7",
    title: "Tekken 7",
    slug: "tekken-7",
    category_name: "console",
    image_url: "/images/PG-0151.jpg",
    genre: "fighting",

    can_book: false,
    has_details: false,

    duration_minutes: null,
    min_players: 1,
    max_players: 2,
    min_age: 12,
  },

  {
    experience_id: "nba-2k",
    title: "NBA 2K",
    slug: "nba-2k",
    category_name: "console",
    image_url: "/images/PG-0151.jpg",
    genre: "sports",

    can_book: false,
    has_details: false,

    duration_minutes: null,
    min_players: 1,
    max_players: 4,
    min_age: 3,
  },
];

export const metadata = {
  title: " All Games | Pixoul Gaming",
};

export default function AllGamesPage(){
    

    return(
        <>
        <Hero
        imageSrc="/images/PG-0204.jpg"
        overlay={true}
        >
            <div className="flex flex-col items-center justify-center h-full text-center px-6">

        {/* Main headline */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
         GAME 
          <br />
          <span className="text-[#38C2D9]">LIBRARY</span>
        </h1>

        {/* Supporting text */}
        <p className="text-gray-300 max-w-2xl mb-10 text-base md:text-lg">
          Every world, every era. Browse our complete catalog of titles across all platforms and genres.
        </p>
        </div>
        </Hero>


        <Title align="center">All Games</Title>

        <GameGrid experiences={allExperiences} />


        <CallToActionBanner
              title="Make Your Choice!"
              highlight="Choice!"
              description="Ready to dive in? Book your gaming experience today and embark on an unforgettable adventure!"
              primaryAction={{
                label: "Book Now",
                href: "/",
              }}
            />

        </>

    );
}