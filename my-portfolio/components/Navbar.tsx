"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Briefcase, FolderKanban } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/experience", label: "Experience", icon: Briefcase },
  { href: "/projects", label: "Projects", icon: FolderKanban },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-2 py-2 bg-neutral-950/70 backdrop-blur-xl border border-neutral-800/80 rounded-full flex items-center gap-1 text-xs md:text-sm font-mono shadow-2xl"
      style={{
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.02), 0 8px 30px rgba(16,185,129,0.06), 0 8px 30px rgba(59,130,246,0.04)",
      }}
    >
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full transition-colors duration-300 tracking-wide z-10 ${
              isActive ? "text-white" : "text-neutral-400 hover:text-emerald-300"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="navPill"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="absolute inset-0 rounded-full -z-10"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(59,130,246,0.35), rgba(16,185,129,0.35))",
                  boxShadow:
                    "0 0 20px rgba(16,185,129,0.25), inset 0 0 0 1px rgba(255,255,255,0.08)",
                }}
              />
            )}
            <Icon className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">{link.label}</span>
          </Link>
        );
      })}
    </motion.nav>
  );
}