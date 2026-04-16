# Carvoo Website

Mehrseitige Next.js Website fuer den Carvoo Auto-Suchservice in der Schweiz.

## Lokal starten

```bash
npm install
npm run dev -- --port 3001
```

Optional fuer geschuetzten Zugriff auf die Projektzentrale in `.env.local`:

```bash
PROJEKTZENTRALE_USER=admin
PROJEKTZENTRALE_PASS=dein-sicheres-passwort
```

## Production Build pruefen

```bash
npm run lint
npm run build
npm run start -- --port 3001
```

## Seitenstruktur

- `/` Startseite mit Value Proposition und CTA-Fokus
- `/leistungen` Leistungsuebersicht
- `/ablauf` Prozessseite
- `/ueber-uns` Positionierung und Mission
- `/faq` Haeufige Fragen mit FAQ-Structured-Data
- `/kontakt` Kontaktseite fuer allgemeine Fragen
- `/anfrage` Leadseite mit Multi-Step Formular
- `/projektzentrale` Interne Lead-Pipeline zur Bearbeitung

## SEO-Bausteine

- Zentrale Metadaten-Helfer in `lib/site.ts`
- Seitenspezifische Titles/Descriptions/Canonical pro Route
- Open Graph / Twitter Meta
- Strukturierte Daten in Layout + FAQ/Service
- `app/robots.ts`
- `app/sitemap.ts`

## Lead API

Die Anfrage wird ueber `app/api/request/route.ts` verarbeitet und per Resend an `info@carvoo.ch` gesendet.
Allgemeine Fragen werden ueber `app/api/contact/route.ts` verarbeitet und ebenfalls an `info@carvoo.ch` versendet.

## Lead-Management

- Alle neuen Formular-Eingaenge werden in `data/leads.json` gespeichert
- Formular-Vorgaben werden in `data/form-briefing.json` gespeichert
- Interne Bearbeitung in `/projektzentrale`
- Pipeline: `neu` -> `kontaktiert` -> `qualifiziert` -> `in_bearbeitung` -> `abgeschlossen` / `verloren`
- Pro Lead lassen sich Status, Prioritaet, Zustaendigkeit, Follow-up-Datum und Notizen pflegen
- In der Projektzentrale gibt es ein 2-Spalten-Briefing fuer `Suchanfrage-Formular` und `Kontaktformular`
- Zugriffsschutz fuer `/projektzentrale` und `/api/leads` ueber Basic Auth (wenn Env-Variablen gesetzt sind)
