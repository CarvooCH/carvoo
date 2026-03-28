"use client";

import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  budget: string;
  carType: string;
  fuelType: string;
  transmission: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  budget: "30000",
  carType: "",
  fuelType: "",
  transmission: "",
  message: "",
};

export default function RequestForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function updateField(name: keyof FormState, value: string) {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  }

  function handleTextChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    updateField(name as keyof FormState, value);
  }

  function validateStep(currentStep: number) {
    if (currentStep === 1) {
      if (!form.name.trim() || !form.email.trim()) {
        setError("Bitte Name und E-Mail ausfüllen.");
        return false;
      }
    }

    if (currentStep === 2) {
      if (!form.carType || !form.fuelType || !form.transmission) {
        setError("Bitte Fahrzeugtyp, Antrieb und Getriebe auswählen.");
        return false;
      }
    }

    setError("");
    return true;
  }

  function nextStep() {
    if (!validateStep(step)) return;
    setStep((prev) => Math.min(prev + 1, 3));
  }

  function prevStep() {
    setError("");
    setStep((prev) => Math.max(prev - 1, 1));
  }

  async function sendRequest() {
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      const res = await fetch("/api/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setSuccess(true);
      setStep(1);
      setForm(initialForm);
    } catch (err) {
      console.error(err);
      setError("Etwas ist schiefgelaufen. Bitte versuche es erneut.");
    } finally {
      setLoading(false);
    }
  }

  const progressWidth =
    step === 1 ? "33.33%" : step === 2 ? "66.66%" : "100%";

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-8">
        <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">
          Kostenlos & unverbindlich
        </div>

        <h3 className="mt-4 text-2xl font-semibold text-slate-900">
          Beschreibe dein Wunschauto
        </h3>

        <p className="mt-2 text-sm text-slate-600">
          In wenigen Schritten zu deiner Anfrage.
        </p>
      </div>

      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-xs text-slate-500">
          <span className={step >= 1 ? "font-medium text-slate-900" : ""}>
            Kontakt
          </span>
          <span className={step >= 2 ? "font-medium text-slate-900" : ""}>
            Fahrzeug
          </span>
          <span className={step >= 3 ? "font-medium text-slate-900" : ""}>
            Details
          </span>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-slate-900 transition-all duration-300"
            style={{ width: progressWidth }}
          />
        </div>
      </div>

      <div className="space-y-8">
        {step === 1 && (
          <div className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleTextChange}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:ring-2 focus:ring-slate-900"
              />

              <input
                type="email"
                name="email"
                placeholder="E-Mail"
                value={form.email}
                onChange={handleTextChange}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <input
              name="phone"
              placeholder="Telefon (optional)"
              value={form.phone}
              onChange={handleTextChange}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:ring-2 focus:ring-slate-900"
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <div>
              <label className="mb-3 block text-sm font-medium text-slate-700">
                Fahrzeugtyp
              </label>

              <div className="flex gap-3 overflow-x-auto pb-2">
                {[
                  "SUV",
                  "Limousine",
                  "Kombi",
                  "Sportwagen",
                  "Elektro",
                  "Cabrio",
                ].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => updateField("carType", type)}
                    className={`whitespace-nowrap rounded-2xl border px-4 py-2 text-sm shadow-sm transition ${
                      form.carType === type
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium text-slate-700">
                Antrieb
              </label>

              <div className="flex flex-wrap gap-3">
                {["Benzin", "Diesel", "Hybrid", "Elektro"].map((fuel) => (
                  <button
                    key={fuel}
                    type="button"
                    onClick={() => updateField("fuelType", fuel)}
                    className={`rounded-2xl border px-4 py-2 text-sm shadow-sm transition ${
                      form.fuelType === fuel
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {fuel}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium text-slate-700">
                Getriebe
              </label>

              <div className="flex gap-3">
                {["Automatik", "Manuell"].map((gear) => (
                  <button
                    key={gear}
                    type="button"
                    onClick={() => updateField("transmission", gear)}
                    className={`flex-1 rounded-2xl border px-4 py-3 text-sm shadow-sm transition ${
                      form.transmission === gear
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {gear}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Budget
              </label>

              <div className="mb-3 text-lg font-semibold text-slate-900">
                {Number(form.budget).toLocaleString("de-CH")} CHF
              </div>

              <input
                type="range"
                min="5000"
                max="150000"
                step="1000"
                value={form.budget}
                onChange={(e) => updateField("budget", e.target.value)}
                className="w-full accent-slate-900"
              />

              <div className="mt-1 flex justify-between text-xs text-slate-500">
                <span>5k</span>
                <span>50k</span>
                <span>100k+</span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {["10000", "20000", "30000", "50000", "80000"].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => updateField("budget", b)}
                    className={`rounded-xl border px-3 py-1 text-xs transition ${
                      form.budget === b
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {Number(b).toLocaleString("de-CH")} CHF
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium text-slate-700">
                Weitere Wünsche
              </label>

              <textarea
                name="message"
                placeholder="Marke, Modell, maximale Kilometer, Baujahr, Ausstattung oder alles, was dir wichtig ist."
                value={form.message}
                onChange={handleTextChange}
                rows={5}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>
        )}

        {error && (
          <p className="text-center text-sm text-red-600">{error}</p>
        )}

        {success && (
          <p className="text-center text-sm text-green-600">
            Anfrage erfolgreich gesendet 🚀
          </p>
        )}

        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className={`rounded-2xl border px-5 py-3 text-sm transition ${
              step === 1
                ? "cursor-not-allowed border-slate-200 text-slate-300"
                : "border-slate-300 text-slate-700 hover:bg-slate-100"
            }`}
          >
            Zurück
          </button>

          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="rounded-2xl bg-slate-900 px-5 py-3 text-sm text-white transition hover:bg-slate-800"
            >
              Weiter
            </button>
          ) : (
            <button
              type="button"
              onClick={sendRequest}
              disabled={loading}
              className="rounded-2xl bg-slate-900 px-5 py-3 text-sm text-white transition hover:bg-slate-800 disabled:opacity-50"
            >
              {loading ? "Wird gesendet..." : "Anfrage absenden"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}