// All text on the website lives in this file.
import { FaBrain, FaUserInjured, FaBone, FaMicrochip } from "react-icons/fa6";

export const doctor = {
  name: "Dr. Khalid Khan Zadran",
  title: "Consultant Neurosurgeon",
  specialty: "Brain & Spine Surgeon",
  hospital: "Rifah Medical Complex",
  city: "Kabul, Afghanistan",
  phone: "+93 78 765 4751",
  whatsapp: "93787654751",
  facebook: "#", // put the Facebook page link here
  photo: "", // put the photo in /public and write its name here, e.g. "/doctor.jpg"
};

export const links = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Services", to: "/services" },
  { name: "Contact", to: "/contact" },
];

export const badges = ["FCPS Neurosurgery", "AANS Member", "WFNS Member"];

export const facts = [
  { value: "FCPS", label: "Fellowship in Neurosurgery" },
  { value: "4", label: "Professional societies" },
  { value: "2", label: "Countries of practice & research" },
  { value: "Kabul", label: "Rifah Medical Complex" },
];

export const bio = [
  "Dr. Khalid Khan Zadran is a Consultant Neurosurgeon and Brain & Spine Surgeon based in Kabul. He is widely recognised as the first neurosurgeon from Afghanistan to earn the Fellowship of the College of Physicians and Surgeons Pakistan (FCPS) in Neurosurgery.",
  "His clinical and research background spans Afghanistan and Pakistan. Today he provides advanced neurological care at the Rifah Medical Complex, bringing modern surgical technology to patients with brain and spine conditions.",
];

export const services = [
  { icon: FaBrain, title: "Brain disorders", text: "Diagnosis and surgical care for conditions of the brain, informed by ongoing brain-disorder research." },
  { icon: FaUserInjured, title: "Complex neurotrauma", text: "Management of serious head and spinal injuries, from emergency assessment to recovery." },
  { icon: FaBone, title: "Spinal interventions", text: "Surgical and interventional treatment for spinal conditions to relieve pain and protect function." },
  { icon: FaMicrochip, title: "Modern surgical technology", text: "Bringing current surgical techniques and technology to neurological treatment in Afghanistan." },
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

export const steps = [
  { title: "Book a consultation", text: "Call or send a WhatsApp message to choose a time." },
  { title: "Assessment & imaging", text: "Bring your MRI, CT scans and reports for a full review." },
  { title: "Treatment plan", text: "Get a clear explanation of your options, with or without surgery." },
  { title: "Surgery & follow-up", text: "If surgery is needed, care continues through recovery." },
];

export const reasons = ["Brain condition", "Spine / back problem", "Head or spine injury", "Second opinion", "Other"];
