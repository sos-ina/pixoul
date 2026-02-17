export default function GameGlowSection({ children }) {
  return (
    <section className="py-15 bg-white/60 dark:bg-black/60">
      <div className="max-w-5xl mx-auto px-6">

        <div
          className="
            border border-white/10
            px-8 py-12
            relative
          "
        >
          {/* Accent line */}
          <div className="
            absolute top-0 left-0 h-[2px] w-24
            bg-gradient-to-r from-[#38C2D9] to-transparent
          " />

          <h2 className="text-2xl font-semibold mb-6">
            Game Atmosphere
          </h2>

          <div className="text-gray-300 leading-relaxed space-y-4">
            {children}
          </div>

        </div>

      </div>
    </section>
  );
}
