"use client";

import { motion, useMotionValue, useSpring, useScroll } from "framer-motion";
import { useEffect } from "react";

export default function BackgroundFX() {
  const { scrollYProgress } = useScroll();

  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const springX = useSpring(cursorX, { stiffness: 60, damping: 25 });
  const springY = useSpring(cursorY, { stiffness: 60, damping: 25 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 origin-left z-[60]"
      />

      {/* Cursor glow (biru → hijau) */}
      <motion.div
        className="pointer-events-none fixed w-[200px] h-[200px] rounded-full z-0"
        style={{
          left: springX,
          top: springY,
          x: "-50%",
          y: "-50%",
          background:
            "radial-gradient(circle, rgba(16,185,129,0.10), rgba(59,130,246,0.06) 55%, transparent 75%)",
        }}
      />

      {/* Grid + blur orbs */}
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        <motion.div
          animate={{ opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[10%] right-0 top-0 -z-10 h-[320px] w-[320px] rounded-full bg-blue-500 opacity-[0.12] blur-[110px]"
        />
        <motion.div
          animate={{ opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute right-[10%] left-0 top-10 -z-10 m-auto h-[300px] w-[300px] rounded-full bg-emerald-500 opacity-20 blur-[100px]"
        />
      </div>
    </>
  );
}