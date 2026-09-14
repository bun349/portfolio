"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import {
  BrainCircuit, Cpu, Map, Box, LineChart, ExternalLink
} from "lucide-react";
import { SiGithub } from "react-icons/si";

function ProjectCard({
  title,
  description,
  tech,
  icon,
  image,
  index,
  isFeatured = false,
  children
}: {
  title: string;
  description: string;
  tech: string[];
  icon: React.ReactNode;
  image: string;
  index: number;
  isFeatured?: boolean;
  children: React.ReactNode;
}) {
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
    rotateY.set((px - 0.5) * 8);
    rotateX.set((0.5 - py) * 8);
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
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className={`group relative p-6 bg-neutral-900/30 backdrop-blur-md border border-neutral-800/80 hover:border-emerald-600/40 rounded-3xl transition-colors flex flex-col overflow-hidden ${isFeatured ? 'md:col-span-2' : ''}`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(300px circle at ${glowX.get()}% ${glowY.get()}%, rgba(16,185,129,0.08), transparent 70%)`,
        }}
      />

      {/* Wadah foto proyek */}
      <div className={`relative z-10 w-full bg-neutral-950 rounded-2xl overflow-hidden border border-neutral-800 group-hover:border-blue-900/40 transition-colors mb-6 ${isFeatured ? 'h-64 md:h-72' : 'h-48'}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 mix-blend-overlay group-hover:opacity-0 transition-opacity z-10"></div>
        <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-neutral-600 text-xs font-mono z-0">
          Project Screenshot
        </div>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover relative z-10 group-hover:scale-105 transition-transform duration-700"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      </div>

      <div className="flex-1 flex flex-col relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl shrink-0">
            {icon}
          </div>
          <h4 className={`font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-emerald-400 transition-all duration-300 ${isFeatured ? 'text-2xl' : 'text-xl'}`}>
            {title}
          </h4>
        </div>

        <p className="text-neutral-400 text-sm leading-relaxed mb-6">{description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {tech.map((t, i) => (
            <span
              key={i}
              className="px-3 py-1.5 bg-neutral-950 text-neutral-300 text-[10px] uppercase tracking-wider font-semibold rounded-md border border-neutral-800/50 hover:border-emerald-500/50 hover:text-emerald-300 transition-colors duration-200"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Link diletakkan di bagian paling bawah */}
        <div className="mt-auto pt-4 flex flex-wrap items-center gap-5 border-t border-neutral-800/50">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 pt-40 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="inline-block px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-emerald-400 mb-4 tracking-widest uppercase">
          Archive
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">All Projects</h1>
        <p className="text-neutral-400">Implementing algorithms and system designs in real-world scenarios.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 1. Commulab */}
        <ProjectCard
          title="Commulab (Tutor AI)"
          description="A virtual patient counseling simulator built on a microservices architecture. It integrates IndoBERT, Gemini API (RAG), and real-time multimedia synchronization using ElevenLabs TTS and Rhubarb Lip Sync."
          tech={["React", "Node.js", "FastAPI", "IndoBERT"]}
          icon={<BrainCircuit className="w-5 h-5 text-emerald-400" />}
          image="/assets/project/Simulasi.png"
          index={0}
          isFeatured={true}
        >
          <a href="https://drive.google.com/file/d/1kKGo6uGm_awJIIZZogNZpLbKzPCaJsST/view?usp=sharing" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-mono text-neutral-400 hover:text-emerald-400 transition-colors group/link">
            Live Demo <ExternalLink className="w-4 h-4 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
          </a>
          <a href="https://github.com/aipsychotutor/tutor-ai-psy-backend" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-mono text-neutral-400 hover:text-white transition-colors group/link">
            Backend Repo <SiGithub className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
          </a>
          <a href="https://github.com/aipsychotutor/tutor-ai-psy-frontend" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-mono text-neutral-400 hover:text-white transition-colors group/link">
            Frontend Repo <SiGithub className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
          </a>
        </ProjectCard>

        {/* 2. ARAHIN */}
        <ProjectCard
          title="ARAHIN (Inclusive Transit)"
          description="A public transport navigation app supporting SDG 11.2 with an automated deployment architecture using Docker Compose and GitHub Actions CI/CD. Integrated with Midtrans Payment Gateway."
          tech={["React", "Express", "Docker", "CI/CD"]}
          icon={<Map className="w-5 h-5 text-blue-400" />}
          image="/assets/project/arahin.png"
          index={1}
        >
          <a href="https://frontend-arahin.vercel.app/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-mono text-neutral-400 hover:text-emerald-400 transition-colors group/link">
            Live App <ExternalLink className="w-4 h-4 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
          </a>
          <a href="https://github.com/Maritzaratnaa/PPL1-HilangArah-2026" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-mono text-neutral-400 hover:text-white transition-colors group/link">
            Source Code <SiGithub className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
          </a>
        </ProjectCard>

        {/* 3. AffectAudit */}
        <ProjectCard
          title="AffectAudit (Emotion Analysis)"
          description="A hybrid soft computing project for emotion analysis. It executes data fusion from MTCNN, EfficientNet-B0, and ResNet-50 using a Dual-Branch ANN and PyTorch ANFIS, presented through a Streamlit interface."
          tech={["PyTorch", "Python", "Streamlit", "Hugging Face"]}
          icon={<Cpu className="w-5 h-5 text-purple-400" />}
          image="/assets/project/affect.png"
          index={2}
        >
          <a href="https://emotion-intensity.streamlit.app/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-mono text-neutral-400 hover:text-emerald-400 transition-colors group/link">
            Live App <ExternalLink className="w-4 h-4 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
          </a>
          <a href="https://github.com/bun349/analisis-emosi-cnn-anfis" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-mono text-neutral-400 hover:text-white transition-colors group/link">
            Source Code <SiGithub className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
          </a>
        </ProjectCard>

        {/* 4. FuzzyGA */}
        <ProjectCard
          title="FuzzyGA Prediction"
          description="A fuel efficiency prediction system blending a Sugeno Fuzzy Inference System optimized by Genetic Algorithms and ANFIS, wrapped in an interactive Streamlit UI."
          tech={["Fuzzy Logic", "GA", "Python", "Streamlit"]}
          icon={<LineChart className="w-5 h-5 text-cyan-400" />}
          image="/assets/project/fuzzyGA.png"
          index={3}
        >
          <a href="https://prediksikeiritanbbm.streamlit.app/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-mono text-neutral-400 hover:text-emerald-400 transition-colors group/link">
            Live App <ExternalLink className="w-4 h-4 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
          </a>
          <a href="https://github.com/bun349/FuzzyGA-PrediksiKeiritanBBM" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-mono text-neutral-400 hover:text-white transition-colors group/link">
            Source Code <SiGithub className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
          </a>
        </ProjectCard>

        {/* 5. NatSense AR */}
        <ProjectCard
          title="NatSense (3D AR Simulation)"
          description="An interactive Augmented Reality (AR) exploration tool for simulation-based learning. It projects 3D environments in the real world to visualize the cause-and-effect of climate change, featuring scenarios like city floods, forest fires, and coastal storms."
          tech={["Unity", "C#", "Blender", "AR"]}
          icon={<Box className="w-5 h-5 text-emerald-400" />}
          image="/assets/project/ar.png"
          index={4}
        >
          <a href="https://youtu.be/W5Jbl3Nvkdc?si=4Q76qNkgy_KGt5Zb" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-mono text-neutral-400 hover:text-emerald-400 transition-colors group/link">
            Video Demo <ExternalLink className="w-4 h-4 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
          </a>
        </ProjectCard>

      </div>
    </section>
  );
}