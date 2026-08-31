"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";

export function About() {
  return (
    <section id="about" className="py-16 md:py-24 relative bg-[var(--background)] flex items-center">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="flex flex-col items-center text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full"
          >
            <h2 className="text-[42px] md:text-[56px] font-extrabold text-[var(--foreground)] mb-2 leading-tight">
              About <span className="text-[var(--primary)]">Me</span>
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-8">
              Full Stack Developer & Software Engineer
            </h3>
            
            <div className="text-[var(--foreground)] text-[16px] md:text-[18px] leading-relaxed space-y-4 text-justify md:text-center mx-auto bg-[var(--card)]/30 py-6 px-8 md:py-8 md:px-12 rounded-3xl border border-[var(--border)] shadow-[0_0_15px_rgba(0,238,238,0.05)]">
              {personalInfo.about.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
