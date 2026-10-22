import { services } from "../data";
import Title from "../components/Title";
import ServiceCard from "../components/ServiceCard";
import BookingBanner from "../components/BookingBanner";

export default function Services() {
  return (
    <>
      <section className="bg-sand py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Title small="Services" title="Specialist care for the brain and spine" />
          <p className="mt-4 max-w-2xl text-gray">
            Every patient receives a careful assessment and a clear explanation of their options before any treatment.
          </p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {services.map((service) => <ServiceCard key={service.title} service={service} />)}
          </div>
        </div>
      </section>
      <BookingBanner />
    </>
  );
}
