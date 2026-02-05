import Hero from '@/components/ui/Hero';
import Link from "next/link";
import CallToActionBanner from "@/components/ui/CTA";
import GameGrid from '@/components/vr/GameGrid';
import Title from '@/components/ui/Title';

export const metadata = {
  title: " PC Experience | Pixoul Gaming",
};


export const pcGames = [
  {
    experience_id: "fortnite",
    title: "Fortnite",
    slug: "fortnite",
    category_name: "pc",
    image_url: "/images/PG-0272.jpg",
    genre: "battle royale",

    can_book: true,
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
    image_url: "/images/PG-0272.jpg",
    genre: "tactical shooter",

    can_book: true,
    has_details: false,

    duration_minutes: null,
    min_players: 1,
    max_players: 5,
    min_age: 12,
  },

  {
    experience_id: "fifa",
    title: "EA Sports FC",
    slug: "ea-sports-fc",
    category_name: "pc",
    image_url: "/images/PG-0272.jpg",
    genre: "sports",

    can_book: true,
    has_details: false,

    duration_minutes: null,
    min_players: 1,
    max_players: 4,
    min_age: 3,
  },

  {
    experience_id: "minecraft",
    title: "Minecraft",
    slug: "minecraft",
    category_name: "pc",
    image_url: "/images/PG-0272.jpg",
    genre: "sandbox",

    can_book: true,
    has_details: false,

    duration_minutes: null,
    min_players: 1,
    max_players: 8,
    min_age: 7,
  },

  {
    experience_id: "call-of-duty",
    title: "Call of Duty",
    slug: "call-of-duty",
    category_name: "pc",
    image_url: "/images/PG-0272.jpg",
    genre: "shooter",

    can_book: true,
    has_details: false,

    duration_minutes: null,
    min_players: 1,
    max_players: 6,
    min_age: 16,
  },

  {
    experience_id: "rocket-league",
    title: "Rocket League",
    slug: "rocket-league",
    category_name: "pc",
    image_url: "/images/PG-0272.jpg",
    genre: "sports / arcade",

    can_book: true,
    has_details: false,

    duration_minutes: null,
    min_players: 1,
    max_players: 4,
    min_age: 7,
  },
];





export default function PcGamesPage(){
    

    return(
        <>
        <Hero
        imageSrc="/images/PG-0316.jpg"
        overlay={true}
        >
            <div className="flex flex-col items-center justify-center h-full text-center px-6">

        {/* Main headline */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          THE MASTER 
          <br />
          <span className="text-[#38C2D9]">RIG</span>
        </h1>

        {/* Supporting text */}
        <p className="text-gray-300 max-w-2xl mb-10 text-base md:text-lg">
          Unlocked framerates and ultra-spec graphics. Command the battlefield with the precision of high-performance hardware.
        </p>
        </div>
        </Hero>


        <Title align="center">Our PC Games</Title>

        <GameGrid experiences={pcGames} />


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