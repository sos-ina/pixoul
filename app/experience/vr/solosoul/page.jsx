import GameMetaGrid from "@/components/game/GameMetaGrid";
import GameGlowSection from "@/components/game/GameGlowSection";
import GameSection from "@/components/game/GameSection";
import GameCTA from "@/components/game/GameCTA";
import Hero from "@/components/ui/Hero";
import GameImageStrip from "@/components/game/GameImageStrip";
import { experiences } from "../page";

export const metadata = {
  title: "Solosoul | Pixoul Gaming",
};

export default function SolosoulPage() {
  const experience = experiences.find((exp) => exp.experience_id === "solosoul");
  const meta = [
    { label: "Players", value: "1" },
    { label: "Genre", value: "Action / Adventure" },
    { label: "Experience", value: "Racing / Combat" },
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
            SOLOSOUL
          </h1>
          <p className="dark:text-white/70 text-black/70 max-w-2xl">
            A high-speed escape through Hexa City where motion, combat,
            and story collide.
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
          Solosoul places players on a heavily armed combat bike racing
          through the hostile streets of Hexa City.
        </p>
        <p>
          As Dr. Sottsass flees an Elite assault, players must navigate
          highways at extreme speed, avoid obstacles, and engage enemies
          using advanced technology — all through natural body movement.
        </p>
      </GameGlowSection>

      {/* SKILLS */}
      <GameSection title="User Skills">
        <p>
          This experience relies on smooth physical control and spatial
          awareness.
        </p>
        <p>
          Players steer the bike by shifting their body weight, manoeuvring
          fluidly through traffic, hazards, and enemy fire while
          maintaining balance at high speed.
        </p>
      </GameSection>

      {/* FLOW */}
      <GameSection title="Game Flow">
        <p>
          The experience begins with Dr. Sottsass seated on his bike
          outside his villa as Elite forces launch an attack.
        </p>
        <p>
          From a first-person perspective, players see the bike’s dashboard,
          navigation routes, and weapon systems while racing through the
          city.
        </p>
        <p>
          Players use the Energy Blaster to clear ground obstacles and
          DittoMissiles to lock onto and eliminate airborne enemies.
        </p>
        <p>
          The mission continues until players escape Hexa City via the
          outer highways, securing Dr. Sottsass’ survival.
        </p>
      </GameSection>

      {/* CTA */}
      <GameCTA experience={experience} />
    </>
  );
}
