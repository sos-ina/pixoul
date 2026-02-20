import Link from "next/link";

export default function NavItem({
  label,
  isActive = false,
  children,
  href,
  onClick,
}) {
  const hasDropdown = !!children;
  const content = (
    <>
      {label}
      {/* Dropdown arrow */}
      {hasDropdown && (
        <svg
          className="w-4 h-4 transition-transform group-hover:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      )}
      {/* Underline */}
      <span
        className={`absolute left-0 -bottom-0 h-[2px] bg-[#38C2D9] transition-all duration-300
          ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
      />
    </>
  );

  const wrapperClass = "relative dark:text-white text-black hover:text-[#38C2D9] cursor-pointer transition-colors text-sm lg:text-sm xl:text-base whitespace-nowrap flex items-center gap-1 py-2 text-black dark:text-white dark:hover:text-[#38C2D9]";

  return (
    <li className="relative group list-none">
      {href ? (
        <Link href={href} className={wrapperClass} onClick={onClick}>
          {content}
        </Link>
      ) : (
        <div className={wrapperClass} onClick={onClick} role={onClick ? "button" : undefined}>
          {content}
        </div>
      )}
      {children}
    </li>
  );
}