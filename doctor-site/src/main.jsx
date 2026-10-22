import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { LanguageProvider } from "./i18n/LanguageContext";
import App from "./App";
import "./index.css";
// Dari / Pashto font, served with the site (no Google Fonts needed)
import "@fontsource/vazirmatn/400.css";
import "@fontsource/vazirmatn/600.css";
import "@fontsource/vazirmatn/700.css";

// reducedMotion="user": people who turn on "reduce motion" on their device get no movement
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </LanguageProvider>
  </BrowserRouter>
);
