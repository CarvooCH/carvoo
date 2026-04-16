import Link from "next/link";

type Cta = {
  href: string;
  label: string;
};

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
};

export default function PageIntro({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
}: PageIntroProps) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-14 sm:px-6 lg:px-8 lg:pb-20 lg:pt-20">
        <span className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-900">
          {eyebrow}
        </span>
        <h1 className="mt-6 max-w-4xl text-balance text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
          {description}
        </p>

        {(primaryCta || secondaryCta) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="rounded-xl bg-gradient-to-r from-[#241ab6] via-[#5420bb] to-[#8a28c2] px-5 py-3 text-sm font-bold !text-white [text-shadow:0_1px_1px_rgba(0,0,0,0.45)] shadow-[0_10px_30px_-18px_rgba(103,41,222,0.6)] transition hover:translate-y-[-1px]"
              >
                {primaryCta.label}
              </Link>
            )}

            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
