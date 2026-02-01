
export default function Dropdown({ isOpen, children, width = "w-40" }) {
  if (!isOpen) return null;

  return (
    <div
      className={`absolute top-10 left-0 bg-black border border-[#38C2D9]  p-3 space-y-2 animate-fadeIn ${width}`}
    >
      {children}
    </div>
  );
}
