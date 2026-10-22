import { bio, qualifications, memberships } from "../data";
import Title from "../components/Title";
import BookingBanner from "../components/BookingBanner";

function List({ title, items }) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-widest text-white/50">{title}</h3>
      <ul className="mt-5 divide-y divide-white/10 border-y border-white/10">
        {items.map((item) => (
          <li key={item.short} className="flex items-center gap-5 py-4">
            <span className="w-16 shrink-0 font-display text-xl text-gold">{item.short}</span>
            <span className="text-sm text-white/80">{item.full}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function About() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-20 lg:grid-cols-2">
        <Title small="About the doctor" title="A pioneer of neurosurgery in Afghanistan" />
        <div className="space-y-5 text-lg leading-relaxed text-gray">
          {bio.map((text) => <p key={text}>{text}</p>)}
        </div>
      </section>

      <section className="bg-navy py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Title light small="Credentials" title="Trained and recognised internationally" />
          <div className="mt-12 grid gap-12 lg:grid-cols-2">
            <List title="Qualifications" items={qualifications} />
            <List title="Memberships" items={memberships} />
          </div>
        </div>
      </section>

      <BookingBanner />
    </>
  );
}
