// Round badge with text spinning around "KZ"
export default function Badge({ className = "" }) {
  return (
    <div className={`grid h-32 w-32 place-items-center rounded-full border border-white/60 bg-white/70 shadow-lg backdrop-blur ${className}`}>
      <svg viewBox="0 0 100 100" className="absolute h-28 w-28 animate-spin-slow" aria-hidden="true">
        <defs>
          <path id="circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-navy text-[9.5px] font-semibold uppercase tracking-[0.18em]">
          <textPath href="#circle">Brain & Spine Surgeon • Kabul •</textPath>
        </text>
      </svg>
      <span className="text-2xl font-bold">KZ</span>
    </div>
  );
}
