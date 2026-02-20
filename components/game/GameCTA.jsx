import AddToSessionButton from '@/components/cart/AddToSession';

export default function GameCTA({ experience }) {
  return (
    <section className="py-5 text-center flex items-center justify-center h-screen">
      <AddToSessionButton
        experience={experience}
        className="px-5 py-4 text-lg align-center"
      />
    </section>
  );
}
