import SectionHeader from "@/components/facilities/SectionHeader";
import InfoCard from "@/components/facilities/InfoCard";


export const metadata = {
  title: "Facilities | Plan Your Visit | Pixoul Gaming",
  description:
    "Facilities information for Pixoul Gaming including Health & Safety, Parking, and Guest Services.",
};





export default function FacilitiesPage() {
  const healthSafety = [
    "Hand sanitizers have been installed throughout Pixoul for guests to use freely.",
    "Male & Female toilets are available throughout Pixoul.",
    "A Lifecare Clinic for first-aid treatment is available for all visitors, located at The Bridge Lifestyle Hub building (next to Notorious Café).",
    "First-aid clinic timing: Sun–Thu 10:00 am – 10:00 pm; Fri–Sun 11:00 am – 11:00 pm.",
  ];

  const parking = [
    "Free parking: Outdoor and basement parking spaces are available for Pixoul guests.",
    "Valet parking service is available in front of The Bridge Lifestyle Hub. Charges are AED 40 (Standard) & AED 100 (VIP) — Terms & Conditions apply.",
    "Parking for People of Determination: Designated parking spaces are available.",
  ];

  const services = [
    "Restaurant: Available for Pixoul guests on the second floor serving international cuisines.",
    "Merchandise shop: Unique gifts and souvenirs located on the first floor of the hub.",
    "Lost & Found: Please report to the guest service desk on the first floor or email info@pixoulgaming.com.",
    "Wheelchair stand: Non-electric wheelchairs are available throughout Al Qana on a complimentary basis (designated wheelchair cabinets at the customer service desk).",
    "Dress code: Please wear respectful clothing in accordance with UAE local law and customs.",
  ];

  return (
    <main className="min-h-screen text-black dark:text-white">
      {/* Background (matches your site gradients) */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-r from-[#f8fcff] via-[#f1f5fb] to-[#f6f0ff] dark:from-[#0b2a33] dark:via-[#0e1b2d] dark:to-[#2a0f3d]" />
      <div className="fixed inset-0 -z-10 bg-white/35 dark:bg-black/35 backdrop-blur-[2px]" />

      {/* Hero */}
      <section className="border-b border-black/10 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-6 pt-24 pb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/[0.06] px-3 py-1 text-xs text-black/70 dark:text-white/70 backdrop-blur-md">
            Plan Your Visit
          </div>

          <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">
            Facilities
          </h1>

          <p className="mt-3 text-sm sm:text-base text-black/70 dark:text-white/70 max-w-3xl">
            Everything you need for a smooth visit — health & safety, parking
            options, and guest services available at Pixoul.
          </p>

          {/* Quick jump links */}
          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href="#health-safety"
              className="px-4 py-2 rounded-none border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/[0.06] text-sm text-black/80 dark:text-white/80 hover:border-[#38C2D9]/60 hover:text-[#38C2D9] transition"
            >
              Health & Safety
            </a>
            <a
              href="#parking"
              className="px-4 py-2 rounded-none border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/[0.06] text-sm text-black/80 dark:text-white/80 hover:border-[#38C2D9]/60 hover:text-[#38C2D9] transition"
            >
              Parking
            </a>
            <a
              href="#services"
              className="px-4 py-2 rounded-none border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/[0.06] text-sm text-black/80 dark:text-white/80 hover:border-[#38C2D9]/60 hover:text-[#38C2D9] transition"
            >
              Services
            </a>
          </div>
        </div>
      </section>

      {/* Content */}
      <section>
        <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
          {/* Health & Safety */}
          <div className="space-y-6">
            <SectionHeader
              id="health-safety"
              label="Visitor Info"
              title="Health & Safety"
              description="Guest comfort and safety guidelines, facilities, and first-aid information."
            />
            <InfoCard title="Health & Safety" items={healthSafety} />
          </div>

          {/* Parking */}
          <div className="space-y-6">
            <SectionHeader
              id="parking"
              label="Getting Here"
              title="Parking"
              description="Parking options available for Pixoul guests, including valet and accessibility parking."
            />
            <InfoCard title="Parking" items={parking} />
          </div>

          {/* Services */}
          <div className="space-y-6">
            <SectionHeader
              id="services"
              label="On-site"
              title="Services"
              description="Helpful services and amenities available during your visit."
            />
            <InfoCard title="Guest Services" items={services} />
          </div>

          {/* Helpful note */}
          <div className="rounded-none border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] backdrop-blur-md p-6 sm:p-7">
            <h3 className="text-lg font-semibold">Need help?</h3>
            <p className="mt-2 text-sm sm:text-base text-black/70 dark:text-white/70">
              For Lost & Found or any assistance during your visit, please
              contact our team at{" "}
              <a
                href="mailto:info@pixoulgaming.com"
                className="text-[#38C2D9] hover:underline"
              >
                info@pixoulgaming.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}