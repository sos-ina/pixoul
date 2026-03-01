import Hero from '@/components/ui/Hero';
import CallToActionBanner from "@/components/ui/CTA";
import GameGrid from '@/components/vr/GameGrid';
import Title from '@/components/ui/Title';

export const metadata = {
  title: " Retro Experience | Pixoul Gaming",
};



export const retroGames = [
  // redemption games
    {experience_id: "air-hockey",
    title: "Air Hockey",
    slug: "air-hockey",
    category_name: "redemption",
    image_url: "/images/AIR-HOCKEY.png",
    genre: "sports",

    can_book: true,
    has_details: false,

    duration_minutes: 10,
    min_players: 2,
    max_players: 2,
    min_age: 6,
    price: 12,
  },

  {
    experience_id: "air-hockey-mini",
    title: "Air Hockey Mini",
    slug: "air-hockey-mini",
    category_name: "redemption",
    image_url: "/images/AIR-HOCKEY-MINI.png",
    genre: "sports",

    can_book: true,
    has_details: false,

    duration_minutes: 10,
    min_players: 2,
    max_players: 2,
    min_age: 6,
    price: 12,
  },

  {
    experience_id: "angry-bird-whacker",
    title: "Angry Bird Whacker",
    slug: "angry-bird-whacker",
    category_name: "redemption",
    image_url: "/images/ANGRY-BIRD-WHACKER.png",
    genre: "whack-a-mole",

    can_book: true,
    has_details: false,

    duration_minutes: 8,
    min_players: 1,
    max_players: 2,
    min_age: 6,
    price: 12,
  },

  {
    experience_id: "boxer-premium-led",
    title: "Boxer Premium LED",
    slug: "boxer-premium-led",
    category_name: "redemption",
    image_url: "/images/BOXER-PREMIUM-LED.png",
    genre: "strength",

    can_book: true,
    has_details: false,

    duration_minutes: 5,
    min_players: 1,
    max_players: 1,
    min_age: 10,
    price: 10,
  },

  {
    experience_id: "coco-bowl",
    title: "Coco Bowl",
    slug: "coco-bowl",
    category_name: "redemption",
    image_url: "/images/COCO-BOWL.png",
    genre: "bowling",

    can_book: true,
    has_details: false,

    duration_minutes: 10,
    min_players: 1,
    max_players: 4,
    min_age: 7,
    price: 14,
  },

  {
    experience_id: "crater-raiders",
    title: "Crater Raiders",
    slug: "crater-raiders",
    category_name: "redemption",
    image_url: "/images/CRATER-RAIDERS.png",
    genre: "action",

    can_book: true,
    has_details: false,

    duration_minutes: 10,
    min_players: 1,
    max_players: 2,
    min_age: 8,
    price: 12,
  },

  {
    experience_id: "power-roll",
    title: "Power Roll",
    slug: "power-roll",
    category_name: "redemption",
    image_url: "/images/POWER-ROLL.png",
    genre: "skill",

    can_book: true,
    has_details: false,

    duration_minutes: 8,
    min_players: 1,
    max_players: 2,
    min_age: 7,
    price: 18,
  },

  {
    experience_id: "robot-storm",
    title: "Robot Storm",
    slug: "robot-storm",
    category_name: "redemption",
    image_url: "/images/ROBOT-STORM.png",
    genre: "action",

    can_book: true,
    has_details: false,

    duration_minutes: 10,
    min_players: 1,
    max_players: 2,
    min_age: 8,
    price: 12,
  },

  {
    experience_id: "rock-and-ball",
    title: "Rock And Ball",
    slug: "rock-and-ball",
    category_name: "redemption",
    image_url: "/images/ROCK-AND-BALL.png",
    genre: "skill",

    can_book: true,
    has_details: false,

    duration_minutes: 8,
    min_players: 1,
    max_players: 2,
    min_age: 7,
    price: 10,
  },

  {
    experience_id: "rock-the-rim",
    title: "Rock The Rim",
    slug: "rock-the-rim",
    category_name: "redemption",
    image_url: "/images/ROCK-THE-RIM.png",
    genre: "basketball",

    can_book: true,
    has_details: false,

    duration_minutes: 8,
    min_players: 1,
    max_players: 2,
    min_age: 7,
    price: 10,
  },

  {
    experience_id: "skeeball-glow",
    title: "Skeeball Glow",
    slug: "skeeball-glow",
    category_name: "redemption",
    image_url: "/images/SKEEBALL-GLOW.png",
    genre: "classic",

    can_book: true,
    has_details: false,

    duration_minutes: 10,
    min_players: 1,
    max_players: 4,
    min_age: 6,
    price: 10,
  },

  {
    experience_id: "skill-cut-winner",
    title: "Skill Cut Winner",
    slug: "skill-cut-winner",
    category_name: "redemption",
    image_url: "/images/SKILL-CUT-WINNER.png",
    genre: "prize",

    can_book: true,
    has_details: false,

    duration_minutes: 10,
    min_players: 1,
    max_players: 1,
    min_age: 8,
    price: 30,
  },

  {
    experience_id: "snow-day",
    title: "Snow Day",
    slug: "snow-day",
    category_name: "redemption",
    image_url: "/images/SNOW-DAY.png",
    genre: "family",

    can_book: true,
    has_details: false,

    duration_minutes: 10,
    min_players: 1,
    max_players: 4,
    min_age: 6,
    price: 12,
  },

  {
    experience_id: "ticket-circus",
    title: "Ticket Circus",
    slug: "ticket-circus",
    category_name: "redemption",
    image_url: "/images/TICKET-CIRCUS.png",
    genre: "tickets",

    can_book: true,
    has_details: false,

    duration_minutes: 8,
    min_players: 1,
    max_players: 2,
    min_age: 6,
    price: 14,
  },

  {
    experience_id: "ticket-monster",
    title: "Ticket Monster",
    slug: "ticket-monster",
    category_name: "redemption",
    image_url: "/images/TICKET-MONSTER.png",
    genre: "tickets",

    can_book: true,
    has_details: false,

    duration_minutes: 8,
    min_players: 1,
    max_players: 2,
    min_age: 6,
    price: 14,
  },

  {
    experience_id: "shooting-mania",
    title: "Shooting Mania",
    slug: "shooting-mania",
    category_name: "redemption",
    image_url: "/images/SHOOTING-MANIA.png",
    genre: "shooting",

    can_book: true,
    has_details: false,

    duration_minutes: 10,
    min_players: 1,
    max_players: 2,
    min_age: 10,
    price: 15,
  },

  {
    experience_id: "fire-truck",
    title: "Fire Truck",
    slug: "fire-truck",
    category_name: "redemption",
    image_url: "/images/FIRE-TRUCK.png",
    genre: "kids",

    can_book: true,
    has_details: false,

    duration_minutes: 10,
    min_players: 1,
    max_players: 2,
    min_age: 5,
    price: 12,
  },

  {
    experience_id: "route-diner",
    title: "Route Diner",
    slug: "route-diner",
    category_name: "redemption",
    image_url: "/images/ROUTE-DINER.png",
    genre: "racing",

    can_book: true,
    has_details: false,

    duration_minutes: 10,
    min_players: 1,
    max_players: 2,
    min_age: 7,
    price: 12,
  },

  {
    experience_id: "kiddy-kruisin",
    title: "Kiddy Kruisin",
    slug: "kiddy-kruisin",
    category_name: "redemption",
    image_url: "/images/KIDDY-KRUISIN.png",
    genre: "kids",

    can_book: true,
    has_details: false,

    duration_minutes: 10,
    min_players: 1,
    max_players: 2,
    min_age: 4,
    price: 12,
  },

  {
    experience_id: "air-canades",
    title: "Air Canades",
    slug: "air-canades",
    category_name: "redemption",
    image_url: "/images/AIR-CANADES.png",
    genre: "shooting",

    can_book: true,
    has_details: false,

    duration_minutes: 10,
    min_players: 1,
    max_players: 2,
    min_age: 7,
    price: 12,
  },

  {
    experience_id: "airship-fishing",
    title: "AirShip Fishing",
    slug: "airship-fishing",
    category_name: "redemption",
    image_url: "/images/AIRSHIP-FISHING.png",
    genre: "fishing",

    can_book: true,
    has_details: false,

    duration_minutes: 10,
    min_players: 1,
    max_players: 2,
    min_age: 6,
    price: 12,
  },

  {
    experience_id: "storm-shot",
    title: "Storm Shot",
    slug: "storm-shot",
    category_name: "redemption",
    image_url: "/images/STORM-SHOT.png",
    genre: "shooting",

    can_book: true,
    has_details: false,

    duration_minutes: 10,
    min_players: 1,
    max_players: 2,
    min_age: 10,
    price: 15,
  },

  {
    experience_id: "lane-master",
    title: "Lane Master",
    slug: "lane-master",
    category_name: "redemption",
    image_url: "/images/LANE-MASTER.png",
    genre: "bowling",

    can_book: true,
    has_details: false,

    duration_minutes: 10,
    min_players: 1,
    max_players: 4,
    min_age: 6,
    price: 12,
  },


];

export default function RetroGamesPage(){
    

    return(
        <>
        <Hero
        imageSrc="/images/PG-0272.jpg"
        overlay={true}
        >
            <div className="flex flex-col items-center justify-center h-full text-center px-6">

        {/* Main headline */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white dark:text-white">
          LEGACY 
          <br />
          <span className="text-[#38C2D9]">PROTOCOL</span>
        </h1>

        {/* Supporting text */}
        <p className="text-white/80 max-w-2xl mb-10 text-base md:text-lg">
          Where it all began. Revisit the 8-bit classics and 16-bit legends that defined a generation of play.
        </p>
        </div>
        </Hero>


        <Title align="center">Our Redemption Games</Title>

        <GameGrid experiences={retroGames} />


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
