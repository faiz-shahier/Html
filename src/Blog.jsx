import { useState } from "react";
import { navItems, categories, blogs, footerLinks } from "./data";

export default function Blog() {
  const [active, setActive] = useState("All");
  const list = active === "All" ? blogs : blogs.filter((blog) => blog.category === active);

  return (
    <div className="bg-slate-50 text-slate-800">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
          <h2 className="text-3xl font-black text-brand">UP</h2>
          <ul className="flex gap-8 text-sm font-semibold">
            {navItems.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <button className="rounded-full bg-brand px-6 py-2 text-sm text-white">Start Learning</button>
        </div>
      </nav>

      {/* Hero */}
      <header className="bg-sky-100 py-20 text-center">
        <h1 className="text-5xl font-black">Our <span className="text-brand">Blog</span></h1>
        <p className="mt-3 text-slate-600">Explore our latest news, tutorials, and insights.</p>
      </header>

      {/* Categories */}
      <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3 p-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full border border-slate-200 px-4 py-1 text-sm ${cat === active ? "bg-brand text-white" : "bg-white"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog cards */}
      <div className="mx-auto grid max-w-5xl gap-6 px-4 pb-20 md:grid-cols-3">
        {list.map((blog) => (
          <div key={blog.id} className="overflow-hidden rounded-xl bg-white shadow-md">
            <img src={blog.image} alt={blog.title} className="h-44 w-full object-cover" />
            <div className="p-5">
              <span className="rounded-full bg-sky-100 px-2 text-xs text-brand">{blog.category}</span>
              <h3 className="mt-3 font-bold">{blog.title}</h3>
              <p className="mt-2 text-xs text-slate-500">{blog.text}</p>
              <div className="mt-5 flex justify-between text-xs">
                <span className="text-slate-500">📅 {blog.date}</span>
                <button className="rounded bg-brand px-3 py-1 text-white">Read More →</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to action */}
      <div className="mx-auto max-w-4xl rounded-2xl bg-brand p-8 text-white">
        <h3 className="text-lg font-bold">Don't wait — take the next step toward your brighter future.</h3>
        <p className="mt-2">Your journey begins with one simple action today</p>
        <button className="mt-5 rounded-full bg-white px-6 py-2 text-sm text-brand">Start Learning</button>
      </div>

      {/* Footer */}
      <footer className="mx-auto grid max-w-5xl gap-10 p-10 md:grid-cols-4">
        <p className="text-sm text-slate-600">
          Empowering Afghan Youth with Skills for a Digital Future - <b>Powered by Upskill</b>
        </p>
        {footerLinks.map((col) => (
          <div key={col.title}>
            <h4 className="font-bold">{col.title}</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {col.links.map((link) => <li key={link}>{link}</li>)}
            </ul>
          </div>
        ))}
      </footer>
    </div>
  );
}
