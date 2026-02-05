import AddToSessionButton from '@/components/cart/AddToSession';

export default function GameCTA({ experience }) {
  return (
    <section className="py-20 text-center">
      <AddToSessionButton
        experience={experience}
        className="px-10 py-4 text-lg"
      />
    </section>
  );
}
