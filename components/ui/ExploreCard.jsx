import Link from "next/link";

export default function ExploreCard({
  title,
  description,
  image,
  href,
}) {

  const Wrapper = href ? "a" : "div";

  return (
    <div className={`
    relative group 
    overflow-hidden 
    h-[320px] 
    hover:border-[#38C2D9]
    ${href ? "cursor-pointer hover:scale-[1.03]" : ""}
    `}>

      {/* Background image */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6">
        <h3 className="text-2xl font-bold mb-2">
          {title}
        </h3>

        {description && (
          <p className="text-sm text-gray-300 mb-4">
            {description}
          </p>
        )}

        <Link
          href={href}
          className="inline-block w-fit px-4 py-2 text-sm border border-[#38C2D9] text-white rounded-sm hover:bg-[#38C2D9] hover:text-black transition"
        >
          Learn More
        </Link>
      </div>

    </div>
  );
}
