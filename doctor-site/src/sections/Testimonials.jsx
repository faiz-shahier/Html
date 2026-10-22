import { FaQuoteLeft } from "react-icons/fa6";
import { testimonials } from "../data";
import Tag from "../components/Tag";
import { useTranslation } from "react-i18next";
import { Stagger, StaggerItem } from "../components/Motion";

// Hidden until real reviews are added in data.js
export default function Testimonials() {
  const { t } = useTranslation();
  if (testimonials.length === 0) return null;

  return (
    <section className="panel">
      <Tag>{t("testimonials.tag")}</Tag>
      <Stagger className="mt-10 grid gap-6 md:grid-cols-2">
        {testimonials.map((t) => (
          <StaggerItem key={t("name")} className="rounded-3xl bg-white p-8 shadow-sm">
            <FaQuoteLeft className="text-5xl text-lavender-light" />
            <blockquote className="mt-4 text-lg italic">{t("text")}</blockquote>
            <figcaption className="mt-4 text-sm text-gray">— {t("name")}</figcaption>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
