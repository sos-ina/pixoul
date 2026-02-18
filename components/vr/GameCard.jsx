import Link from "next/link";
import BookNowButton from '@/components/ui/BookNowButton';
import { routes } from "@/lib/routes";
import AddToSessionButton from "@/components/cart/AddToSession";


export default function GameCard({ experience }) {
  const {
    experience_id,
    title,
    slug,
    category_name,
    image_url,
    genre,

    can_book,
    has_details,

    duration_minutes,
    min_players,
    max_players,
    min_age,
      price,
  } = experience;

  const categorySlug = category_name.toLowerCase();


  return (
    <div
      className="
        group
        relative
        dark:bg-black/80
        bg-[#F1F5F9]
        border border-white/10
        transition
        overflow-hidden

        hover:border-[#38C2D9]/70
        hover:shadow-[0_0_40px_rgba(56,194,217,0.15)]
      "
    >
      {/* IMAGE */}
      <div className="relative h-56 overflow-hidden">

        <img
          src={image_url}
          alt={title}
          className="
            w-full h-full object-cover
            transition-transform duration-500
            group-hover:scale-105
          "
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 dark:bg-black/40 bg-white/20" />

        {/* CATEGORY TAG */}
        <div
          className="
            absolute top-3 left-3
            text-[10px]
            uppercase tracking-widest
            px-2 py-1
            border border-white/30
            dark:bg-black/60
            bg-white/60
          "
        >
          {category_name}
        </div>

        {/* BOOKING STATUS */}
        {!can_book && (
          <div
            className="
              absolute top-3 right-3
              text-[10px]
              uppercase tracking-widest
              px-2 py-1
              border border-red-400/50
              text-red-400
              dark:bg-black/60 bg-white/60
            "
          >
            Walk-In Only
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col gap-3">

        {/* TITLE  and price*/}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold leading-tight">
            {title}
          </h3>

          <h3 className="text-md font-semibold leading-tight text-[#38C2D9]">
            AED {price}
          </h3>
        </div>


        {/* META */}
        <div className="text-xs dark:text-gray-400 text-gray-600 flex gap-4">
          {duration_minutes && <span>{duration_minutes} min</span>}
          {min_players && max_players && (
            <span>{min_players}–{max_players} players</span>
          )}
          {min_age && <span>{min_age}+</span>}
        </div>

        {/* ACTIONS */}
        <div className="mt-4 flex gap-3">

          {/* BOOK NOW (only if allowed) */}
          {can_book && (
            <AddToSessionButton
              className="px-4 py-2 text-sm"
              experience={experience}
            />
          )}

          {/* LEARN MORE (only if meaningful) */}
          {has_details && (
            <Link
              href={routes.experience(categorySlug, slug)}
              className="
                px-4 py-2 text-sm
                border 
                dark:border-white/30
                border-black/30
                hover:border-[#38C2D9]
                hover:text-[#38C2D9]
                transition

              "
            >
              Learn More
            </Link>
          )}
        </div>
      </div>

      {/* FUTURISTIC EDGE LINE */}
      <div
        className="
          absolute inset-x-0 bottom-0 h-[1px]
          bg-gradient-to-r
          from-transparent
          via-[#38C2D9]
          to-transparent
          opacity-0
          group-hover:opacity-100
          transition
        "
      />
    </div>
  );
}
