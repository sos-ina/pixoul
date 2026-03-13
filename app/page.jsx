import Hero from '@/components/ui/Hero';
import StatsGrid from '@/components/ui/StatGrid';
import ExploreGrid from '@/components/ui/ExploreGrid';
import ImageCarousel from '@/components/ui/ImageCarousel';
import BookNowButton from '@/components/ui/BookNowButton';
import CallToActionBanner from "@/components/ui/CTA";
import Title from "@/components/ui/Title";
import Link from "next/link";

export const metadata = {
  title: "Home | Pixoul Gaming",
};

{/*quick cards */}
const stats = [
  { value: "10+", label: "VR Games", description: "Immersive virtual worlds" },
  { value: "3", label: "Experience Zones", description: "Multi-sensory spaces" },
  { value: "5000+", label: "Players", description: "Joined the Pixoul world" },
  { value: "100+", label: "Events Hosted", description: "Unforgettable moments" },
];

{/*Explore items */}
const exploreItems = [
  {
    title: "VR Experiences",
    description: "Step into immersive virtual worlds.",
    image: "images/PG-0116.jpg",
    href: "/experience/vr",
  },
  {
    title: "Birthday Parties",
    description: "Unforgettable celebrations for all ages.",
    image: "images/birthday.jpg",
    href: "/birthday",
  },
  {
    title: "The Hall",
    description: "Host events in our futuristic venue.",
    image: "images/The Hall.png",
    href: "/events/hall",
  },
];

{/*horizontal scroll image gallery */}

const carouselItems = [
  {
    image: "/images/PG-0116.jpg",
    title: "Pixoul Gaming",
    subtitle: "Immersive VR worlds designed to thrill.",
  },
  {
    image: "/images/birthday.jpg",
    title: "Birthday Parties",
    subtitle: "Celebrate in a whole new reality.",
  },
  {
    image: "/images/The Hall.png",
    title: "The Hall",
    subtitle: "A futuristic space for unforgettable events.",
  },
];



export default function Home() {
  return (
    <>
      <Hero 
      videoSrc="/videos/Pixoul gaming trailer.mp4" 
      overlay={true}
      >
  <div className="flex flex-col items-center justify-center h-full text-center px-6">

        {/* Eyebrow / small label */}
        <span className="mb-4 text-sm tracking-widest text-[#38C2D9] uppercase">
          IMMERSE YOURSELF IN THE GAME
        </span>

        {/* Main headline */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
          WELCOME TO THE
          <br />
          <span className="text-[#38C2D9]">FUTURE OF PLAY</span>
        </h1>

        {/* Supporting text */}
        <p className="text-white/80 max-w-2xl mb-10 text-base md:text-lg">
          Experience next generation virtual reality, gaming, and events
          designed to thrill, connect, and inspire.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">

          {/* Primary CTA */}
          <Link href="/mission-bundles"><BookNowButton className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base" /></Link>

          {/* Secondary CTA */}
          <Link href="/experience/all">
          <button className="
            px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base
            border border-[#38C2D9]
            text-white hover:bg-[#38C2D9]/10
            rounded-none
            tracking-wide
            hover:bg-[#38C2D9]/10
            hover:border-[#38C2D9] hover:text-[#38C2D9]
            transition
          ">

             Explore Experiences
          </button>
          </Link>
           

        </div>

      </div>
      
      </Hero>
      <StatsGrid stats={stats} />

      <Title align="center">Explore Pixoul</Title>
      <ExploreGrid items={exploreItems} />


      <div className="py-12">
      <Title align="center">Inside the Pixoul Experience</Title>
      <ImageCarousel items={carouselItems} />
     </div> 

      <CallToActionBanner
      title="READY TO PLAY?"
      highlight="PLAY?"
      description="Book your session now and experience the future of gaming. Walk-ins welcome, but reservations guarantee your spot."
      primaryAction={{
        label: "Explore Games",
        href: "/experience/all",
      }}
    />


    
    </>
  );
}
