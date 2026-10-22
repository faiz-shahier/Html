export default function ServiceCard({ service }) {
  const Icon = service.icon;
  return (
    <div className="group rounded-2xl bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl">
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-teal-light text-xl text-teal transition group-hover:bg-teal group-hover:text-white">
        <Icon />
      </span>
      <h3 className="mt-6 text-lg font-bold">{service.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-gray">{service.text}</p>
    </div>
  );
}
