import { Link } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";
import { FaCertificate } from "react-icons/fa6";
import { reasonIcons, photos } from "../data";
import { useTranslation } from "react-i18next";
import Tag from "../components/Tag";
import Photo from "../components/Photo";
import { motion } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "../components/Motion";

export default function WhyUs() {
  const { t } = useTranslation();
  const reasons = t("why.reasons").map((title, i) => ({ title, icon: reasonIcons[i] }));
  return (
    <section className="panel bg-white shadow-sm">
      <Reveal className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <Tag>{t("why.tag")}</Tag>
          <h2 className="heading mt-6 max-w-lg">{t("why.title")}</h2>
        </div>
        <div className="flex items-center gap-5">
          <FaCertificate className="shrink-0 text-5xl text-navy" />
          <div>
            <p className="italic text-gray">{t("why.member")}</p>
            <Link to="/contact" className="mt-1 inline-flex items-center gap-1 border-b border-blue text-sm font-semibold text-blue">
              {t("why.cta")} <GoArrowUpRight className="rtl:-scale-x-100" />
            </Link>
          </div>
        </div>
      </Reveal>

      <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((r) => (
          <StaggerItem key={r.title}>
            <motion.div whileHover="hover" className="group flex h-full min-h-56 flex-col justify-between rounded-3xl bg-white p-7 shadow-[0_10px_40px_-10px_rgba(22,23,92,0.12)] transition-shadow hover:shadow-[0_20px_50px_-10px_rgba(22,23,92,0.22)]">
              <motion.span variants={{ hover: { rotate: 12, scale: 1.1 } }} className="grid h-14 w-14 place-items-center rounded-full bg-lavender-light text-xl text-blue transition-colors group-hover:bg-blue group-hover:text-white">
                <r.icon />
              </motion.span>
              <h3 className="text-lg font-medium">{r.title}</h3>
            </motion.div>
          </StaggerItem>
        ))}
        <StaggerItem>
          <Photo src={photos.clinic} alt={t("photos.clinic")} className="h-full min-h-56 rounded-3xl" />
        </StaggerItem>
      </Stagger>
    </section>
  );
}
