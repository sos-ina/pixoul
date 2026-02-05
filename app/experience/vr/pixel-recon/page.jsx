import GameMetaGrid from "@/components/game/GameMetaGrid";
import GameGlowSection from "@/components/game/GameGlowSection";
import GameSection from "@/components/game/GameSection";
import GameCTA from "@/components/game/GameCTA";
import Hero from "@/components/ui/Hero";
import GameImageStrip from "@/components/game/GameImageStrip";

export const metadata = {
  title: "Pixel Recon | Pixoul Gaming",
};

export default function PixelReconPage() {
  const meta = [
    { label: "Players", value: "4" },
    { label: "Genre", value: "Strategy" },
    { label: "Experience", value: "Escape Room" },
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
      <section className="py-15">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">
            PIXEL RECON
          </h1>
          <p className="text-gray-400 max-w-2xl">
            A high-stakes cooperative escape where logic, timing, and
            teamwork decide the fate of Pixoul Planet.
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
          Pixel Recon challenges players to confront the last and most
          powerful Elite, a being no longer human but fused with machines
          into an artificial subconscious.
        </p>
        <p>
          Through a series of interconnected systems and mechanisms,
          players must restore control by solving complex puzzles under
          intense time pressure.
        </p>
      </GameGlowSection>

      {/* SKILLS */}
      <GameSection title="User Skills">
        <p>
          Communication and coordination are critical to success.
        </p>
        <p>
          Players must analyze clues, synchronize actions, and execute
          precise sequences while adapting to evolving puzzle mechanics.
        </p>
      </GameSection>

      {/* FLOW */}
      <GameSection title="Game Flow">
        <p>
          The experience begins with four players awakening inside
          cryogenic capsules before entering the main workstation
          platform.
        </p>
        <p>
          A malfunctioning elevator forces players to locate manual
          overrides, solve switch combinations, and unlock security
          systems.
        </p>
        <p>
          Pressure pads, timed levers, and laser-routing mechanisms demand
          careful coordination and correct sequencing.
        </p>
        <p>
          Once the laser system is fully aligned, the elevator resumes its
          ascent and the main gate opens, allowing the team to escape.
        </p>
      </GameSection>

      {/* CTA */}
      <GameCTA experienceId="pixel-recon" />
    </>
  );
}
