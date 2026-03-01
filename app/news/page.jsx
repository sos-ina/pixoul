import { NewsCard } from "@/components/ui/NewsCard";

// app/news/page.jsx
export const metadata = {
  title: "News Updates | Pixoul Gaming",
  description:
    "Latest news and updates from Pixoul Gaming — events, announcements, and press releases.",
};

function formatDate(dateStr) {
  // dateStr like "25 Oct 2022"
  return dateStr;
}



export default function NewsPage() {
  // Later: replace this with API data (admin can add news items)
  const news = [
    {
      id: "2022-10-25-opening",
      date: "25 Oct 2022",
      title: "PIXOUL GAMING IS SET TO OPEN IN AL QANA ON FRIDAY, NOV 4",
      subTitle:
        "Free public admission to the “Pixoul Community Cup” Esports Tournament at the Pixoul Event Hall on the opening weekend",
      paragraphs: [
        "Abu Dhabi, UAE – 25 October 2022: Pixoul Gaming, Abu Dhabi’s most anticipated VR and Esports gaming destination, will open at 7 pm on Friday, 4th of November at Al Qana, Abu Dhabi’s unique tourist and lifestyle waterfront destination. The opening weekend will hold the first multi-award Esports Tournament “Pixoul Community Cup” in Abu Dhabi city at Pixoul Event Hall.",
        "A gaming destination like no other, the magical, immersive entertainment destination is appealing to professional and amateur gamers alike. Located within the Rabdan Area, Pixoul Gaming is one of 7 anchors found within Al Qana, an integrated entertainment destination suitable for all ages and abilities. This destination serves as an ideal venue for gaming enthusiasts of all ages, whether a gaming enthusiast wanting to connect with the gaming community, a parent wanting to enjoy an interactive VR experience with their children, or a group of friends looking to unleash their competitive side at the latest tournament.",
        "Visitors can experience the entire gaming ecosystem at Pixoul Gaming, through the five zones: VR, retro, console, mobile, and Esports games. One of the main attractions is the VR Pavilion, which houses 10 different heart-pumping virtual reality games, including everything from shooters, virtual roller coasters, and parachuting, to guided spaceship tours of the new intergalactic planet. Prices start at AED 35 per VR game. For a full day out, users can choose the Story Mode, including all 10 VR experiences for AED 250.",
        "Pixoul Gaming also boasts one of the largest gaming arenas in the region, the Pixoul Event Hall, which has a capacity of 800 people and is host to the Pixoul Community Cup, a 4-game Esports tournament. Visitors will see a stimulating event of professional Esports players battling it out in popular console and PC games including Valorant, Fortnight, E-Football, and Super Smash Bros. When the gaming showdown is taking place, the event will be broadcast on a 78m2 LED screen and advanced sound and lighting systems. The free-entry event will take place on 5th and 6th November at the Pixoul Event Hall, where visitors are welcome to cheer for their favourite gamers.",
        "The Pixoul Event Hall will serve as an enticing attraction for regional and international sponsors, positioning Abu Dhabi as a regional hub for Esports, and will offer exclusive viewing facilities, such as a VIP Lounge. The first Esports event is part of Pixoul Gaming’s upcoming calendar of events to foster an elite community, bringing serious gaming to the Middle East.",
        "For eager gamers, Pixoul Gaming also includes the first-ever Esports Academy where gamers will receive personal training from international gaming champions inclusive of VIP and Masterclasses. Enthusiasts will get the chance to learn winning secrets from the world’s top gamers at the Academy, preparing them to compete on a global level.",
        "Pixoul Gaming will open its doors for the 1st time at 7 pm on Friday, November 4, 2022. The complex will open all week long from 10am – 10pm.",
      ],
      schedule: [
        {
          date: "Saturday, November 5, 2022",
          time: "11:00 AM – 6:50 PM",
          event: "e-Football",
        },
        { date: "Saturday, November 5, 2022", time: "12:00 PM – 4:20 PM", event: "Fortnite" },
        { date: "Saturday, November 5, 2022", time: "1:00 PM – 4:40 PM", event: "Valorant" },
        { date: "Saturday, November 5, 2022", time: "7:00 PM – 11:00 PM", event: "Cosplay Show" },
        { date: "Sunday, November 6, 2022", time: "12:50 PM – 6:00 PM", event: "e-Football" },
        { date: "Sunday, November 6, 2022", time: "2:00 PM – 9:45 PM", event: "Valorant" },
        { date: "Sunday, November 6, 2022", time: "4:00 PM – 9:40 PM", event: "SSBU" },
        { date: "Sunday, November 6, 2022", time: "6:00 PM – 7:00 PM", event: "Fortnite" },
        { date: "Sunday, November 6, 2022", time: "10:00 PM – 10:30 PM", event: "Prize Distribution" },
      ],
      quote: {
        by: "Manish Bakshi, Managing Director of BenQ ME and Turkey",
        text:
          "We are thrilled to partner with PIXOUL Esports Academy, a leading name in the esports industry. Our collaboration will give gamers around the world access to our latest and most advanced gaming technologies, allowing them to achieve their full potential on the competitive stage. We believe that Zowie & PIXOUL partnership is an exciting development for the esports community, and we look forward to working with PIXOUL Esports Academy to help more gamers unlock their full potential and achieve success in the world of esports.",
      },
    },

    {
      id: "2022-08-29-announcement",
      date: "29 Aug 2022",
      title:
        "PIXOUL GAMING, THE MIDDLE EAST’S FIRST INTEGRATED IMMERSIVE ENTERTAINMENT DESTINATION, TO OPEN IN ABU DHABI",
      subTitle:
        "Pixoul Gaming will include 5 key zones, launch the region’s first Esports Academy, and is primed to open by Q4 2022.",
      paragraphs: [
        "UAE, Abu Dhabi; 29 August 2022: Putting Abu Dhabi straight on the international Esports map, Pixoul Gaming, the state-of-the-art virtual reality (VR) and Esports hub, will open later this year at Al Qana, Abu Dhabi’s most exciting waterfront destination.",
        "Appealing to professional and amateur gamers alike, Pixoul Gaming is an integrated, immersive entertainment destination through its elaborate Virtual Reality Gaming Zone. While the Esports Academy provides a focused training facility for serious gaming athletes. Empowering the future Esports champions of the world, Pixoul Gaming will foster an elite community, launching the first ever Esports Academy in the Middle East and will host global gaming tournaments in its 800-seat capacity arena to become a beacon for mega competitions. The Academy also includes an Esports bar, a gaming community twist on a typical sports bar, where global gaming events can be viewed while enjoying F&B.",
        "With its array of VR, retro, console, mobile, and Esports games, Pixoul Gaming will not only have the best facilities in the region but will also cater to the entire gaming ecosystem – from game development and education to thrilling immersive experiences, from professional solo, multi-player and team gaming to hosting global gaming festivals. Esports is one of the fastest-growing industries in the MENA region. The UAE’s digital gaming sector is estimated to reach US$930 million by 2025, and Pixoul Gaming will highlight Abu Dhabi as the global leader in Esports, broadcasting to millions of fans.",
        "Pixoul Gaming will be at the forefront of this digital entertainment revolution by producing a destination that makes gaming accessible and appealing to all. So, whether a FIFA fan is looking to connect with fellow gamers, a family looking to enjoy an interactive VR experience, or a group of friends looking to win big at the latest tournament, Pixoul Gaming is the ideal integrated entertainment venue for all ages and abilities.",
        "Commenting, Paul Hamilton, General Manager at Pixoul Gaming, said, “As an integrated, immersive entertainment destination with the region’s first Esports Academy, Pixoul Gaming has the potential to redefine the modern gaming experience. We believe that everyone should be a gamer today as Esports fosters creativity, encourages problem-solving, and builds leadership skills. So, we designed Pixoul Gaming to offer a new world of digital amusement and showcase Abu Dhabi as a global leader in Esports and digital entertainment.”",
        "“The goal is to bring serious gaming into the Middle East, to train professionals at our Academy to compete on a global level while also hosting the international tournaments in our elite coliseum of gaming where the biggest, best gamers on the planet will perform to a live audience of 800+, watched by millions across the world. The venue is almost complete, and we’ll be ready to welcome gamers by Q4 of 2022. We are working with the leading international experts and technology partners such as Robocom VR to offer our guests the latest and the best experience,” continued Hamilton.",
        "Karim Ibrahim, Co-founder of Pixoul Gaming and CEO of Robocom VR, commented, “As technology partners and creators of this custom-built VR mission, we are excited to take gamers on an unprecedented adventure across cinematic and interactive experiences. At Robocom VR, our mission is to innovate the static gaming experience, inviting users to a portal into new dimensions of gaming and take control over their destiny while fully immersed in Virtual Reality Entertainment.”",
        "“At Pixoul Gaming, we have introduced the region’s first fully wireless headsets in an open world cross-platform metaverse. With no unnecessary cables or heavy backpacks, the HTC Focus 3 headsets are fully synced with 4D and motion platform simulators to blur virtual reality’s boundaries ultimately. Across these ten integrated experiences, each lasting 6-10 minutes, there is a never seen before the journey of flight & racing simulators, escape rooms, shooting games, paragliding, and rollercoasters – promising to push the boundaries of human imagination and set new standards of interactive and immersive entertainment.”",
        "Virtual Reality Gaming – Pixoul Planet: As the flagship experience, the Pixoul Planet VR houses 10 different virtual and augmented reality games, including everything from shooters, and virtual roller coasters, to guided spaceship tours of the new intergalactic planet, Pixoul. Available in both story and arcade mode, the multi-sensory game is built on preserving the future city, Pixoul Planet, which is under attack and calls for help from visitors.",
        "Esports Academy: The Academy will have special classrooms where local and international coaches can train individuals and teams. In addition, Pixoul Gaming will invite international gaming champions to give lucky users one-on-one training and teach them their winning secrets. With safe learning and responsibility in mind, The Dean of the Academy will oversee the teaching schedule and certifications and ensure that consumers are empowered with the tools and knowledge to play responsibly.",
        "Console and Retro Gaming: The Retro Gaming Zone is a nostalgia-themed area packed with arcade machines featuring classic and old-school gaming such as Pac-Man and Space Invaders. The Esports Bar will show the most prominent global events of the year, serving food and beverage as a go-to hang-out place for teenagers and gaming fans.",
        "Gaming Streaming & Broadcasting Studios: Pixoul Gaming will feature facilities with high-spec equipment for producing on-site amateur and professional content.",
        "Esports Event Hall: Pixoul Gaming will feature one of the largest gaming arenas in the region for international-level competitions, equipped with a 78m2 LED screen and supporting sound and lighting system, including a VIP Lounge.",
      ],
    },

    {
      id: "2020-09-30-alqana",
      date: "30 Sep 2020",
      title: "Al Qana to open the largest VR & esports HUB in Abu Dhabi",
      subTitle:
        "Al Qana revealed plans to open the first ever eSports academy and VR Gaming Complex in the UAE (PIXEL).",
      paragraphs: [
        "Abu Dhabi, UAE – 30 September 2020: Al Qana, Abu Dhabi’s most exciting waterfront destination, today revealed its plan to open the first ever eSports academy and VR Gaming Complex in the UAE. PIXEL, Al Qana’s Gaming Hub is set to be the latest evolution of Location-Based Entertainment (LBE) and will cater to families, gamers and technology enthusiasts.",
        "Under the terms of the Memorandum of Understanding (MoU), Robocom VR will be the sole provider of the content and technology for ‘PIXEL’ Gaming Hub while Al Barakah International Investment is the key developer of the project. The concept introduces a world-class eSports hub combined with Virtual Reality in one single gaming complex.",
        "‘PIXEL’ will include the first ever certified eSports academy in the region with the mission of highlighting the importance of playing responsibly. The hub will also feature an events space to host tournaments as well as an arcade area that will be run by gamers for gamers.",
        "Commenting on the MoU signing, Fouad Mashal, CEO of Al Barakah International Investment, said: “In line with our vision to bring world-class experience to Al Qana, our partnership with Robocom VR will position PIXEL as one of the most sought-after VR and eSports destinations in the UAE.”",
        "Karim Ibrahim, CEO of Robocom VR, said: “There’s a constant demand for new and diverse location-based entertainment centres that fit the global standards across the Middle East. With ‘PIXEL,’ gamers will have a chance to fully immerse themselves into new dimensions of gaming. We will provide an opportunity for gamers to grow and develop their professional talent to compete in international competitions and tournaments.”",
        "The revenues of the whole gaming industry are estimated to be larger than those of worldwide box offices, music streaming and album sales, and major sports leagues all put together. Regional industry reports estimate gaming in the MENA region is a $4.5 billion industry. The number of Middle East gamers is believed to be over 100 million and close to 2.5 billion worldwide.",
        "Al Qana is focused towards leisure and fun for all, with over 50% of the leasable area assigned to entertainment. The project is on track for construction completion with over 90% complete.",
        "For more information about the construction and development of Al Qana, please visit: www.alqana.ae",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* Hero */}
      <section className="border-b border-black/10 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            News Updates
          </h1>
          <p className="mt-3 text-sm sm:text-base text-black/70 dark:text-white/70 max-w-3xl">
            Announcements, tournaments, and updates from Pixoul Gaming. This page
            is designed to grow — new posts can be added from the admin side
            later.
          </p>
        </div>
      </section>

      {/* Feed */}
      <section>
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid gap-6">
            {news.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}