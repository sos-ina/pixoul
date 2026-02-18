import Hero from '@/components/ui/Hero';
import Link from "next/link";
import CallToActionBanner from "@/components/ui/CTA";
import GameGrid from '@/components/vr/GameGrid';
import Title from '@/components/ui/Title';

export const arcadeGames = [
  {
    experience_id: "michael-jackson",
    title: "Michael Jackson",
    slug: "michael-jackson",
    category_name: "arcades",
    image_url: "/images/MICHAEL-JACKSON.png",
    genre: "arcade",

    can_book: true,
    has_details: true,

    duration_minutes: 10,
    min_players: 1,
    max_players: 2,
    min_age: 7,
    price: 6,
  },

  {
    experience_id: "mike-tyson",
    title: "Mike Tyson",
    slug: "mike-tyson",
    category_name: "arcades",
    image_url: "/images/MIKE-TYSON.png",
    genre: "fighting",

    can_book: true,
    has_details: true,

    duration_minutes: 10,
    min_players: 1,
    max_players: 2,
    min_age: 10,
    price: 6,
  },

  {
    experience_id: "mortal-kombbat",
    title: "Mortal Kombbat",
    slug: "mortal-kombbat",
    category_name: "arcades",
    image_url: "/images/MORTAL-KOMBBAT.png",
    genre: "fighting",

    can_book: true,
    has_details: true,

    duration_minutes: 10,
    min_players: 1,
    max_players: 2,
    min_age: 13,
    price: 6,
  },

  {
    experience_id: "nba",
    title: "NBA",
    slug: "nba",
    category_name: "arcades",
    image_url: "/images/NBA.png",
    genre: "sports",

    can_book: true,
    has_details: true,

    duration_minutes: 10,
    min_players: 1,
    max_players: 4,
    min_age: 7,
    price: 6,
  },

  {
    experience_id: "pac-man",
    title: "Pac-Man",
    slug: "pac-man",
    category_name: "arcades",
    image_url: "/images/PAC-MAN.png",
    genre: "classic",

    can_book: true,
    has_details: true,

    duration_minutes: 10,
    min_players: 1,
    max_players: 1,
    min_age: 6,
    price: 6,
  },

  {
    experience_id: "sonic-the-hedgehog",
    title: "Sonic the Hedgehog",
    slug: "sonic-the-hedgehog",
    category_name: "arcades",
    image_url: "/images/SONIC.png",
    genre: "platform",

    can_book: true,
    has_details: true,

    duration_minutes: 10,
    min_players: 1,
    max_players: 1,
    min_age: 6,
    price: 6,
  },

  {
    experience_id: "street-fighter",
    title: "Street Fighter",
    slug: "street-fighter",
    category_name: "arcades",
    image_url: "/images/STREET-FIGHTER.png",
    genre: "fighting",

    can_book: true,
    has_details: true,

    duration_minutes: 10,
    min_players: 1,
    max_players: 2,
    min_age: 12,
    price: 6,
  },

  {
    experience_id: "super-mario-kart",
    title: "Super Mario Kart",
    slug: "super-mario-kart",
    category_name: "arcades",
    image_url: "/images/SUPER-MARIO-KART.png",
    genre: "racing",

    can_book: true,
    has_details: true,

    duration_minutes: 10,
    min_players: 1,
    max_players: 4,
    min_age: 7,
    price: 6,
  },

  {
    experience_id: "teenage-mutant-ninja-turtles",
    title: "Teenage Mutant Ninja Turtles",
    slug: "teenage-mutant-ninja-turtles",
    category_name: "arcades",
    image_url: "/images/TMNT.png",
    genre: "action",

    can_book: true,
    has_details: true,

    duration_minutes: 10,
    min_players: 1,
    max_players: 4,
    min_age: 10,
    price: 6,
  },

  {
    experience_id: "tekken",
    title: "Tekken",
    slug: "tekken",
    category_name: "arcades",
    image_url: "/images/TEKKEN.png",
    genre: "fighting",

    can_book: true,
    has_details: true,

    duration_minutes: 10,
    min_players: 1,
    max_players: 2,
    min_age: 13,
    price: 6,
  },

  {
    experience_id: "the-simpsons",
    title: "The Simpsons",
    slug: "the-simpsons",
    category_name: "arcades",
    image_url: "/images/THE-SIMPSONS.png",
    genre: "adventure",

    can_book: true,
    has_details: true,

    duration_minutes: 10,
    min_players: 1,
    max_players: 4,
    min_age: 8,
    price: 6,
  },

  {
    experience_id: "daytona",
    title: "Daytona",
    slug: "daytona",
    category_name: "arcades",
    image_url: "/images/DAYTONA.png",
    genre: "racing",

    can_book: true,
    has_details: true,

    duration_minutes: 10,
    min_players: 1,
    max_players: 2,
    min_age: 8,
    price: 12,
  },

  {
    experience_id: "soccer",
    title: "SOCCER",
    slug: "soccer",
    category_name: "arcades",
    image_url: "/images/SOCCER.png",
    genre: "sports",

    can_book: true,
    has_details: true,

    duration_minutes: 10,
    min_players: 1,
    max_players: 4,
    min_age: 7,
    price: 20,
  },
]


export const metadata = {
  title: " Arcade Experience | Pixoul Gaming",
};
export default function ArcadeGamesPage(){
    

    return(
        <>
        <Hero
        imageSrc="/images/PG-0272.jpg"
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