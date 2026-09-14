"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Briefcase, GraduationCap, Users, HeartHandshake } from "lucide-react";
import {
  SiPython, SiReact, SiNextdotjs, SiTailwindcss,
  SiPytorch, SiTensorflow, SiMysql, SiPostgresql, 
  SiNodedotjs, SiDocker, SiTypescript, SiJavascript,
  SiGithub, SiInstagram
} from "react-icons/si";

type Category = "work" | "organization" | "education";

const experienceData: Record<Category, {
  period: string;
  title: string;
  org: string;
  description: string;
  icon: React.ReactNode;
}[]> = {
  work: [
    {
      period: "Aug 2025 — Dec 2025",
      title: "AI Engineer Intern",
      org: "Pusat Inovasi Pengajaran dan Pembelajaran Universitas Padjadjaran",
      description: "Developed a Python/FastAPI AI service within a microservices architecture. Fine-tuned IndoBERT for objective evaluation and integrated Google Gemini API (RAG) for virtual patient responses. Implemented parallel processing pipelines using ElevenLabs TTS and Rhubarb Lip Sync.",
      icon: <Briefcase className="w-5 h-5" />,
    },
  ],
  organization: [
    {
      period: "Present",
      title: "Treasurer & Member of Commission III",
      org: "Student Representative Council - Informatics Student Association, UNPAD",
      description: "Managed the financial income and expenditures for the Student Representative Council. Evaluated and audited the financial reports of the Informatics Student Association to ensure transparency and accountability.",
      icon: <Users className="w-5 h-5" />,
    },
    {
      period: "Volunteer",
      title: "Fundraising Division Member",
      org: "Gemerlap Orkestra Concert UNPAD",
      description: "Spearheaded fundraising initiatives to support concert operations and served as the primary liaison and contact person for participating event tenants.",
      icon: <HeartHandshake className="w-5 h-5" />,
    },
  ],
  education: [
    {
      period: "Aug 2023 — Aug 2027 (Expected)",
      title: "Bachelor's Degree in Informatics (Teknik Informatika)",
      org: "Universitas Padjadjaran",
      description: "GPA: 3.75/4.00. Focused on AI integration, full-stack web development, scalable microservices, and translating complex technical challenges into data-driven digital experiences.",
      icon: <GraduationCap className="w-5 h-5" />,
    },
    {
      period: "Jun 2020 — Jun 2023",
      title: "High School Student",
      org: "SMAIT Nurul Fikri Depok",
      description: "Graduated with a focus on science and foundational mathematics.",
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
      className="relative flex gap-6 md:gap-8 group"
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

      {/* Konten per kategori dibatasi lebarnya dan diletakkan di tengah */}
      <div className="relative max-w-2xl mx-auto min-h-[200px]">
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