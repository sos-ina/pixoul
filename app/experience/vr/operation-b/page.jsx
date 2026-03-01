import GameMetaGrid from "@/components/game/GameMetaGrid";
import GameGlowSection from "@/components/game/GameGlowSection";
import GameSection from "@/components/game/GameSection";
import GameCTA from "@/components/game/GameCTA";
import Hero from "@/components/ui/Hero";
import GameImageStrip from "@/components/game/GameImageStrip";
import { experiences } from "../page";

export const metadata = {
  title: "Operation B | Pixoul Gaming",
};

export default function OperationBPage() {
  const experience = experiences.find((exp) => exp.experience_id === "operation-b");
  const meta = [
    { label: "Players", value: "2" },
    { label: "Genre", value: "Action / Adventure" },
    { label: "Mode", value: "Co-op Shooter" },
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
            OPERATION B
          </h1>
          <p className="dark:text-white/70 text-black/70 max-w-2xl">
            A high-intensity cooperative assault through hostile airspace
            toward Hexa City.
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
          Operation B places players inside a combat helicopter navigating
          hostile airspace on the approach to Hexa City.
        </p>
        <p>
          Constant enemy pressure and environmental threats demand flawless
          coordination as both players fight to keep the helicopter airborne.
        </p>
      </GameGlowSection>

      {/* SKILLS */}
      <GameSection title="User Skills">
        <p>
          Strong teamwork and communication are essential for success.
        </p>
        <p>
          Players must coordinate movement, aim accurately under pressure,
          and respond quickly to incoming threats while maintaining flight
          stability.
        </p>
      </GameSection>

      {/* FLOW */}
      <GameSection title="Game Flow">
        <p>
          The mission begins with two players onboard a helicopter en route
          to Hexa City.
        </p>
        <p>
          As the aircraft advances, players manoeuvre left and right to
          avoid threats while engaging waves of enemies mid-flight.
        </p>
        <p>
          The experience concludes once the team reaches the landing point
          without the helicopter being destroyed.
        </p>
      </GameSection>

      {/* CTA */}
      <GameCTA experience={experience} />
    </>
  );
}
