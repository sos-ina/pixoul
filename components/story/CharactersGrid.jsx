"use client";
import CharacterCard from "./CharacterCard";

export default function CharactersGrid({ characters }) {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-3xl font-semibold mb-12vt text-center pb-10">
          Characters
        </h2>

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-8
          "
        >
          {characters.map((char, index) => (
            <CharacterCard key={index} {...char} />
          ))}
        </div>

      </div>
    </section>
  );
}

