export default function GameMetaCard({ label, value }) {
  return (
    <div
      className="
        border border-[#38C2D9]
        bg-black/70
        px-4 py-3
      "
    >
      <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
        {label}
      </p>
      <p className="text-sm font-medium">
        {value}
      </p>
    </div>
  );
}
