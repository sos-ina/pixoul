import Hero from '@/components/ui/Hero';
import Link from "next/link";
import CallToActionBanner from "@/components/ui/CTA";
import GameGrid from '@/components/vr/GameGrid';
import Title from '@/components/ui/Title';

export const metadata = {
  title: " Console Experience | Pixoul Gaming",
};


export const consoleGames = [
  // =========================
  // Console Game
  // =========================
  {
    experience_id: "ps5-1-hour",
    title: "1 Hour PS5",
    slug: "ps5-1-hour",
    category_name: "console-game",
    image_url: "/images/PS5.png",
    genre: "console",

    can_book: true,
    has_details: true,

    duration_minutes: 60,
    min_players: 1,
    max_players: 4,
    min_age: 7,
    price: 35,
  },
];





export default function ConsoleGamesPage(){
    

    return(
        <>
        <Hero
        imageSrc="/images/MOBILE-GAMING.png"
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