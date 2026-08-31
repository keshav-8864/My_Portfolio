"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const resumeData = [
  {
    id: 1,
    type: "EDUCATION",
    date: "10/2023 – Present",
    title: "B.Tech in Computer Science and Engineering",
    subtitle: "JSS Academy of Technical Education, Noida · CGPA: 7.87",
    description: "Strong foundation in Data Structures and Algorithms with 200+ problems solved on LeetCode. Passionate about writing clean, efficient code and building scalable full-stack applications.",
  },
  {
    id: 2,
    type: "EDUCATION",
    date: "04/2021 – 05/2022",
    title: "Class XII (PCM)",
    subtitle: "A J V Int. Coll., Bewar, Mainpuri · Percentage: 82.6%",
    description: "Completed higher secondary education with a focus on Physics, Chemistry, and Mathematics.",
  }
];

export function Resume() {
  return (
    <section id="resume" className="py-20 md:py-32 bg-[var(--background)] relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20">
          
          {/* Left Column - Sticky */}
          <div className="md:w-1/3">
            <div className="sticky top-32">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--foreground)]/60 mb-4"
              >
                Journey
              </motion.p>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold text-[var(--foreground)] leading-tight mb-6"
              >
                My <br />
                <span className="text-[var(--primary)]">Education.</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-[var(--foreground)]/70 text-lg leading-relaxed mb-8"
              >
                A timeline of my academic background and educational journey.
              </motion.p>
              
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                href="/resume.pdf" // Adjust this to point to the actual resume file path
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-[var(--border)] rounded-lg text-[var(--foreground)] font-medium hover:bg-[var(--card)] hover:border-[var(--primary)]/50 transition-all duration-300"
              >
                Download Full Resume
              </motion.a>
            </div>
          </div>
          
          {/* Right Column - Timeline */}
          <div className="md:w-2/3">
            <div className="relative border-l border-[var(--primary)]/30 ml-3 md:ml-0 md:pl-10 pb-4">
              {resumeData.map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="relative mb-16 pl-8 md:pl-0"
                >
                  {/* Timeline Dot */}
                  <div className="absolute w-4 h-4 rounded-full bg-[var(--primary)] border-4 border-[var(--background)] -left-[11.5px] md:-left-[48.5px] top-1.5 shadow-[0_0_10px_var(--primary)] z-10" />
                  
                  <div className="flex flex-wrap items-center gap-4 mb-3">
                    <span className="px-3 py-1 rounded-full border border-[var(--border)] text-xs font-bold tracking-wider text-[var(--foreground)]/80 bg-[var(--card)]/50">
                      {item.type}
                    </span>
                    <span className="text-sm text-[var(--foreground)]/50 font-mono">
                      {item.date}
                    </span>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-[var(--foreground)] mb-2">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center gap-1 text-sm md:text-base font-semibold text-[var(--primary)] mb-4">
                    <span>{item.subtitle}</span>
                    <ArrowUpRight size={16} />
                  </div>
                  
                  <p className="text-[var(--foreground)]/70 leading-relaxed text-sm md:text-base">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
