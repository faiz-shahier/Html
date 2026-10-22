import { qualificationCodes, membershipCodes } from "../data";
import { useLanguage } from "../i18n/LanguageContext";
import Tag from "../components/Tag";
import { Reveal, Stagger, StaggerItem } from "../components/Motion";

function List({ title, codes, names }) {
  return (
    <Reveal className="rounded-3xl bg-white p-7 shadow-[0_10px_40px_-10px_rgba(22,23,92,0.12)] sm:p-10">
      <h3 className="text-lg font-semibold">{title}</h3>
      <Stagger as="ul" className="mt-4">
        {codes.map((code, i) => (
          <StaggerItem as="li" key={code} className="flex items-center gap-5 border-b border-navy/10 py-4 last:border-0">
            <span className="w-14 shrink-0 font-serif text-xl italic text-blue">{code}</span>
            <span className="text-sm text-gray">{names[i]}</span>
          </StaggerItem>
        ))}
      </Stagger>
    </Reveal>
  );
}

export default function Credentials() {
  const { t } = useLanguage();
  const c = t.credentials;
  return (
    <section className="panel bg-white shadow-sm">
      <Reveal>
        <Tag>{c.tag}</Tag>
        <h2 className="heading mt-6 max-w-xl">{c.title}</h2>
      </Reveal>
      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <List title={c.qualifications} codes={qualificationCodes} names={c.qualificationItems} />
        <List title={c.memberships} codes={membershipCodes} names={c.membershipItems} />
      </div>
    </section>
  );
}
