import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const titles = {
  "/": "Dr. Khalid Khan Zadran | Neurosurgeon in Kabul",
  "/about": "About | Dr. Khalid Khan Zadran",
  "/services": "Services | Dr. Khalid Khan Zadran",
  "/contact": "Book an appointment | Dr. Khalid Khan Zadran",
};

export default function App() {
  const location = useLocation();

  // On every click of a link (even to the same page): go to the top and set the tab title
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = titles[location.pathname] || "Page not found | Dr. Khalid Khan Zadran";
  }, [location.key, location.pathname]);

  return (
    <>
      <Header />
      {/* Each new page fades in (key = page address) */}
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.main>
      <Footer />
    </>
  );
}
