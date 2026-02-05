export default function GameSection({ title, children }) {
  return (
    <section className="py-15">
      <div className="max-w-5xl mx-auto px-6">

        {title && (
          <h2 className="text-2xl font-semibold mb-6">
            {title}
          </h2>
        )}

        <div className="text-gray-300 leading-relaxed space-y-4">
          {children}
        </div>

      </div>
    </section>
  );
}
