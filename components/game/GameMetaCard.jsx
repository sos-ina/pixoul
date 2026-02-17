export default function GameMetaCard({ label, value }) {
  return (
    <div
      className="
        border border-[#38C2D9]
        bg-white/70 dark:bg-black/70
        px-4 py-3
      "
    >
      <p className="text-xs uppercase tracking-widest dark:text-gray-400 text-gray-600 mb-1">
        {label}
      </p>
      <p className="text-sm font-medium">
        {value}
      </p>
    </div>
  );
}
