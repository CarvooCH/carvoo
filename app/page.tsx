import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrustBar from "../components/TrustBar";
import Benefits from "../components/Benefits";
import Steps from "../components/Steps";
import RequestForm from "../components/RequestForm";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <Hero />
      <TrustBar />
      <Benefits />
      <Steps />
      <RequestForm />
      <Footer />
    </main>
  );
}