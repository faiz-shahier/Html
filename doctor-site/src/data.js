// Things that are the same in every language: phone, photos, icons, short codes.
// All words are in src/i18n/en.js (English), fa.js (Dari) and ps.js (Pashto).
import { FaBrain, FaUserInjured, FaBone, FaMicrochip, FaUserDoctor, FaHeartPulse } from "react-icons/fa6";

export const contact = {
  phone: "+93 78 765 4751",
  whatsapp: "93787654751",
  facebook: "", // put the Facebook page link here (the icon shows once it is set)
};

// Put photos in the /public folder and write their names here, e.g. "/doctor.jpg".
// Empty "" shows a soft placeholder instead.
export const photos = {
  hero: "", // doctor, standing — used at the top of the home page
  about: "", // doctor with a patient or in clinic
  clinic: "", // operating room or clinic
  booking: "", // doctor and team
};

// Pages: `key` points to the menu word in the language files (nav.home, nav.about ...)
export const links = [
  { key: "home", to: "/" },
  { key: "about", to: "/about" },
  { key: "services", to: "/services" },
  { key: "contact", to: "/contact" },
];

// Icons, in the same order as the lists in the language files
export const serviceIcons = [FaBrain, FaUserInjured, FaBone, FaMicrochip];
export const reasonIcons = [FaUserDoctor, FaMicrochip, FaHeartPulse];

// Short codes stay in English letters in every language
export const qualificationCodes = ["MBBS", "MD", "RMP", "MCPS", "FCPS"];
export const membershipCodes = ["CPSP", "AANS", "WFNS", "PSN"];

// Add real patient reviews here (with the patient's permission).
// The "Patient stories" section only appears when this list is not empty.
// Example: { text: "Thank you for ...", name: "Ahmad K." }
export const testimonials = [];
