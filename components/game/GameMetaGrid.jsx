import GameMetaCard from "./GameMetaCard";

export default function GameMetaGrid({ meta }) {
  return (
    <section className="py-15">
      <div className="max-w-5xl mx-auto px-6">

        <div className="
          grid
          grid-cols-2
          sm:grid-cols-4
          gap-4
        ">
          {meta.map((item, index) => (
            <GameMetaCard
              key={index}
              label={item.label}
              value={item.value}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
