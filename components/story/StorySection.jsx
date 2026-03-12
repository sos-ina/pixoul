"use client";

export default function StorySection({ title, children }) {
  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-6">

        <h2 className="text-2xl font-semibold mb-6">
          {title}
        </h2>

        <div className=" text-black dark:text-gray-300 leading-relaxed space-y-4">
          {children}
        </div>

      </div>
    </section>
  );
}
