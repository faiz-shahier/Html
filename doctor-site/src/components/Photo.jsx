import { FaImage } from "react-icons/fa6";

// Shows the photo, or a soft placeholder when no photo is set yet
export default function Photo({ src, alt, className = "" }) {
  if (src) return <img src={src} alt={alt} className={`object-cover ${className}`} />;

  return (
    <div className={`grid place-items-center bg-gradient-to-br from-lavender-light to-lavender text-white ${className}`}>
      <div className="text-center">
        <FaImage className="mx-auto text-4xl opacity-80" />
        <p className="mt-2 text-xs font-medium uppercase tracking-widest opacity-80">{alt}</p>
      </div>
    </div>
  );
}
