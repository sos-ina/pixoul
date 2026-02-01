import Link from "next/link";

export default function CallToActionBanner({
  title,
  highlight,
  description,
  primaryAction,
  children,
}) {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div
          className="
            relative
            px-8 py-16
            text-center
            bg-gradient-to-r from-[#0b2a33] via-[#0e1b2d] to-[#2a0f3d]
            border border-white/10
            shadow-[0_0_60px_rgba(56,194,217,0.15)]
          "
        >

          {/* Heading */}
          {title && (
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {highlight ? (
                <>
                  {title.replace(highlight, "")}
                  <span className="text-[#38C2D9]">
                    {highlight}
                  </span>
                </>
              ) : (
                title
              )}
            </h2>
          )}

          {/* Description */}
          {description && (
            <p className="text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              {description}
            </p>
          )}

          {/* Actions */}
          <div className="flex justify-center gap-4">
            {primaryAction && (
              <Link
                href={primaryAction.href}
                className="
                  px-10 py-4
                  text-lg
                  font-semibold
                  border border-[#38C2D9]
                  text-white
                  rounded-none
                  hover:bg-[#38C2D9]/10
                  transition
                "
              >
                {primaryAction.label}
              </Link>
            )}

            {/* Optional extra buttons */}
            {children}
          </div>

        </div>

      </div>
    </section>
  );
}
