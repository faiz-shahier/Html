import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

export default function BookingBanner() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="flex flex-col gap-6 rounded-3xl bg-teal p-10 text-white md:flex-row md:items-center md:justify-between md:p-14">
        <h2 className="max-w-lg font-display text-3xl">Ready to talk about your brain or spine health?</h2>
        <Link to="/contact" className="btn shrink-0 bg-white text-teal hover:bg-sand">
          Book a consultation <FaArrowRight />
        </Link>
      </div>
    </section>
  );
}
