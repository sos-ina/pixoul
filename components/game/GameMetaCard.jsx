export default function GameMetaCard({ label, value }) {
  return (
    <div
      className="
        border border-[#38C2D9]
        bg-white/70
        dark:bg-black/70
        px-4 py-3
        rounded-none
      "
    >
      <p className="text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1 font-bold">
        {label}
      </p>
      <p className="text-sm font-semibold text-black dark:text-white">
        {value}
      </p>
    </div>
  );
}
