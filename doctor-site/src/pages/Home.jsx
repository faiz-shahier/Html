import { Link } from "react-router-dom";
import { FaArrowRight, FaCheck, FaPhone } from "react-icons/fa6";
import { doctor, badges, facts, services, steps } from "../data";
import Title from "../components/Title";
import ServiceCard from "../components/ServiceCard";
import BookingBanner from "../components/BookingBanner";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-sand">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="inline-block rounded-full bg-white px-4 py-2 text-xs font-semibold text-teal shadow-sm">
              {doctor.title} · {doctor.specialty}
            </p>
            <h1 className="mt-6 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Expert brain &amp; spine surgery, <em className="text-teal">here in Kabul.</em>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray">
              {doctor.name} brings advanced neurosurgical care to patients at {doctor.hospital}.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/contact" className="btn">Book a consultation <FaArrowRight /></Link>
              <a href={`tel:${doctor.phone}`} className="btn-outline"><FaPhone /> {doctor.phone}</a>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              {badges.map((badge) => (
                <li key={badge} className="flex items-center gap-2"><FaCheck className="text-teal" /> {badge}</li>
              ))}
            </ul>
          </div>

          {/* Photo */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy to-teal-dark shadow-2xl">
              {doctor.photo ? (
                <img src={doctor.photo} alt={doctor.name} className="h-full w-full object-cover" />
              ) : (
                <div className="grid h-full place-items-center font-display text-8xl text-white">KZ</div>
              )}
            </div>
            <div className="relative -mt-14 ml-auto mr-4 max-w-64 rounded-2xl bg-white p-5 shadow-xl">
              <p className="font-display text-3xl text-teal">1st</p>
              <p className="mt-1 text-sm">Neurosurgeon from Afghanistan to earn the FCPS in Neurosurgery</p>
            </div>
          </div>
        </div>
      </section>

      {/* Facts */}
      <section className="border-b border-navy/5">
        <div className="mx-auto grid max-w-6xl grid-cols-2 px-4 lg:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label} className="py-8">
              <p className="font-display text-3xl">{fact.value}</p>
              <p className="mt-1 text-sm text-gray">{fact.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-sand py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <Title small="Areas of expertise" title="Specialist care for the brain and spine" />
            <Link to="/services" className="flex items-center gap-2 font-semibold text-teal">All services <FaArrowRight /></Link>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => <ServiceCard key={service.title} service={service} />)}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="mx-auto max-w-6xl px-4 pt-20">
        <Title small="Your visit" title="What to expect, step by step" />
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="border-t-2 border-teal pt-6">
              <span className="text-sm font-bold text-teal">0{i + 1}</span>
              <h3 className="mt-2 text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm text-gray">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <BookingBanner />
    </>
  );
}
