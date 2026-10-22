import { FaBrain } from "react-icons/fa6";
import { bio, photos } from "../data";
import Tag from "../components/Tag";
import Button from "../components/Button";
import Photo from "../components/Photo";

export default function AboutIntro({ full = false }) {
  return (
    <section className="panel grid items-center gap-14 lg:grid-cols-2">
      <div>
        <Tag>About the doctor</Tag>
        <h2 className="heading mt-6">A pioneer of neurosurgery in Afghanistan</h2>
        <div className="mt-6 space-y-4 leading-relaxed text-gray">
          {(full ? bio : bio.slice(0, 1)).map((text) => <p key={text}>{text}</p>)}
        </div>
        <div className="mt-10">
          <Button to={full ? "/contact" : "/about"}>{full ? "Schedule your visit" : "More about him"}</Button>
        </div>
      </div>

      {/* Photo with decorative orbit lines */}
      <div className="relative py-10">
        <div className="absolute left-1/2 top-1/2 h-[120%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-navy/20" />
        <Photo src={photos.about} alt="Doctor in clinic" className="relative aspect-[16/10] w-full rounded-3xl shadow-xl" />
        <span className="absolute -bottom-1 left-1/2 grid h-14 w-14 -translate-x-1/2 place-items-center rounded-full bg-white text-blue shadow-lg">
          <FaBrain />
        </span>
      </div>
    </section>
  );
}
