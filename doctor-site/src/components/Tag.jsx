// Small "# LABEL" pill above each heading
export default function Tag({ children }) {
  return (
    <span className="inline-block rounded-full border border-navy/10 bg-white px-3 py-1 text-[11px] font-bold uppercase">
      # {children}
    </span>
  );
}
