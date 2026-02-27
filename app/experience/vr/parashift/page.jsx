import GameMetaGrid from "@/components/game/GameMetaGrid";
import GameGlowSection from "@/components/game/GameGlowSection";
import GameSection from "@/components/game/GameSection";
import GameCTA from "@/components/game/GameCTA";
import Hero from "@/components/ui/Hero";
import GameImageStrip from "@/components/game/GameImageStrip";
import { experiences } from "../page";

export const metadata = {
  title: "Parashift | Pixoul Gaming",
};

export default function ParashiftPage() {
  const experience = experiences.find((exp) => exp.experience_id === "parashift");
  const meta = [
    { label: "Players", value: "1" },
    { label: "Genre", value: "Action / Adventure" },
    { label: "Experience", value: "Parachute Adventure" },
    { label: "Intensity", value: "Medium–High" },
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
            PARASHIFT
          </h1>
          <p className="dark:text-gray-400 text-gray-700 max-w-2xl">
            A high-speed descent through the skies of Hexa City, where
            precision is the only way down.
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
          Parashift sends players soaring above Hexa City in a controlled
          freefall unlike any other.
        </p>
        <p>
          As lasers and environmental hazards cut through the sky, players
          must steer carefully and maintain focus during a rapid descent
          toward the city below.
        </p>
      </GameGlowSection>

      {/* SKILLS */}
      <GameSection title="User Skills">
        <p>
          This experience focuses on spatial awareness and precise control.
        </p>
        <p>
          Players must react quickly, steer accurately, and maintain balance
          while navigating hazards at high speed.
        </p>
      </GameSection>

      {/* FLOW */}
      <GameSection title="Game Flow">
        <p>
          The player begins strapped inside a parachute launcher aboard a
          helicopter.
        </p>
        <p>
          The ground opens beneath them, launching the player into a rapid
          descent toward Hexa City.
        </p>
        <p>
          The experience concludes once the player lands safely within the
          designated landing zone.
        </p>
      </GameSection>

      {/* CTA */}
      <GameCTA experience={experience} />
    </>
  );
}
