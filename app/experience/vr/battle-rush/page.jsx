import GameMetaGrid from "@/components/game/GameMetaGrid";
import GameGlowSection from "@/components/game/GameGlowSection";
import GameSection from "@/components/game/GameSection";
import GameCTA from "@/components/game/GameCTA";
import Hero from "@/components/ui/Hero";
import GameImageStrip from "@/components/game/GameImageStrip";

export const metadata = {
  title: "Battle Rush | Pixoul Gaming",
};

export default function BattleRushPage() {
  const meta = [
    { label: "Players", value: "4" },
    { label: "Genre", value: "Action / Adventure" },
    { label: "Experience", value: "Racing / Shooting" },
    { label: "Intensity", value: "Very High" },
  ];

  const images = [
    "/images/PG-0116.jpg",
    "/images/PG-0063.jpg",
  ];

  return (
    <>
      {/* HERO */}
      <Hero
        videoSrc="/videos/GameVid.mp4"
        overlay={true}
      />

      {/* TITLE */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">
            BATTLE RUSH
          </h1>
          <p className="text-gray-400 max-w-2xl">
            A high-speed cooperative assault where four heroes race
            against time to save their city.
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
          Battle Rush throws players into a desperate mission to stop The
          Elites from destroying the old city using a demolition train.
        </p>
        <p>
          Inside an armored vehicle, four players must navigate hostile
          terrain, fend off enemy attacks, and push forward under constant
          pressure to reach the train in time.
        </p>
      </GameGlowSection>

      {/* SKILLS */}
      <GameSection title="User Skills">
        <p>
          Strong teamwork and communication are essential for success.
        </p>
        <p>
          Players must coordinate movement, assign combat roles, and plan
          defensive strategies while maintaining speed through dangerous
          environments.
        </p>
      </GameSection>

      {/* FLOW */}
      <GameSection title="Game Flow">
        <p>
          The experience begins with Lebro, Cezero, Oxima, and Coglox inside
          an armored vehicle responding to the demolition threat.
        </p>
        <p>
          Players race through city landmarks and hostile zones while
          enemy trucks and units attempt to stop their advance.
        </p>
        <p>
          The journey spans cliffs, tunnels, bridges, and open terrain,
          demanding constant coordination and tactical decisions.
        </p>
        <p>
          The mission concludes when the team reaches the train and shuts
          it down before the city is destroyed.
        </p>
      </GameSection>

      {/* CTA */}
      <GameCTA experienceId="battle-rush" />
    </>
  );
}
