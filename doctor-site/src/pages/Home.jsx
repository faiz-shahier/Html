import Hero from "../sections/Hero";
import AboutIntro from "../sections/AboutIntro";
import WhyUs from "../sections/WhyUs";
import ServicesList from "../sections/ServicesList";
import Booking from "../sections/Booking";
import Testimonials from "../sections/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutIntro />
      <WhyUs />
      <ServicesList />
      <Booking />
      <Testimonials />
    </>
  );
}
