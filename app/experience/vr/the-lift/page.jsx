import GameMetaGrid from "@/components/game/GameMetaGrid";
import GameGlowSection from "@/components/game/GameGlowSection";
import GameSection from "@/components/game/GameSection";
import GameCTA from "@/components/game/GameCTA";
import Hero from "@/components/ui/Hero";
import GameImageStrip from "@/components/game/GameImageStrip";

export const metadata = {
  title: "The Lift | Pixoul Gaming",
};

export default function TheLiftPage() {
  const meta = [
    { label: "Players", value: "4" },
    { label: "Genre", value: "Action / Thriller" },
    { label: "Mode", value: "Arcade Mutant Shooting" },
    { label: "Intensity", value: "High" },
  ];

   const images = [
    "https://placehold.net/default.png",
    "https://placehold.net/default.png",
  ];

  return (
    <>
    <Hero 
    imageSrc="/images/THE-LIFT.png" 
    overlay={true}>
    </Hero>

    
      {/* TITLE */}
      <section className="py-15">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">
            THE LIFT
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Survive a vertical nightmare as you fight your way through a
            malfunctioning elevator filled with hostile mutants.
          </p>
        </div>
      </section>



      {/* META */}
      <GameMetaGrid meta={meta} />
      {/* Images */}
      <GameImageStrip images={images} />

      {/* GLOW */}
      <GameGlowSection>
        <p>
          This experience takes place inside a malfunctioning elevator
          buried deep within a sealed vault.
        </p>
        <p>
          As the elevator ascends toward the surface, players must battle
          waves of mutated minions attacking through doors, windows, and
          broken levels.
        </p>
      </GameGlowSection>

      {/* SKILLS */}
      <GameSection title="User Skills">
        <p>
          Players must use tactical awareness to aim, shoot, and reload
          their weapons in VR.
        </p>
        <p>
          Strategic positioning and teamwork are essential to survive the
          incoming waves.
        </p>
      </GameSection>

      {/* FLOW */}
      <GameSection title="Game Flow">
        <p>
          The team enters a quarantined factory zone to shut it down from
          within.
        </p>
        <p>
          The elevator ascends toward floor 54 before malfunctioning and
          crashing down to floor 8, where the first wave begins.
        </p>
        <p>
          After multiple floor drops and enemy encounters, players reach
          the rooftop for a final boss battle and escape by helicopter.
        </p>
      </GameSection>

      {/* CTA */}
      <GameCTA experienceId="the-lift" />
    </>
  );
}
