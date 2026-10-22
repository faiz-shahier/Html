import { FaQuoteLeft } from "react-icons/fa6";
import { testimonials } from "../data";
import Tag from "../components/Tag";

// Hidden until real reviews are added in data.js
export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="panel">
      <Tag>Patient stories</Tag>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {testimonials.map((t) => (
          <figure key={t.name} className="rounded-3xl bg-white p-8 shadow-sm">
            <FaQuoteLeft className="text-5xl text-lavender-light" />
            <blockquote className="mt-4 text-lg italic">{t.text}</blockquote>
            <figcaption className="mt-4 text-sm text-gray">— {t.name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
