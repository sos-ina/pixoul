import GameMetaGrid from "@/components/game/GameMetaGrid";
import GameGlowSection from "@/components/game/GameGlowSection";
import GameSection from "@/components/game/GameSection";
import GameCTA from "@/components/game/GameCTA";
import Hero from "@/components/ui/Hero";
import GameImageStrip from "@/components/game/GameImageStrip";
import { experiences } from "../page";

export const metadata = {
  title: "Planked! | Pixoul Gaming",
};

export default function PlankedPage() {
  const experience = experiences.find((exp) => exp.experience_id === "planked");
  const meta = [
    { label: "Players", value: "1" },
    { label: "Genre", value: "VR Thriller" },
    { label: "Experience", value: "Balance / Rhythm" },
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
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">
            PLANKED!
          </h1>
          <p className="dark:text-gray-400 text-gray-700 max-w-2xl">
            A nerve-shredding VR challenge where balance, reflexes, and fear
            collide high above Hexa City.
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
          Planked! challenges players to traverse a narrow platform
          suspended atop Hexa City’s space elevator.
        </p>
        <p>
          Designed as an extreme sports attraction by The Elites, the arena
          pushes players to confront fear of heights while defending
          themselves from relentless drone attacks.
        </p>
      </GameGlowSection>

      {/* SKILLS */}
      <GameSection title="User Skills">
        <p>
          Strong physical balance and spatial awareness are essential.
        </p>
        <p>
          Players must walk carefully across narrow paths, jump over gaps,
          and react quickly to incoming drones while maintaining steady
          footing.
        </p>
      </GameSection>

      {/* FLOW */}
      <GameSection title="Game Flow">
        <p>
          The experience begins inside an elevator at ground level, which
          launches upward toward the stratosphere.
        </p>
        <p>
          Upon arrival, players step onto a narrow plank suspended high
          above the city and move toward a weapon pickup.
        </p>
        <p>
          Once armed, players must survive drone attacks, scoring points
          through precision and balance while avoiding a fatal fall.
        </p>
      </GameSection>

      {/* CTA */}
      <GameCTA experience={experience} />
    </>
  );
}
