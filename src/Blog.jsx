import { useState } from "react";
import { navItems, categories, blogs, socials, footerColumns } from "./data";

export default function Blog() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? blogs : blogs.filter((b) => b.category === active);

  return (
    <div className="bg-slate-50 text-slate-800">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <a href="#" className="text-3xl font-black text-brand">UP</a>
          <ul className="hidden gap-10 text-sm font-semibold md:flex">
            {navItems.map((item) => (
              <li key={item.name} className="relative">
                <a href={item.link} className="hover:text-brand">{item.name}</a>
                {item.badge && (
                  <span className="absolute -right-6 -top-4 rounded-full bg-brand px-2 py-0.5 text-[10px] text-white">
                    {item.badge}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <div className="flex gap-3">
            <a href="#" className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold">Log in</a>
            <a href="#" className="rounded-full bg-brand px-6 py-2 text-sm font-semibold text-white">Start Learning</a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-sky-100 to-sky-50 py-20 text-center">
        <h1 className="text-5xl font-black">Our <span className="text-brand">Blog</span></h1>
        <p className="mt-3 text-slate-600">Explore our latest news, tutorials, and insights.</p>
      </section>

      {/* Categories */}
      <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3 px-4 py-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full border px-4 py-1.5 text-sm ${
              cat === active ? "border-brand bg-brand text-white" : "border-slate-200 bg-white hover:text-brand"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog cards */}
      <div className="mx-auto grid max-w-5xl gap-6 px-4 pb-20 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((blog) => (
          <article key={blog.id} className="flex flex-col overflow-hidden rounded-xl bg-white shadow-md">
            <img src={blog.image} alt={blog.title} className="h-44 w-full object-cover" />
            <div className="flex flex-1 flex-col p-5">
              <span className="w-fit rounded-full bg-sky-100 px-2.5 py-0.5 text-[11px] text-brand">{blog.category}</span>
              <h2 className="mt-3 font-extrabold">{blog.title}</h2>
              <p className="mt-2 line-clamp-3 text-xs text-slate-500">{blog.excerpt}</p>
              <div className="mt-auto flex items-center justify-between pt-5">
                <span className="text-xs text-slate-500">📅 {blog.date}</span>
                <a href="#" className="rounded-md bg-brand px-3 py-1 text-xs font-semibold text-white">Read More →</a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* CTA */}
      <div className="relative z-10 mx-auto -mb-16 max-w-4xl px-4">
        <div className="rounded-2xl bg-gradient-to-r from-brand to-sky-300 p-8 text-white shadow-lg">
          <h3 className="text-lg font-bold">Don't wait — take the next step toward your brighter future.</h3>
          <p className="mt-2 font-semibold">Your journey begins with one simple action today</p>
          <a href="#" className="mt-5 inline-block rounded-full bg-white px-6 py-2 text-sm font-semibold text-brand">Start Learning</a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-sky-50 px-4 pb-10 pt-28">
        <div className="mx-auto grid max-w-6xl gap-10 rounded-2xl bg-white p-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm text-slate-600">
              Empowering Afghan Youth with Skills for a Digital Future - <b>Powered by Upskill</b>
            </p>
            <div className="mt-5 flex gap-4">
              {socials.map((s) => (
                <a key={s.name} href={s.link} className="text-sm hover:text-brand">{s.name}</a>
              ))}
            </div>
          </div>
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="font-bold">{col.title}</h4>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {col.links.map((link) => (
                  <li key={link}><a href="#" className="hover:text-brand">{link}</a></li>
                ))}
              </ul>
              {col.contact && (
                <ul className="mt-6 space-y-2 text-xs text-slate-600">
                  {col.contact.map((c) => <li key={c}>{c}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Upskill Online. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
