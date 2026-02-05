import GameMetaGrid from "@/components/game/GameMetaGrid";
import GameGlowSection from "@/components/game/GameGlowSection";
import GameSection from "@/components/game/GameSection";
import GameCTA from "@/components/game/GameCTA";
import Hero from "@/components/ui/Hero";
import GameImageStrip from "@/components/game/GameImageStrip";

export const metadata = {
  title: "Cryo Capsule | Pixoul Gaming",
};

export default function CryoCapsulePage() {
  const meta = [
    { label: "Players", value: "1" },
    { label: "Genre", value: "Adventure" },
    { label: "Experience", value: "First-Person Narrative" },
    { label: "Intensity", value: "Low" },
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
            CRYO CAPSULE
          </h1>
          <p className="text-gray-400 max-w-2xl">
            A cinematic journey through the birth, rise, and betrayal of
            Pixoul Planet.
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
          Cryo Capsule is a first-person cinematic experience that takes
          players across decades of history, from the genesis of Pixoul
          Planet to the awakening of the Alpha Ventauri team.
        </p>
        <p>
          Inside an immersive cryogenic chamber enhanced with special
          effects, players relive fragmented memories of ambition,
          discovery, and collapse.
        </p>
      </GameGlowSection>

      {/* SKILLS */}
      <GameSection title="User Skills">
        <p>
          This experience requires no combat or fast reactions.
        </p>
        <p>
          Players are encouraged to observe, immerse themselves in the
          environment, and follow the narrative as it unfolds through
          cinematic storytelling.
        </p>
      </GameSection>

      {/* FLOW */}
      <GameSection title="Game Flow">
        <p>
          The player awakens inside a sealed cryogenic capsule, caught
          between consciousness and memory.
        </p>
        <p>
          Flashbacks reveal the founding of Alpha Ventauri, the creation
          of revolutionary technologies, and humanity’s rise on Pixoul
          Planet.
        </p>
        <p>
          The truth behind The Elite’s deception emerges, exposing the
          downfall of Alpha Ventauri’s dream.
        </p>
        <p>
          The experience ends as the capsule unlocks and the player
          awakens fully, carrying the weight of what was lost.
        </p>
      </GameSection>

      {/* CTA */}
      <GameCTA experienceId="cryo-capsule" />
    </>
  );
}
