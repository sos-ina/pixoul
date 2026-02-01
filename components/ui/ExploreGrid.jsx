import ExploreCard from "./ExploreCard";

export default function ExploreGrid({ items }) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, index) => (
          <ExploreCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
}
