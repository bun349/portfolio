import "./globals.css";
import Navbar from "@/components/Navbar";
import BackgroundFX from "@/components/BackgroundFX";
import BackToTopButton from "@/components/BackToTop";

export const metadata = {
  title: "Bunga Adlyna",
  description: "Software Developer Portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#030303] text-neutral-200 font-sans selection:bg-emerald-500/30 scroll-smooth">
        <BackgroundFX />
        <Navbar />
        {children}
        <footer className="max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between border-t border-neutral-900 text-xs font-mono text-neutral-600">
          <p>© 2026 BUNGA ADLYNA. DEPOK, ID.</p>
          <p className="mt-2 md:mt-0">BUILT WITH NEXT.JS & TAILWIND</p>
        </footer>
        <BackToTopButton />
      </body>
    </html>
  );
}