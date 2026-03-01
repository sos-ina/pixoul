"use client";
import Hero from "@/components/ui/Hero";
import StatGrid from "@/components/ui/StatGrid";
import CallToActionBanner from "@/components/ui/CTA";

import ImageCarousel from "@/components/ui/ImageCarousel";
import Title from "@/components/ui/Title";
import EventTypeGrid from "@/components/events/EventTypeGrid";
import TheHallBookingForm from "@/components/forms/TheHallBookingForm";
import { useState } from "react";




export default function HallPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

    // Stats Data 
  const stats = [
    { label: "Total Event Space", value: "402m²" },
    { label: "Stage (Flexible)", value: "12×3m" },
    { label: "Parking Space", value: "1,500" },
    { label: "Seating Capacity", value: "656" },
  ];

    {/* Gallery Images */}
  const galleryImages = [
  {
    image: "https://placehold.net/default.png",
    title: "Pixoul Gaming",
    subtitle: "Immersive VR worlds designed to thrill.",
  },
  {
    image: "https://placehold.net/default.png",
    title: "Birthday Parties",
    subtitle: "Celebrate in a whole new reality.",
  },
  {
    image: "https://placehold.net/default.png",
    title: "The Hall",
    subtitle: "A futuristic space for unforgettable events.",
  },
];

    {/* Services Data */}
  const services = [
    {
      title: "Furniture",
      description:
        "Stylish and comfortable furniture options, customizable to match your event theme.",
    },
    {
      title: "Catering",
      description:
        "Organic and non-organic menus available through our partners Tazal & The Bridge.",
    },
    {
      title: "A/V Support",
      description:
        "Professional audiovisual equipment and support to bring your presentations to life.",
    },
    {
      title: "Staff",
      description:
        "Friendly and experienced staff ensuring seamless execution from start to finish.",
    },
    {
      title: "Marketing",
      description:
        "Boost your event visibility with advertising across nearby facilities.",
    },
    {
      title: "Printing & Signage",
      description:
        "High-quality printed materials and signage to elevate the guest experience.",
    },
  ];


  const eventTypes = [
  { title: "Birthday Parties", subtitle: "Celebrate with VR & arcade access" },
  { title: "Corporate Events", subtitle: "Meetings, launches, team building" },
  { title: "Private Bookings", subtitle: "Exclusive gatherings and celebrations" },
  { title: "Entertainment Events", subtitle: "Shows, community nights, more" },
  { title: "School Trips", subtitle: "Guided group experiences for students" },
];




  return (
    <>
      {/* HERO */}
      <Hero
        imageSrc="/images/AQ-hall.jpg"
        overlay={true}
      >
        <div className="flex flex-col items-center justify-center h-full text-center px-6">

        {/* Main headline */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white dark:text-white">
          WELCOME TO THE
          <br />
          <span className="text-[#38C2D9]">THE HALL</span>

        </h1>

        {/* Supporting text */}
        <p className="text-white/80 max-w-2xl mb-10 text-base md:text-lg">
          Abu Dhabi’s best multipurpose event venue — designed to elevate
            every occasion with cutting-edge technology and impeccable
            hospitality.
        </p>
        <div className="flex gap-4">
             <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 sm:px-8 sm:py-3 rounded-none bg-[#38C2D9] text-black font-semibold hover:brightness-110 transition focus:outline-none focus:ring-2 focus:ring-[#38C2D9]/40"
          >
          Request Booking
        </button>
        </div>
        </div>
          

      </Hero>

        {/* STATS GRID */}

        <StatGrid stats={stats} />

      

      {/* ABOUT */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">

          {/* Text */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6 text-black dark:text-white">
              Set the Stage. Embrace the Applause.
            </h2>
            <p className="dark:text-gray-300 text-gray-600 leading-relaxed mb-6">
                Designed to elevate, you can now experience organizing an occasion in a 
                plug & play venue, making it effortless to book and deliver your event. 
                The Hall seamlessly blends cutting-edge technology with impeccable hospitality to 
                provide an unforgettable experience.
            </p>
            <p className="dark:text-gray-300 text-gray-600 leading-relaxed mb-6">
                From entertainment, corporate conferences to intimate gatherings, 
                our versatile space caters to your every need making it simpler and trouble-free. 
                The Hall is here to make your event a successful story!
            </p>

            <p className="dark:text-gray-400 text-gray-500 leading-relaxed mb-6">

              Book with confidence and let Pixoul deliver an unforgettable event
              experience — simple, seamless, and future-ready.
            </p>

            <h3 className="text-xl font-semibold mb-4 text-[#38C2D9]">
  Perfect For:
</h3>

        <EventTypeGrid types={eventTypes} />
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6 ">
          <h2 className="text-3xl font-bold mb-12 text-center text-black dark:text-white">
            Event Services Included
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="
                  dark:bg-black/70 bg-white/70
                  border 
                  dark:border-white/10
                  border-black/10
                  p-5 sm:p-6
                  rounded-none
                  hover:border-[#38C2D9]/70
                  transition
                  shadow-[0_0_30px_rgba(56,194,217,0.08)]
                "
              >
                <h3 className="text-lg font-semibold mb-3 text-[#38C2D9]">
                  {service.title}
                </h3>
                <p className="text-sm dark:text-gray-400 text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* FACT SHEET CTA */}
      {/* FACT SHEET (COMPACT ROW) */}
<section className="py-6">
  <div className="max-w-6xl mx-auto px-6">
    <div
      className="
        flex flex-col sm:flex-row 
        items-center justify-between 
        gap-4 
        border border-black/10 dark:border-white/10 
        rounded-none
        px-5 py-4 
        bg-white/60 dark:bg-black/50
      "
    >
      {/* Text */}
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 text-center sm:text-left">
        Need detailed venue specs, layout, and capacity info?{" "}
        <span className="text-[#38C2D9] font-medium">
          Download the full fact sheet.
        </span>
      </p>

      {/* Button */}
      <a
        href="https://thehall.ae/wp-content/uploads/2024/06/The-Hall-Fact-Sheet-2024.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="
          px-5 py-2.5 
          rounded-none 
          border border-[#38C2D9] 
          text-[#38C2D9] 
          font-medium 
          text-sm
          hover:bg-[#38C2D9] hover:text-black 
          transition
        "
      >
        Download PDF
      </a>
    </div>
  </div>
</section>

      {/* GALLERY */}
      <section className="py-12">
        <div>
          <Title align="center">Gallery</Title>
          <ImageCarousel items={galleryImages} />
        </div>
      </section>

        {/* FINAL CTA */}
        
      <CallToActionBanner
      title="Plan Your Next Event at The Hall"
      highlight="The Hall"
      description="The possibilities are endless with our unparalleled event services."
      primaryAction={{
          label: "Book The Hall",
          onClick: () => setIsModalOpen(true),
        }}
    />

    {/* MODAL */}
      {isModalOpen && (
        <TheHallBookingForm onClose={() => setIsModalOpen(false)} />
      )}
    </>

    
  );
}
