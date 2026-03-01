import GameMetaGrid from "@/components/game/GameMetaGrid";
import GameGlowSection from "@/components/game/GameGlowSection";
import GameSection from "@/components/game/GameSection";
import GameCTA from "@/components/game/GameCTA";
import Hero from "@/components/ui/Hero";
import GameImageStrip from "@/components/game/GameImageStrip";
import { experiences } from "../page";

export const metadata = {
  title: "Mach 6 Racer | Pixoul Gaming",
};

export default function Mach6RacerPage() {
    const experience = experiences.find((exp) => exp.experience_id === "mach-6-racer");
  
  const meta = [
    { label: "Players", value: "1" },
    { label: "Genre", value: "Racing" },
    { label: "Experience", value: "Lap-Based Racing" },
    { label: "Intensity", value: "High" },
  ];

  const images = [
    "https://placehold.net/default.png",
    "https://placehold.net/default.png",
  ];

  return (
    <>
      {/* HERO */}
      <Hero
        videoSrc="/videos/GameVid.mp4"
        overlay={true}
      />

      {/* TITLE */}
      <section className="py-12 md:py-16 bg-white dark:bg-[#0a0a0a] text-black dark:text-white">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">
            MACH 6 RACER
          </h1>
          <p className="dark:text-white/70 text-black/70 max-w-2xl">
            A high-speed VR racing spectacle where only the fastest survive
            the track.
          </p>
        </div>
      </section>

      {/* META */}
      <GameMetaGrid meta={meta} />

      {/* IMAGES */}
      <GameImageStrip images={images} />

      {/* GLOW */}
      <GameGlowSection>
        <p>
          Mach 6 Racer places players behind the wheel in a high-profile
          racing event set within the capital city of Pixoul Planet.
        </p>
        <p>
          Watched by the planet’s Elites and streamed across the
          interplanetary network, the race demands flawless execution at
          extreme speeds.
        </p>
      </GameGlowSection>

      {/* SKILLS */}
      <GameSection title="User Skills">
        <p>
          Fast reflexes and precise control are essential to success.
        </p>
        <p>
          Players must anticipate opponents, navigate corners at high
          speed, and make split-second decisions to secure first place.
        </p>
      </GameSection>

      {/* FLOW */}
      <GameSection title="Game Flow">
        <p>
          The experience begins with a ceremonial introduction as players
          are placed into their racing karts.
        </p>
        <p>
          Once the start signal is given, the race begins, launching players
          into a lap-based competition across the city’s elite tracks.
        </p>
        <p>
          Victory is achieved by outpacing opponents and crossing the
          finish line first.
        </p>
      </GameSection>

      {/* CTA */}
      <GameCTA experience={experience} />
    </>
  );
}
