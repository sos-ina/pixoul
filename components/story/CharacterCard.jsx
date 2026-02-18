"use client";

export default function CharacterCard({ name, image, description }) {
  return (
    <div
      className="
        group
        relative
        bg-white/90 
        dark:bg-black/90
        border 
        border-white/10
        dark:border-black/10
        overflow-hidden
        transition
        hover:border-[#38C2D9]/60
        hover:shadow-[0_0_40px_rgba(56,194,217,0.12)]
      "
    >
      {/* IMAGE */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="
            w-full h-full object-cover
            transition-transform duration-500
            group-hover:scale-105
          "
        />

        {/* Gradient overlay */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-black via-black/40 to-transparent
          "
        />

        {/* Accent scan line */}
        <div
          className="
            absolute bottom-0 left-0 h-[2px] w-0
            bg-[#38C2D9]
            group-hover:w-full
            transition-all duration-500
          "
        />
      </div>

      {/* CONTENT */}
      <div className="p-4 relative">

        {/* Name */}
        <h3
          className="
            text-lg font-semibold
            tracking-wide
            mb-2
          "
        >
          {name}
        </h3>

        {/* Divider */}
        <div className="h-px w-12 bg-[#38C2D9]/60 mb-3" />

        {/* Description */}
        <p className="text-sm text-black dark:text-gray-300 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Corner tech marks */}
      <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#38C2D9]/60" />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#38C2D9]/60" />
    </div>
  );
}

