"use client";

import { FormEvent, useState } from "react";

export default function RequestForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    car: "",
    vehicleType: "",
    transmission: "",
    drivetrain: "",
    yearFrom: "",
    maxMileage: "",
    requirements: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unbekannter Fehler");
      }

      setSuccessMessage(
        `Danke ${formData.name || "dir"}! Deine Anfrage wurde erfolgreich gesendet.`
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        budget: "",
        car: "",
        vehicleType: "",
        transmission: "",
        drivetrain: "",
        yearFrom: "",
        maxMileage: "",
        requirements: "",
      });
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Beim Absenden ist ein Fehler aufgetreten."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="anfrage" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Anfrage
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Beschreibe dein Wunschauto
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
            Je genauer deine Angaben sind, desto besser kann Carvoo passende
            Fahrzeuge vorsortieren und dir gezielte Vorschläge liefern.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
        >
          <div className="grid gap-6">

            <div className="grid gap-6 md:grid-cols-2">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="input"
                required
              />

              <input
                type="email"
                placeholder="E-Mail"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="input"
                required
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <input
                type="text"
                placeholder="Telefon (+41 ...)"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="input"
              />

              <input
                type="text"
                placeholder="Budget (z. B. 25’000 CHF)"
                value={formData.budget}
                onChange={(e) =>
                  setFormData({ ...formData, budget: e.target.value })
                }
                className="input"
                required
              />
            </div>

            <input
              type="text"
              placeholder="Wunschauto / Modell"
              value={formData.car}
              onChange={(e) =>
                setFormData({ ...formData, car: e.target.value })
              }
              className="input"
            />

            <div className="grid gap-6 md:grid-cols-3">
              <select
                value={formData.vehicleType}
                onChange={(e) =>
                  setFormData({ ...formData, vehicleType: e.target.value })
                }
                className="input"
              >
                <option value="">Fahrzeugtyp</option>
                <option>SUV</option>
                <option>Kombi</option>
                <option>Limousine</option>
                <option>Kleinwagen</option>
              </select>

              <select
                value={formData.transmission}
                onChange={(e) =>
                  setFormData({ ...formData, transmission: e.target.value })
                }
                className="input"
              >
                <option value="">Getriebe</option>
                <option>Automatik</option>
                <option>Manuell</option>
              </select>

              <select
                value={formData.drivetrain}
                onChange={(e) =>
                  setFormData({ ...formData, drivetrain: e.target.value })
                }
                className="input"
              >
                <option value="">Antrieb</option>
                <option>Allrad</option>
                <option>Front</option>
                <option>Heck</option>
              </select>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <input
                type="text"
                placeholder="Jahrgang ab"
                value={formData.yearFrom}
                onChange={(e) =>
                  setFormData({ ...formData, yearFrom: e.target.value })
                }
                className="input"
              />

              <input
                type="text"
                placeholder="Max. Kilometer"
                value={formData.maxMileage}
                onChange={(e) =>
                  setFormData({ ...formData, maxMileage: e.target.value })
                }
                className="input"
              />
            </div>

            <textarea
              placeholder="Weitere Anforderungen"
              value={formData.requirements}
              onChange={(e) =>
                setFormData({ ...formData, requirements: e.target.value })
              }
              className="input"
              rows={4}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-2xl bg-slate-900 px-6 py-3 text-white"
            >
              {isSubmitting ? "Wird gesendet..." : "Anfrage absenden"}
            </button>

            {successMessage && <p className="text-green-600">{successMessage}</p>}
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}

          </div>
        </form>
      </div>
    </section>
  );
}