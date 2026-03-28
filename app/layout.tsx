import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Carvoo",
  description: "Wir finden das passende Auto für dich.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="bg-white text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}