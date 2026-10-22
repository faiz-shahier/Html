import { qualifications, memberships } from "../data";
import Tag from "../components/Tag";

function List({ title, items }) {
  return (
    <div className="rounded-3xl bg-white p-7 shadow-[0_10px_40px_-10px_rgba(22,23,92,0.12)] sm:p-10">
      <h3 className="text-lg font-semibold">{title}</h3>
      <ul className="mt-4">
        {items.map((item) => (
          <li key={item.short} className="flex items-center gap-5 border-b border-navy/10 py-4 last:border-0">
            <span className="w-14 shrink-0 font-serif text-xl italic text-blue">{item.short}</span>
            <span className="text-sm text-gray">{item.full}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Credentials() {
  return (
    <section className="panel bg-white shadow-sm">
      <Tag>Credentials</Tag>
      <h2 className="heading mt-6 max-w-xl">Trained and recognised internationally</h2>
      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <List title="Qualifications" items={qualifications} />
        <List title="Memberships" items={memberships} />
      </div>
    </section>
  );
}
