// All text and pictures on the website live in this file.
import { FaBrain, FaUserInjured, FaBone, FaMicrochip, FaUserDoctor, FaHeartPulse } from "react-icons/fa6";

export const doctor = {
  name: "Dr. Khalid Khan Zadran",
  title: "Consultant Neurosurgeon",
  specialty: "Brain & Spine Surgeon",
  hospital: "Rifah Medical Complex",
  city: "Kabul, Afghanistan",
  phone: "+93 78 765 4751",
  whatsapp: "93787654751",
  facebook: "#", // put the Facebook page link here
};

// Put photos in the /public folder and write their names here, e.g. "/doctor.jpg".
// Empty "" shows a soft placeholder instead.
export const photos = {
  hero: "", // doctor, standing — used at the top of the home page
  about: "", // doctor with a patient or in clinic
  clinic: "", // operating room or clinic
  booking: "", // doctor and team
};

export const links = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Services", to: "/services" },
  { name: "Contact", to: "/contact" },
];

export const bio = [
  "Dr. Khalid Khan Zadran is a Consultant Neurosurgeon and Brain & Spine Surgeon based in Kabul. He is widely recognised as the first neurosurgeon from Afghanistan to earn the Fellowship of the College of Physicians and Surgeons Pakistan (FCPS) in Neurosurgery.",
  "His clinical and research background spans Afghanistan and Pakistan. Today he provides advanced neurological care at the Rifah Medical Complex, bringing modern surgical technology to patients with brain and spine conditions.",
];

export const services = [
  { icon: FaBrain, title: "Brain Disorders", text: "Diagnosis and surgical care for conditions of the brain, informed by ongoing brain-disorder research." },
  { icon: FaUserInjured, title: "Complex Neurotrauma", text: "Management of serious head and spinal injuries, from emergency assessment to recovery." },
  { icon: FaBone, title: "Spinal Interventions", text: "Surgical and interventional treatment for spinal conditions to relieve pain and protect function." },
  { icon: FaMicrochip, title: "Modern Surgical Technology", text: "Current surgical techniques and technology for neurological treatment in Afghanistan." },
];

export const reasons = [
  { icon: FaUserDoctor, title: "FCPS-trained neurosurgeon" },
  { icon: FaMicrochip, title: "Modern surgical technology" },
  { icon: FaHeartPulse, title: "Care from diagnosis to recovery" },
];

export const qualifications = [
  { short: "MBBS", full: "Bachelor of Medicine, Bachelor of Surgery" },
  { short: "MD", full: "Doctor of Medicine" },
  { short: "RMP", full: "Registered Medical Practitioner" },
  { short: "MCPS", full: "Member, College of Physicians and Surgeons Pakistan" },
  { short: "FCPS", full: "Fellow, College of Physicians and Surgeons Pakistan (Neurosurgery)" },
];

export const memberships = [
  { short: "CPSP", full: "College of Physicians and Surgeons Pakistan (Fellow)" },
  { short: "AANS", full: "American Association of Neurological Surgeons" },
  { short: "WFNS", full: "World Federation of Neurosurgical Societies" },
  { short: "PSN", full: "Pakistan Society of Neurosurgeons" },
];

// Add real patient reviews here (with the patient's permission).
// The "Patient stories" section only appears when this list is not empty.
// Example: { text: "Thank you for ...", name: "Ahmad K." }
export const testimonials = [];

export const visitReasons = ["Brain condition", "Spine / back problem", "Head or spine injury", "Second opinion", "Other"];
