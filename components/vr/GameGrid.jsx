import GameCard from "./GameCard";

export default function GameGrid({ experiences, title }) {
  if (!experiences || experiences.length === 0) {
    return (
      <div className="py-20 text-center dark:text-gray-400 text-gray-600">
        No experiences available.
      </div>
    );
  }

  return (
    <section className="py-15">
      <div className="max-w-7xl mx-auto px-6">

        {title && (
          <h2 className="text-3xl font-semibold mb-10">
            {title}
          </h2>
        )}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-6
          "
        >
          {experiences.map((exp) => (
            <GameCard
              key={exp.experience_id}
              experience={exp}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
