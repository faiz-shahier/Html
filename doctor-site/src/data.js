// Things that are the same in every language: phone, photos, icons, short codes.
// All words are in src/i18n/en.js (English), fa.js (Dari) and ps.js (Pashto).
import { FaBrain, FaUserInjured, FaBone, FaMicrochip, FaUserDoctor, FaHeartPulse } from "react-icons/fa6";

export const contact = {
  phone: "+93 78 765 4751",
  whatsapp: "93787654751",
  facebook: "", // put the Facebook page link here (the icon shows once it is set)
};

// Photos from Unsplash (free to use, Unsplash License — https://unsplash.com/license).
// These are general medical photos, NOT photos of Dr. Zadran. Replace them with real photos of
// the doctor and the clinic when you have them: put the files in /public and write e.g. "/doctor.jpg".
// If a photo cannot load, a soft placeholder is shown instead.
const unsplash = (id, width = 1200) => `https://unsplash.com/photos/${id}/download?w=${width}`;

export const photos = {
  hero: unsplash("L2R8hKBXFak", 1400), // neurosurgeon during an endoscopic spine procedure — U.S. Navy Medicine
  about: unsplash("Wl3hAbxMF80"), // doctor examining a brain scan on a tablet — Vitaly Gariev
  clinic: unsplash("AB0r9z7eRYg", 800), // two doctors examining a brain MRI — Vitaly Gariev
  booking: unsplash("X_tBkG0U9yM"), // doctor showing a patient brain scans — Vitaly Gariev
  surgery: unsplash("-NJvNctChC8"), // surgeons in an operating room — Alexander Mass
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
