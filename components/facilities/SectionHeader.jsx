export default function SectionHeader({ id, label, title, description }) {
  return (
    <div id={id} className="scroll-mt-28">
      <div className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.06] px-3 py-1 text-xs text-black/70 dark:text-white/70">
        {label}
      </div>
      <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-black dark:text-white">
        {title}
      </h2>
      {description ? (
        <p className="mt-2 text-sm sm:text-base text-black/70 dark:text-white/70 max-w-3xl">
          {description}
        </p>
      ) : null}
    </div>
  );
}