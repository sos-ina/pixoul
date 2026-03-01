import Title from "@/components/ui/Title";

export const metadata = {
  title: "Terms & Conditions | Pixoul Gaming",
};

export default function TermsPage() {
  return (
    <section className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white pt-12 pb-20">
      <div className="max-w-5xl mx-auto px-6">

        <Title align="left">Terms & Conditions</Title>

        <div className="mt-12 space-y-6 sm:space-y-8 text-sm md:text-base leading-relaxed text-black/70 dark:text-white/70">

          {/* 1 */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-3 text-[#38C2D9] uppercase tracking-wide">
              1. General Admission
            </h2>
            <p>
              By entering Pixoul Gaming premises, all guests agree to comply
              with these Terms & Conditions and all posted rules and
              regulations. Management reserves the right to refuse admission
              or remove any guest who violates these policies.
            </p>
          </div>

          {/* 2 */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-3 text-[#38C2D9] uppercase tracking-wide">
              2. Age & Supervision
            </h2>
            <p>
              Children under 12 years of age must be supervised by a parent or
              legal guardian at all times. Certain VR experiences may have
              specific age, height, or health restrictions.
            </p>
          </div>

          {/* 3 */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-3 text-[#38C2D9] uppercase tracking-wide">
              3. Health & Safety
            </h2>
            <p>
              Guests must follow all safety instructions provided by staff.
              Participation in VR experiences is at your own risk. Individuals
              with medical conditions including heart issues, epilepsy,
              pregnancy, motion sickness, or similar conditions should consult
              a medical professional before participation.
            </p>
          </div>

          {/* 4 */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-3 text-[#38C2D9] uppercase tracking-wide">
              4. Conduct
            </h2>
            <p>
              Guests are expected to behave respectfully toward staff and other
              visitors. Fighting, harassment, vandalism, or misuse of equipment
              is strictly prohibited. Any damage to property may result in
              penalties or compensation charges.
            </p>
          </div>

          {/* 5 */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-3 text-[#38C2D9] uppercase tracking-wide">
              5. Bookings & Payments
            </h2>
            <p>
              All bookings are subject to availability. Online bookings must be
              completed through the official Pixoul Gaming website. Payments
              made online are processed securely. Pixoul reserves the right to
              cancel or reschedule sessions due to technical or operational
              reasons.
            </p>
          </div>

          {/* 6 */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-3 text-[#38C2D9] uppercase tracking-wide">
              6. Refund & Cancellation Policy
            </h2>
            <p>
              Refunds are subject to management approval. Cancellations must be
              made within the specified timeframe to qualify for a refund.
              Failure to attend a booked session without prior notice may
              result in forfeiture of payment.
            </p>
          </div>

          {/* 7 */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-3 text-[#38C2D9] uppercase tracking-wide">
              7. Liability
            </h2>
            <p>
              Pixoul Gaming shall not be held responsible for any injuries,
              losses, or damages incurred during participation in activities,
              except where required by applicable law. Guests participate at
              their own risk.
            </p>
          </div>

          {/* 8 */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-3 text-[#38C2D9] uppercase tracking-wide">
              8. Personal Belongings
            </h2>
            <p>
              Guests are responsible for their personal belongings. Pixoul
              Gaming is not liable for lost, stolen, or damaged items.
            </p>
          </div>

          {/* 9 */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-3 text-[#38C2D9] uppercase tracking-wide">
              9. Photography & Media
            </h2>
            <p>
              Pixoul Gaming may capture photos or videos for promotional
              purposes. By entering the venue, guests consent to potential use
              of such media unless otherwise stated in writing.
            </p>
          </div>

          {/* 10 */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-3 text-[#38C2D9] uppercase tracking-wide">
              10. Modifications
            </h2>
            <p>
              Pixoul Gaming reserves the right to update or modify these Terms
              & Conditions at any time without prior notice. Continued use of
              services constitutes acceptance of any changes.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}