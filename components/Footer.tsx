export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 text-sm text-slate-600 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="font-semibold text-slate-900">Carvoo</p>
          <p className="mt-1">Auto-Suchservice für die Schweiz</p>
        </div>

        <div className="flex flex-col gap-2 md:items-end">
          <a href="mailto:info@carvoo.ch" className="hover:text-slate-900">
            info@carvoo.ch
          </a>
          <p>© 2026 Carvoo. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}