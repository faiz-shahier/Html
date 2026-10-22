export default function Title({ small, title, light = false }) {
  return (
    <div className="max-w-2xl">
      <p className={`text-xs font-bold uppercase tracking-[0.2em] ${light ? "text-gold" : "text-teal"}`}>{small}</p>
      <h2 className={`mt-3 font-display text-3xl sm:text-4xl ${light ? "text-white" : ""}`}>{title}</h2>
    </div>
  );
}
