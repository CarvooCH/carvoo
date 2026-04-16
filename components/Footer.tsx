export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-10 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-slate-500 md:flex-row">

        <img src="/carvoo.png" alt="Carvoo" className="h-8 w-auto" />

        <div className="flex items-center gap-6">
          <a href="#home">Home</a>
          <a href="#service">Unser Service</a>
          <a href="#ablauf">So funktioniert’s</a>
          <a href="#anfrage">Anfrage</a>
        </div>

      </div>
    </footer>
  );
}