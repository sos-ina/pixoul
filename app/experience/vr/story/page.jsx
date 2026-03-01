

import StorySection from "@/components/story/StorySection";
import TechnologyBlock from "@/components/story/TechnologyBlock";
import CharactersGrid from "@/components/story/CharactersGrid";
import Hero from "@/components/ui/Hero";
import Link from "next/link";

export default function VRStoryPage() {
  const characters = [
    {
      name: "Lebro",
      image: "/images/LIBRO.png",
      description:
        "Army veteran and astronomer, he was the youngest member of the crew that launched the first probes to reach planet Proxima B, the most suitable planet for human colonization, but was extremely far from earth, 1,200 light years away. Lebro, however, took the lead and assembled an elite unit of 4 heros to find a way to reach Proxima B and Construct Pixouol Planet.",
    },
    {
        name: "Oxima",
        image: "/images/OXIMA.png",
        description:
          "As a biomedical engineer and psychologist, after losing all of her family members during World War 4, she drowned herself in work until she met Lebro, who offered her hope for the future. To colonize space and build a civilization on Proxima B, called Pixoul Planet, she worked with Cezero to develop what would later be known as Pixoul Energy.",
    },
    {
        name: "Uoglox",
        image: "/images/UOGLOX.png",
        description:"Having been friends with Lebro for many years, he was the first person to stand behind him when the decision was made to colonize space and establish Pixoul planet. The trip and Pixoul research were funded by him using all his fortune.",

    },
    {
        name: "Sezero",
        image: "/images/SEZERO.png",
        description:"An absolute genius in robotics and programming, the youngest member of the founders of pixoul planet, his purpose and drive are not as clear as the other founders, as it seems he’s just into this whole trip for the thrill of it! But the amount of work he’s put in shows a clear dedication to the vision of Pixoul Planet.",
    },
    {
        name: "Gularo",
        image: "/images/Gulard.png",  
        description:"The Greediest of the Elites, the one responsible for the industrialization and destruction of legacy city, and the prodigy of Sezero",      
    },
    {
        name: "Fallacia",
        image: "/images/FALLACIA.png",
        description:"The Captain of the Elite’s massive warship! And the prodigy of Oxima.",
    },
    {
        name: "Avaruz",
        image: "/images/AVARUZ.png",
        description:"The master of the underground sector of Hexa city, who traded his soul and pixoul for bio tech, turning him into an unforgiving dictator, and the prodigy of Uoglox.",
    },
    {
        name: "Malos",
        image: "/images/MALOS.png",
        description:"It is believed that Malos was once a bright student of the founders, but greed for power and fear of losing control corrupted him over time, causing him to abuse the Pixoul energy in order to extend his life and take over Pixoul planet with the help of the Elite organization.",
    },
  ];

  return (

    <>
    <Hero 
          videoSrc="/videos/Pixoul_Metaverse_Trailer.mp4" 
          overlay={true}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
         The Pixoul Megaverse</h1>
          </Hero>
   

      {/* SYNOPSIS */}
      <StorySection title="Synopsis">
        <p>
          The year 2555 has seen Earth endure endless cycles of peace, war,
          prosperity, and anguish.
        </p>
        <p>
          Four heroes emerged in response to the imminent end of the planet,
          creating Pixoul Energy — a technology capable of converting the
          human soul into pure power.
        </p>
        <p>
          This discovery allowed humanity to colonize Pixoul Planet, but
          overuse corrupted its people, draining their souls and placing the
          fate of the world in your hands.
        </p>
      </StorySection>

      <div className="py-12 flex items-center justify-center text-center">
        <img src="/images/story.jpeg" alt="Pixoul story mode" className="w-200 rounded-none shadow-lg" />
      </div>

      {/* TECHNOLOGY */}
      <StorySection title="Technology">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <TechnologyBlock title="Pixoul Energy">
            <p>
              Developed by Oxima and Cezero, Pixoul Energy converts the human
              soul into a powerful energy source using specialized suits.
            </p>
          </TechnologyBlock>

          <TechnologyBlock title="Exosuits">
            <p>
              These suits transform life force into energy, extending human
              lifespan while powering advanced machinery.
            </p>
          </TechnologyBlock>

          <TechnologyBlock title="Plasma Guns">
            <p>
              Originally invented for mining, plasma guns were later adapted
              for combat and construction on Pixoul Planet.
            </p>
          </TechnologyBlock>

          <TechnologyBlock title="Phasers">
            <p>
              High-energy photon weapons used by the Pixoul army, capable of
              stunning or vaporizing targets.
            </p>
          </TechnologyBlock>

          <TechnologyBlock title="Renewable Energy">
            <p>
              Fusion reactors and wireless energy satellites provide limitless
              clean energy across Pixoul Planet.
            </p>
          </TechnologyBlock>

        </div>
      </StorySection>

      {/* CHARACTERS */}
      <CharactersGrid characters={characters} />
      <p className="justify-center text-[#38C2D9] hover:underline font-semibold px-10"><Link href="/experience/vr">← Back to VR Experience Page</Link></p>
    </>
  );
}
