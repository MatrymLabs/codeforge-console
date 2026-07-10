import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeForge Console",
  description: "A React + TypeScript front end for the CodeForge readiness API.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav className="topnav" aria-label="Primary">
          <Link href="/">Board</Link>
          <Link href="/blueprints">Blueprints</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
