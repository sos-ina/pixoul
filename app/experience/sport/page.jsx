import Hero from '@/components/ui/Hero';
import Link from "next/link";
import CallToActionBanner from "@/components/ui/CTA";
import GameGrid from '@/components/vr/GameGrid';
import Title from '@/components/ui/Title';

export const metadata = {
  title: " Sport Experience | Pixoul Gaming",
};



export const sportGames = [
  {
    experience_id: "bowling",
    title: "Bowling",
    slug: "bowling",
    category_name: "sport",
    image_url: "/images/PG-0180.jpg",
    genre: "sport classic",

    can_book: true,
    has_details: false,

    duration_minutes: null,
    min_players: 1,
    max_players: 1,
    min_age: 5,
    price: 50,
  },
];

export default function SportGamesPage(){
    

    return(
        <>
        <Hero
        imageSrc="https://placehold.net/default.png"
        overlay={true}
        >
            <div className="flex flex-col items-center justify-center h-full text-center px-6">

        {/* Main headline */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          PRECISION 
          <br />
          <span className="text-[#38C2D9]">LANES</span>
        </h1>

        {/* Supporting text */}
        <p className="text-gray-300 max-w-2xl mb-10 text-base md:text-lg">
          Master the physics of the perfect strike. From neon-lit bowling alleys to high-stakes billiards, dominate the game where every millimeter counts.
        </p>
        </div>
        </Hero>


        <Title align="center">Our Sport Games</Title>

        <GameGrid experiences={sportGames} />


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
