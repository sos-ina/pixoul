
export default function FooterColumn({ title, children }) {
  return (
    <div className="flex flex-col gap-2 md:gap-3">
      {title && (
        <h4 className="text-xs sm:text-sm md:text-sm font-semibold uppercase tracking-wider text-gray-400">
          {title}
        </h4>
      )}

      <div className="flex flex-col gap-1.5 md:gap-2 text-xs sm:text-sm md:text-sm text-gray-300">
        {children}
      </div>
    </div>
  );
}
