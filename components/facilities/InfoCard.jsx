export default function InfoCard({ title, items }) {
  return (
    <div className="rounded-none border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] backdrop-blur-md shadow-sm p-6 sm:p-7">
      <h3 className="text-lg sm:text-xl font-semibold text-black dark:text-white">
        {title}
      </h3>

      <ul className="mt-4 space-y-3 text-sm sm:text-base text-black/75 dark:text-white/75">
        {items.map((item, idx) => (
          <li key={idx} className="flex gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-[#38C2D9] flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}