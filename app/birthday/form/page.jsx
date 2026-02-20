import BirthdayBookingForm from "@/components/ui/BirthdayBookingForm";

export const metadata = {
  title: "Birthday Booking Form | Pixoul Gaming",
};

export default function BirthdayFormPage() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <BirthdayBookingForm />
      </div>
    </section>
  );
}