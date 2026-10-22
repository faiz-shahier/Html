import Tag from "../components/Tag";
import Button from "../components/Button";

export default function NotFound() {
  return (
    <section className="panel text-center">
      <Tag>Error 404</Tag>
      <h1 className="heading mt-6">This page doesn't exist</h1>
      <p className="mt-4 text-gray">The link may be old or mistyped.</p>
      <div className="mt-10 flex justify-center">
        <Button to="/">Back to home</Button>
      </div>
    </section>
  );
}
