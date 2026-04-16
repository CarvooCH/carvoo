import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col items-start px-5 py-24 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-700">
        404
      </p>
      <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
        Diese Seite wurde nicht gefunden.
      </h1>
      <p className="mt-4 max-w-xl leading-8 text-slate-700">
        Die angeforderte URL existiert nicht oder wurde verschoben. Über die
        Startseite findest du alle wichtigen Inhalte.
      </p>
      <Link
        href="/"
        className="mt-7 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Zur Startseite
      </Link>
    </section>
  );
}
