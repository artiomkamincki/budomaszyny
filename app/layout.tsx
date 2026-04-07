import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "BudoMaszyny — Wynajem maszyn budowlanych w Polsce",
  description:
    "Znajdź maszynę budowlaną w 5 minut. Koparki, dźwigi, ładowarki — szybko, bez pośredników. Dla firm budowlanych w całej Polsce.",
  keywords: [
    "wynajem maszyn budowlanych",
    "wynajem koparki",
    "wynajem dźwigu",
    "wynajem ładowarki",
    "maszyny budowlane Warszawa",
    "wynajem sprzętu budowlanego",
  ],
  openGraph: {
    title: "BudoMaszyny — Wynajem maszyn budowlanych",
    description: "Znajdź maszynę budowlaną w 5 minut.",
    locale: "pl_PL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
