import Hero from '@/components/ui/Hero';
import CallToActionBanner from "@/components/ui/CTA";
import GameGrid from '@/components/vr/GameGrid';
import Title from '@/components/ui/Title';

export const metadata = {
  title: " PC Experience | Pixoul Gaming",
};

export const pcGames = [
  {
    experience_id: "training-room",
    slug: "training-room",
    title: "Training Room",
    category_name: "pc",
    image_url: "/images/PG-0316.jpg",
    genre: "pc gaming",
    can_book: true,
    has_details: false,
    booking_type: "hourly",
    min_hours: 1,
    max_hours: 6,
    price: 20,
  },
  {
    experience_id: "vip-room",
    slug: "vip-room",
    title: "VIP Room",
    category_name: "pc",
    image_url: "/images/PG-0316.jpg",
    genre: "pc gaming",
    can_book: true,
    has_details: false,
    booking_type: "hourly",
    min_hours: 1,
    max_hours: 5,
    price: 35,
  },
  {
    experience_id: "private-room",
    slug: "private-room",
    title: "Private Room",
    category_name: "pc",
    image_url: "/images/PG-0316.jpg",
    genre: "pc gaming",
    can_book: true,
    has_details: false,
    booking_type: "hourly",
    min_hours: 1,
    max_hours: 5,
    price: 50,
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
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white dark:text-white">
          THE MASTER 
          <br />
          <span className="text-[#38C2D9]">RIG</span>
        </h1>

        {/* Supporting text */}
        <p className="text-white/80 max-w-2xl mb-10 text-base md:text-lg">
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
                href: "/experience/all",
              }}
            />

        </>

    );
}