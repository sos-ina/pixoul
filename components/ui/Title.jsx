export default function PageTitle({ children, align = "left" }) {
  return (
    <h1
      className={`
        text-2xl md:text-4xl
        font-bold
        mb-8
        ${align === "center" ? "text-center" : "text-left"}
      `}
    >
      {children}
    </h1>
  );
}
