export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="text-2xl font-bold tracking-tight">Carvoo</div>

        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#vorteile"
            className="text-sm text-slate-600 hover:text-slate-900"
          >
            Vorteile
          </a>
          <a
            href="#ablauf"
            className="text-sm text-slate-600 hover:text-slate-900"
          >
            Ablauf
          </a>
          <a
            href="#anfrage"
            className="text-sm text-slate-600 hover:text-slate-900"
          >
            Anfrage
          </a>
        </div>
      </div>
    </nav>
  );
}