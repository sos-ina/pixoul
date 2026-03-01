export default function TechnologyBlock({ title, children }) {
  return (
    <div
      className="
        border 
        border border-black/10 dark:border-white/10
        rounded-none
        bg-white/70 dark:bg-black/70
        px-6 py-6
      "
    >
      <h3 className="text-lg font-semibold mb-4">
        {title}
      </h3>

      <div className="text-black dark:text-gray-300 leading-relaxed space-y-3 text-sm">
        {children}
      </div>
    </div>
  );
}
