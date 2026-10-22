import Tag from "../components/Tag";
import Button from "../components/Button";
import { useLanguage } from "../i18n/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <section className="panel text-center">
      <Tag>{t.notFound.tag}</Tag>
      <h1 className="heading mt-6">{t.notFound.title}</h1>
      <p className="mt-4 text-gray">{t.notFound.text}</p>
      <div className="mt-10 flex justify-center">
        <Button to="/">{t.notFound.back}</Button>
      </div>
    </section>
  );
}
