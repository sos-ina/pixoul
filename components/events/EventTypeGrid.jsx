export default function EventTypeGrid({ types }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 py-2">
      {types.map((type) => (
        <div
          key={type.title}
          className="
            border border-white/10
            bg-black/60
            p-5
            rounded-none
            hover:border-[#38C2D9]
            hover:shadow-[0_0_25px_rgba(56,194,217,0.25)]
            transition
          "
        >
          <h4 className="text-[#38C2D9] font-semibold text-lg">
            {type.title}
          </h4>
          <p className="text-gray-400 text-sm mt-1">
            {type.subtitle}
          </p>
        </div>
      ))}
    </div>
  );
}
