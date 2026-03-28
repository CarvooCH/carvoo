import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ServiceSection from "../components/ServiceSection";
import Steps from "../components/Steps";
import RequestForm from "../components/RequestForm";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <Hero />
      <ServiceSection />
      <Steps />

      <section id="anfrage" className="bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-600">
              Anfrage
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              Starte jetzt deine Anfrage
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              Beschreibe dein Wunschauto in wenigen Schritten. Wir melden uns
              persönlich bei dir und starten die Suche.
            </p>
          </div>

          <RequestForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}