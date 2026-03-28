export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Logo */}
        <a href="#home" className="flex items-center">
          <img
            src="/logo.png"
            alt="Carvoo"
            className="h-20 w-auto object-contain -my-2"
          />
        </a>

        {/* Navigation */}
        <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <a href="#home" className="hover:text-slate-900">Home</a>
          <a href="#service" className="hover:text-slate-900">Unser Service</a>
          <a href="#ablauf" className="hover:text-slate-900">So funktioniert’s</a>
          <a href="#anfrage" className="hover:text-slate-900">Anfrage</a>
        </div>

        {/* CTA */}
        <a
          href="#anfrage"
          className="rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-200 hover:scale-[1.02]"
        >
          Jetzt starten
        </a>

      </div>
    </nav>
  );
}