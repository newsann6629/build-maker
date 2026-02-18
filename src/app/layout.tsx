import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arcane Lineage Build Maker",
  description: "A premium build calculator for Arcane Lineage.",
};

import { ThemeProvider } from "@/components/ThemeContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Maitree:wght@400;700&family=Prompt:wght@300;400;600&family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
