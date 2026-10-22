import { Link } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);
// Grows a little on hover, presses in on click
const press = { whileHover: { scale: 1.03 }, whileTap: { scale: 0.96 } };

// Navy pill with a white arrow circle. Use `to` for pages, or `type="submit"` in forms.
export default function Button({ to, children, light = false, type, className = "" }) {
  const style = `group inline-flex items-center gap-3 rounded-full py-1.5 ps-6 pe-1.5 text-sm font-medium transition ${
    light ? "bg-navy/10 text-navy hover:bg-navy/15" : "bg-navy text-white hover:bg-blue"
  } ${className}`;

  const content = (
    <>
      {children}
      <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-lg text-navy transition group-hover:rotate-45">
        <GoArrowUpRight className="rtl:-scale-x-100" />
      </span>
    </>
  );

  return to ? (
    <MotionLink to={to} className={style} {...press}>{content}</MotionLink>
  ) : (
    <motion.button type={type} className={style} {...press}>{content}</motion.button>
  );
}
