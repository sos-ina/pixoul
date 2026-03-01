export default function EventTypeGrid({ types }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8 py-2">
      {types.map((type) => (
        <div
          key={type.title}
          className="
            border dark:border-white/10
            border-black/10
            bg-white/60
            dark:bg-black/60
            p-4 sm:p-5 md:p-6
            rounded-none
            hover:border-[#38C2D9]
            hover:shadow-[0_0_25px_rgba(56,194,217,0.25)]
            transition
          "
        >
          <h4 className="text-[#38C2D9] font-semibold text-lg">
            {type.title}
          </h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            {type.subtitle}
          </p>
        </div>
      ))}
    </div>
  );
}
