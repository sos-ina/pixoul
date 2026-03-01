export default function StatCard({ value, label, description, link }) {
  const Wrapper = link ? "a" : "div";

  return (
    <Wrapper
      href={link}
      className={`
        relative
        rounded-none
        border dark:border-white/10 border-black/10
        dark:bg-black/40 bg-white/40
        backdrop-blur-md
        p-4 sm:p-5 md:p-6 lg:p-8
        flex flex-col items-center justify-center
        text-center
        transition-all duration-300
        hover:border-[#38C2D9]
        ${link ? "cursor-pointer hover:scale-[1.03]" : ""}
      `}
    >
      <div className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#38C2D9]">
        {value}
      </div>

      <div className="text-xs sm:text-sm md:text-base font-semibold mt-2 md:mt-3 tracking-wide">
        {label}
      </div>

      {description && (
        <p className="text-xs sm:text-sm md:text-sm dark:text-gray-400 text-gray-600 mt-2 md:mt-3">
          {description}
        </p>
      )}
    </Wrapper>
  );
}
