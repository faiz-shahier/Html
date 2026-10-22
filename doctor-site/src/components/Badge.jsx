import { useLanguage } from "../i18n/LanguageContext";

// Round badge with text spinning around "KZ"
export default function Badge({ className = "" }) {
  const { t, rtl } = useLanguage();
  return (
    <div className={`grid h-32 w-32 place-items-center rounded-full border border-white/60 bg-white/70 shadow-lg backdrop-blur ${className}`}>
      <svg viewBox="0 0 100 100" className="absolute h-28 w-28 animate-spin-slow" aria-hidden="true">
        <defs>
          <path id="circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        {/* direction="ltr": the text starts at the beginning of the circle in every language
            (Dari/Pashto letters still read right to left inside it) */}
        <text direction="ltr" className={`fill-navy font-semibold uppercase ${rtl ? "text-[8px]" : "text-[9.5px] tracking-[0.18em]"}`}>
          {/* Dari/Pashto text is shorter, so it is written twice to go all the way round */}
          <textPath href="#circle">{rtl ? `${t.badge} ${t.badge}` : t.badge}</textPath>
        </text>
      </svg>
      <span className="text-2xl font-bold">KZ</span>
    </div>
  );
}
