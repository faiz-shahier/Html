import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import "./i18n"; // translations (react-i18next) — must load before App
import App from "./App";
import "./index.css";
// Dari / Pashto font, served with the site (no Google Fonts needed)
import "@fontsource/vazirmatn/400.css";
import "@fontsource/vazirmatn/600.css";
import "@fontsource/vazirmatn/700.css";

// reducedMotion="user": people who turn on "reduce motion" on their device get no movement
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </BrowserRouter>
);
