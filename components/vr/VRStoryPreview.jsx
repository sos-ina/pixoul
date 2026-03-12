import Link from "next/link";

export default function VRStoryPreview({
  title,
  description,
  storyHref,
}) {
  return (
    <section className="py-12 relative w-full hover:shadow-[0_0_60px_rgba(56,194,217,0.15)] transition">
      <div className="flex items-center justify-center px-4 sm:px-6">

        <div
          className="
            relative
            border border-white/10
            dark:bg-black/70 bg-white/70
            px-8 py-16
            w-full
            text-center
          "
        >
          {/* Accent line */}
          <div
            className="
              absolute top-0 left-1/2 transform -translate-x-1/2 h-[2px] w-32
              bg-gradient-to-r from-[#38C2D9] to-transparent
            "
          />

          {/* Eyebrow */}
          <p className="text-xs uppercase tracking-widest dark:text-gray-400 text-gray-600 mb-4">
            A Fractured Digital Reality Where Worlds Collide 
          </p>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 mx-auto">
            {title}
          </h2>

          {/* Description */}
          <div className="dark:text-gray-300 text-gray-600 space-y-4 leading-relaxed mx-auto">
            {description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Action */}
          <div className="mt-10 flex justify-center">
            <Link
              href={storyHref}
              className="
                inline-block
                px-8 py-3
                border border-[#38C2D9]
                text-[#38C2D9]
                uppercase
                tracking-wider
                text-sm
                hover:bg-[#38C2D9]/10
                transition
              "
            >
              Read Full Story
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
