import GameMetaGrid from "@/components/game/GameMetaGrid";
import GameGlowSection from "@/components/game/GameGlowSection";
import GameSection from "@/components/game/GameSection";
import GameCTA from "@/components/game/GameCTA";
import Hero from "@/components/ui/Hero";
import GameImageStrip from "@/components/game/GameImageStrip";


export const metadata = {
  title: "Hexa Looper | Pixoul Gaming",
};

export default function HexaLooperPage() {
  const meta = [
    { label: "Players", value: "1" },
    { label: "Genre", value: "Thriller / Adventure" },
    { label: "Experience", value: "VR City Tour" },
    { label: "Intensity", value: "Medium" },
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
            HEXA LOOPER
          </h1>
          <p className="text-gray-400 max-w-2xl">
            A high-speed VR tour through Hexa City, revealing its scale,
            beauty, and danger from every angle.
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
          Hexa Looper offers a thrilling guided tour through the vast
          expanse of Hexa City aboard a futuristic rollercoaster.
        </p>
        <p>
          Designed by The Elites for their own entertainment, the looper
          was later opened to tourists seeking a high-speed journey through
          the city’s most iconic districts.
        </p>
      </GameGlowSection>

      {/* SKILLS */}
      <GameSection title="User Skills">
        <p>
          This experience requires no combat or complex interaction.
        </p>
        <p>
          Players should be comfortable with rapid motion, sudden drops,
          and changes in orientation as the ride loops and flips through
          the city.
        </p>
      </GameSection>

      {/* FLOW */}
      <GameSection title="Game Flow">
        <p>
          The player begins seated inside a futuristic rollercoaster cart,
          with the track visible ahead.
        </p>
        <p>
          The ride slowly ascends before accelerating into a series of
          dives, loops, and flips that carry the player across Hexa City.
        </p>
        <p>
          Along the way, players pass through iconic buildings and
          landmarks, experiencing the city from above, below, and within.
        </p>
        <p>
          The experience ends as the looper returns to its final station,
          completing the tour.
        </p>
      </GameSection>

      {/* CTA */}
      <GameCTA experienceId="hexa-looper" />
    </>
  );
}
