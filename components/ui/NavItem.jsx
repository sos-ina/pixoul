import Link from "next/link";

export default function NavItem({
  label,
  isActive = false,
  onClick,
  children,
  href,
}) {
  const hasDropdown = !!children;
  const baseClassName = "relative hover:text-[#38C2D9] transition-colors text-sm lg:text-sm xl:text-base whitespace-nowrap flex items-center gap-1";
  const content = (
    <>
      {label}
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
      <span
        className={`absolute left-0 -bottom-1 h-[2px] bg-[#38C2D9] transition-all duration-300
        ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
      />
    </>
  );

  return (
    <li className="relative group">
      {href != null ? (
        <Link href={href} onClick={onClick} className={baseClassName}>
          {content}
        </Link>
      ) : (
        <button type="button" onClick={onClick} className={baseClassName}>
          {content}
        </button>
      )}
      {children}
    </li>
  );
}
