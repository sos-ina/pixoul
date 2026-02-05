import BookNowButton from "../ui/BookNowButton";

export default function GameCTA({ experienceId }) {
  return (
    <section className="py-20 text-center">
      <BookNowButton
        className="px-10 py-4 text-lg"
        experienceId={experienceId}
      />
    </section>
  );
}
