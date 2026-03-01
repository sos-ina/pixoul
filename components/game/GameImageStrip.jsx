export default function GameImageStrip({ images }) {
  if (!images || images.length === 0) return null;

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-6">

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
          "
        >
          {images.slice(0, 2).map((src, index) => (
            <div
              key={index}
              className="
                relative
                overflow-hidden
                border 
                dark:border-white/10
                border-black/10
              "
            >
              <img
                src={src}
                alt={`Game image ${index + 1}`}
                className="
                  w-full h-[320px]
                  object-cover
                "
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-white/20 dark:bg-black/20" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
