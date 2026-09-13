"use client";

import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import {
  SiPython, SiReact, SiNextdotjs, SiTailwindcss,
  SiPytorch, SiUnity, SiBlender, SiMysql, SiSupabase, SiNodedotjs
} from "react-icons/si";
import { Sparkles, Code2, Layers, BrainCircuit, Map, ArrowRight } from "lucide-react";

const techStack = [
  { name: "Python", icon: <SiPython className="w-6 h-6" /> },
  { name: "PyTorch", icon: <SiPytorch className="w-6 h-6" /> },
  { name: "React", icon: <SiReact className="w-6 h-6" /> },
  { name: "Next.js", icon: <SiNextdotjs className="w-6 h-6" /> },
  { name: "Node.js", icon: <SiNodedotjs className="w-6 h-6" /> },
  { name: "Tailwind", icon: <SiTailwindcss className="w-6 h-6" /> },
  { name: "Supabase", icon: <SiSupabase className="w-6 h-6" /> },
  { name: "MySQL", icon: <SiMysql className="w-6 h-6" /> },
  { name: "Unity", icon: <SiUnity className="w-6 h-6" /> },
  { name: "Blender", icon: <SiBlender className="w-6 h-6" /> },
];

// Project Highlight — hanya 2 proyek unggulan
const highlightedProjects = [
  {
    title: "Commulab (Tutor AI)",
    description: "Patient counseling simulator with a microservices architecture. Integrates IndoBERT, Gemini API, ElevenLabs TTS, and Rhubarb Lip Sync.",
    tech: ["REACT", "NODE.JS", "FASTAPI", "INDOBERT"],
    icon: <BrainCircuit className="w-6 h-6" />,
    // Pastikan file ini ada di folder public
    image: "/assets/projects/commulab.jpg",
  },
  {
    title: "ARAHIN (Transit Navigation)",
    description: "Public transport navigation app (SDG 11.2) with automated Docker Compose and GitHub Actions CI/CD deployment.",
    tech: ["VITE REACT", "EXPRESS", "DOCKER"],
    icon: <Map className="w-6 h-6" />,
    image: "/assets/projects/arahin.jpg",
  },
];

function HighlightCard({ project, index }: { project: typeof highlightedProjects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 6);
    rotateX.set((0.5 - py) * 6);
    glowX.set(px * 100);
    glowY.set(py * 100);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      className="group relative p-6 bg-neutral-900/30 backdrop-blur-md border border-neutral-800/80 hover:border-emerald-600/40 rounded-[2rem] transition-colors flex flex-col md:flex-row gap-8 overflow-hidden w-full items-center"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: `radial-gradient(400px circle at ${glowX.get()}% ${glowY.get()}%, rgba(16,185,129,0.10), transparent 60%)`,
        }}
      />

      {/* Wadah foto proyek */}
      <div className="w-full md:w-5/12 h-56 md:h-64 bg-neutral-950 rounded-2xl overflow-hidden border border-neutral-800 relative shrink-0 z-10 group-hover:border-blue-900/40 transition-colors">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 mix-blend-overlay group-hover:opacity-0 transition-opacity z-10"></div>
        <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-neutral-600 text-sm font-mono z-0">
          Project Screenshot
        </div>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover relative z-10 group-hover:scale-105 transition-transform duration-700"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      </div>

      <div className="w-full md:w-7/12 flex flex-col justify-center h-full relative z-10 py-2">
        <div className="flex justify-between items-start mb-4">
          <h4 className="font-bold text-2xl md:text-3xl text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-emerald-400 transition-all duration-300">
            {project.title}
          </h4>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl shrink-0 text-emerald-400 group-hover:border-emerald-500/30 transition-colors hidden md:block"
          >
            {project.icon}
          </motion.div>
        </div>

        <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-8 max-w-lg">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1.5 bg-emerald-950/20 text-emerald-400 text-[10px] md:text-xs uppercase tracking-wider font-mono font-semibold rounded-md border border-emerald-900/40 group-hover:border-emerald-500/40 group-hover:bg-emerald-950/40 transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [hoveredTech, setHoveredTech] = useState<number | null>(null);

  return (
    <>
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-48 pb-32 flex flex-col items-center text-center relative">
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          whileHover={{ scale: 1.05 }}
          className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-neutral-900 shadow-2xl shadow-emerald-500/10 mb-8 relative group"
        >
          <div className="absolute inset-0 rounded-full ring-2 ring-emerald-400/0 group-hover:ring-2 group-hover:ring-emerald-400/50 transition-all duration-500 z-10"></div>
          <div
            className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-md"
            style={{ background: "conic-gradient(from 180deg, #3b82f6, #10b981, #3b82f6)" }}
          ></div>
          <img src="/assets/profiles/profile1.jpeg" alt="Bunga Adlyna" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/50 border border-neutral-800 text-emerald-400 text-xs md:text-sm font-mono mb-8 cursor-default"
          >
            <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
              <Sparkles className="w-4 h-4" />
            </motion.span>
            Software Developer
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white mb-6">
            Bunga{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-cyan-400 to-emerald-500 bg-[length:200%_auto] animate-[gradientShift_4s_ease_infinite]">
              Adlyna.
            </span>
          </h1>

          <p className="text-base md:text-xl text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Translating abstract ideas into intelligent systems, from <span className="text-white font-medium">Machine Learning</span> engineering to <span className="text-white font-medium">Full-Stack Web</span> and <span className="text-white font-medium">Interactive 3D</span> spaces.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-sm">
            <motion.a whileHover={{ y: -2 }} href="https://github.com/bun1110" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-emerald-400 transition-colors">
              [GitHub]
            </motion.a>
            <motion.a whileHover={{ y: -2 }} href="https://instagram.com/username-kamu" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-blue-400 transition-colors">
              [Instagram]
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-5 h-9 rounded-full border-2 border-neutral-800 flex items-start justify-center p-1"
        >
          <div className="w-1 h-1 rounded-full bg-emerald-400 mt-1"></div>
        </motion.div>
      </section>

      {/* Bento Grid About Section */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 auto-rows-[250px]">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ borderColor: "rgba(16,185,129,0.4)" }}
            className="md:col-span-2 p-8 rounded-3xl bg-neutral-900/40 border border-neutral-800/60 backdrop-blur-sm flex flex-col justify-center relative overflow-hidden group transition-colors"
          >
            <motion.div
              animate={{ rotate: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity"
            >
              <Code2 className="w-32 h-32 text-blue-500" />
            </motion.div>
            <h3 className="text-xs md:text-sm font-mono text-emerald-400 mb-3 tracking-widest uppercase">Academics & Focus</h3>
            <p className="text-lg md:text-xl text-neutral-300 font-medium leading-relaxed max-w-lg relative z-10">
              <span className="text-white">Informatics Engineering student at Universitas Padjadjaran</span>, deeply focused on integrating Artificial Intelligence into production-scale software architectures.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl bg-neutral-900 border border-neutral-800/60 overflow-hidden relative group"
          >
            <img src="/profile2.jpg" alt="Workspace" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6 font-mono text-sm text-neutral-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Depok, ID
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="rounded-3xl border p-8 flex flex-col justify-center transition-all group"
            style={{
              background: "linear-gradient(135deg, rgba(59,130,246,0.06), rgba(16,185,129,0.08))",
              borderColor: "rgba(16,185,129,0.2)",
            }}
          >
            <motion.div whileHover={{ rotate: 15, scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
              <Layers className="w-8 h-8 text-emerald-400 mb-4" />
            </motion.div>
            <h3 className="text-lg font-bold text-white mb-2">Multidisciplinary</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Fluent in transitioning between building Web APIs, training Artificial Neural Networks, and assembling nodes in Blender 3D.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 rounded-3xl bg-neutral-900/40 border border-neutral-800/60 p-8 flex flex-col justify-center"
          >
            <h3 className="text-xs md:text-sm font-mono text-emerald-400 mb-6 tracking-widest uppercase">Tech Arsenal</h3>
            <div className="flex flex-wrap gap-3 md:gap-4">
              {techStack.map((tech, i) => (
                <motion.div
                  key={i}
                  onMouseEnter={() => setHoveredTech(i)}
                  onMouseLeave={() => setHoveredTech(null)}
                  whileHover={{ y: -4, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="relative flex flex-col items-center gap-2 p-3 md:p-4 bg-neutral-950/50 border border-neutral-800 hover:border-emerald-500/50 hover:text-emerald-400 text-neutral-400 rounded-2xl transition-colors cursor-crosshair"
                >
                  {tech.icon}
                  <AnimatePresence>
                    {hoveredTech === i && (
                      <motion.span
                        initial={{ opacity: 0, y: 5, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.9 }}
                        transition={{ duration: 0.15 }}
                        className="absolute -top-10 px-3 py-1.5 bg-neutral-800 text-white text-xs font-mono rounded-lg whitespace-nowrap shadow-xl z-20"
                      >
                        {tech.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* Project Highlight Section */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-emerald-400 mb-4 tracking-widest uppercase">
            Project Highlight
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Selected Works</h2>
        </motion.div>

        <div className="flex flex-col gap-8 mb-12">
          {highlightedProjects.map((project, index) => (
            <HighlightCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* View All Projects → arahin ke halaman /projects */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-neutral-800 bg-neutral-900/50 text-neutral-300 font-mono text-sm hover:text-white hover:border-emerald-500/50 transition-all duration-300 group"
            style={{
              boxShadow: "0 0 0 1px rgba(255,255,255,0.02)",
            }}
          >
            View All Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>
    </>
  );
}