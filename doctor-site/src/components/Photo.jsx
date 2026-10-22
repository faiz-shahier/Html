import { useState } from "react";
import { FaImage } from "react-icons/fa6";

// Shows the photo, or a soft placeholder when there is no photo or it cannot load
export default function Photo({ src, alt, className = "", eager = false }) {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        onError={() => setFailed(true)}
        className={`bg-lavender-light object-cover ${className}`}
      />
    );
  }

  return (
    <div className={`grid place-items-center bg-gradient-to-br from-lavender-light to-lavender text-white ${className}`}>
      <div className="text-center">
        <FaImage className="mx-auto text-4xl opacity-80" />
        <p className="mt-2 text-xs font-medium uppercase tracking-widest opacity-80">{alt}</p>
      </div>
    </div>
  );
}
