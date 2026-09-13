"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Briefcase, GraduationCap, Trophy, Users, HeartHandshake } from "lucide-react";

type Category = "work" | "organization" | "education";

// TODO: Ganti dengan pengalaman asli kamu
const experienceData: Record<Category, {
  period: string;
  title: string;
  org: string;
  description: string;
  icon: React.ReactNode;
}[]> = {
  work: [
    {
      period: "2024 — 2025",
      title: "Machine Learning Intern",
      org: "TODO: Company Name",
      description: "TODO: Describe your role — e.g. built and fine-tuned NLP/CV models, deployed microservices, collaborated with cross-functional teams.",
      icon: <Briefcase className="w-5 h-5" />,
    },
  ],
  organization: [
    {
      period: "2023 — 2024",
      title: "Organization / Community Role",
      org: "TODO: Organization Name",
      description: "TODO: Describe your responsibilities and impact within the organization or student community.",
      icon: <Users className="w-5 h-5" />,
    },
    {
      period: "2023",
      title: "Volunteer Role",
      org: "TODO: Volunteer Program Name",
      description: "TODO: Describe your volunteer activities and contribution to the initiative.",
      icon: <HeartHandshake className="w-5 h-5" />,
    },
    {
      period: "2023",
      title: "Hackathon / Competition Achievement",
      org: "TODO: Event Name",
      description: "TODO: Describe the competition, your team's project, and the outcome or award received.",
      icon: <Trophy className="w-5 h-5" />,
    },
  ],
  education: [
    {
      period: "2024 — Present",
      title: "Informatics Engineering Student",
      org: "Universitas Padjadjaran",
      description: "Focused on Artificial Intelligence, software architecture, and production-scale system design across ML and full-stack projects.",
      icon: <GraduationCap className="w-5 h-5" />,
    },
  ],
};

const tabs: { id: Category; label: string; icon: React.ReactNode }[] = [
  { id: "work", label: "Work", icon: <Briefcase className="w-4 h-4" /> },
  { id: "organization", label: "Organization & Volunteer", icon: <Users className="w-4 h-4" /> },
  { id: "education", label: "Education", icon: <GraduationCap className="w-4 h-4" /> },
];

function ExperienceCard({ exp, index, isLast }: { exp: typeof experienceData["work"][0]; index: number; isLast: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
      className="relative flex gap-6 group"
    >
      <div className="flex flex-col items-center shrink-0">
        <motion.div
          whileHover={{ scale: 1.15 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="w-11 h-11 rounded-full bg-neutral-950 border border-neutral-800 group-hover:border-emerald-500/60 flex items-center justify-center text-blue-400 group-hover:text-emerald-400 transition-colors relative z-10 shadow-lg"
          style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.08), rgba(16,185,129,0.08))" }}
        >
          {exp.icon}
        </motion.div>
        {!isLast && <div className="w-px flex-1 bg-gradient-to-b from-blue-500/40 via-neutral-800 to-transparent mt-2"></div>}
      </div>

      <div className="pb-12 flex-1">
        <span className="inline-block px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-emerald-400 mb-3 tracking-wide">
          {exp.period}
        </span>
        <h4 className="text-lg md:text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-emerald-400 transition-all duration-300 mb-1">
          {exp.title}
        </h4>
        <p className="text-sm font-mono text-neutral-500 mb-3">{exp.org}</p>
        <p className="text-neutral-400 text-sm leading-relaxed max-w-xl">{exp.description}</p>
      </div>
    </motion.div>
  );
}

export default function ExperiencePage() {
  const [activeTab, setActiveTab] = useState<Category>("work");
  const activeList = experienceData[activeTab];

  return (
    <section className="max-w-4xl mx-auto px-6 pt-40 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <span className="inline-block px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-emerald-400 mb-4 tracking-widest uppercase">
          Journey
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Experience</h1>
        <p className="text-neutral-400 text-sm md:text-base">A timeline of academics, roles, and milestones.</p>
      </motion.div>

      {/* Tab Switcher */}
      <div className="flex flex-wrap justify-center gap-2 mb-16">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs md:text-sm transition-colors duration-300 border ${
                isActive
                  ? "text-white border-transparent"
                  : "text-neutral-400 border-neutral-800 hover:text-emerald-300 hover:border-neutral-700"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="experienceTabPill"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="absolute inset-0 rounded-full -z-10"
                  style={{
                    background: "linear-gradient(135deg, rgba(59,130,246,0.35), rgba(16,185,129,0.35))",
                    boxShadow: "0 0 20px rgba(16,185,129,0.2), inset 0 0 0 1px rgba(255,255,255,0.08)",
                  }}
                />
              )}
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Konten per kategori */}
      <div className="relative pl-2 md:pl-0 min-h-[200px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {activeList.length > 0 ? (
              activeList.map((exp, index) => (
                <ExperienceCard key={index} exp={exp} index={index} isLast={index === activeList.length - 1} />
              ))
            ) : (
              <p className="text-neutral-500 text-sm font-mono text-center py-12">No entries yet.</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}