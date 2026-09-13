"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import {
  BrainCircuit, Cpu, MessageSquare,
  Map, Box, Library, LineChart
} from "lucide-react";

const projects = [
  {
    title: "Commulab (Tutor AI)",
    description: "Simulator konseling pasien virtual dengan arsitektur microservices. Mengintegrasikan IndoBERT, Gemini API, serta sinkronisasi multimedia real-time menggunakan ElevenLabs TTS dan Rhubarb Lip Sync.",
    tech: ["React", "Node.js", "FastAPI", "IndoBERT"],
    icon: <BrainCircuit className="w-5 h-5 text-emerald-400" />,
    image: "/assets/projects/commulab.jpg",
  },
  {
    title: "Sistem Analisis Emosi Gambar",
    description: "Proyek hybrid soft computing untuk Instagram. Mengeksekusi fusi data dari MTCNN, EfficientNet-B0, dan ResNet-50 dengan Dual-Branch ANN dan PyTorch ANFIS.",
    tech: ["Python", "PyTorch", "Streamlit", "CV"],
    icon: <Cpu className="w-5 h-5 text-blue-400" />,
    image: "/assets/projects/emotion-analysis.jpg",
  },
  {
    title: "Klasifikasi Sentimen Program MBG",
    description: "Microservice FastAPI yang mendemonstrasikan proses web scraping, normalisasi teks dengan PySastrawi, dan fine-tuning model klasifikasi IndoBERT.",
    tech: ["FastAPI", "Python", "NLP"],
    icon: <MessageSquare className="w-5 h-5 text-cyan-400" />,
    image: "/assets/projects/sentiment-mbg.jpg",
  },
  {
    title: "ARAHIN (Navigasi Transit)",
    description: "Aplikasi navigasi transportasi umum (SDG 11.2) dengan arsitektur deployment otomatis menggunakan Docker Compose dan CI/CD GitHub Actions.",
    tech: ["Vite React", "Express", "Docker"],
    icon: <Map className="w-5 h-5 text-emerald-400" />,
    image: "/assets/projects/arahin.jpg",
  },
  {
    title: "Simulasi Banjir AR",
    description: "Aplikasi edukasi perubahan iklim (SDG 13.3) di Unity. Memadukan aset low-poly Blender dengan script gelombang prosedural C# dan AR Foundation.",
    tech: ["Unity", "C#", "Blender", "AR"],
    icon: <Box className="w-5 h-5 text-blue-400" />,
    image: "/assets/projects/flood-ar.jpg",
  },
  {
    title: "Kamus Kata Serapan",
    description: "Aplikasi pencarian etimologi Semantic Web. Meliputi ekstraksi data pdfplumber, ontologi RDF di Protégé, dan endpoint SPARQL di Apache Jena Fuseki.",
    tech: ["Semantic Web", "SPARQL", "RDF"],
    icon: <Library className="w-5 h-5 text-cyan-400" />,
    image: "/assets/projects/kamus-serapan.jpg",
  },
  {
    title: "FuzzyGA",
    description: "Sistem prediksi efisiensi bahan bakar yang memadukan Sugeno Fuzzy Inference System, Algoritma Genetika, dan ANFIS dalam antarmuka Streamlit.",
    tech: ["Fuzzy Logic", "GA", "Streamlit"],
    icon: <LineChart className="w-5 h-5 text-emerald-400" />,
    image: "/assets/projects/fuzzyga.jpg",
  }
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const isFeaturedLayout = index === 0;

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
      className={`group relative p-6 bg-neutral-900/30 backdrop-blur-md border border-neutral-800/80 hover:border-emerald-600/40 rounded-3xl transition-colors flex flex-col overflow-hidden ${isFeaturedLayout ? 'md:col-span-2' : ''}`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(300px circle at ${glowX.get()}% ${glowY.get()}%, rgba(16,185,129,0.08), transparent 70%)`,
        }}
      />

      {/* Wadah foto proyek */}
      <div className={`relative z-10 w-full bg-neutral-950 rounded-2xl overflow-hidden border border-neutral-800 group-hover:border-blue-900/40 transition-colors mb-6 ${isFeaturedLayout ? 'h-64 md:h-72' : 'h-44'}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 mix-blend-overlay group-hover:opacity-0 transition-opacity z-10"></div>
        <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-neutral-600 text-xs font-mono z-0">
          Project Screenshot
        </div>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover relative z-10 group-hover:scale-105 transition-transform duration-700"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      </div>

      <div className="flex-1 flex flex-col relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl shrink-0">
            {project.icon}
          </div>
          <h4 className={`font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-emerald-400 transition-all duration-300 ${isFeaturedLayout ? 'text-2xl' : 'text-lg'}`}>
            {project.title}
          </h4>
        </div>

        <p className="text-neutral-400 text-sm leading-relaxed mb-6">{project.description}</p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1.5 bg-neutral-950 text-neutral-300 text-[10px] uppercase tracking-wider font-semibold rounded-md border border-neutral-800/50 hover:border-emerald-500/50 hover:text-emerald-300 transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
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
        <p className="text-neutral-400">Implementasi algoritma dan desain sistem dalam kasus dunia nyata.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}