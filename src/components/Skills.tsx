"use client";

import { motion } from "framer-motion";
import { Code2, Box, Globe, Database } from "lucide-react";

export function Skills() {
  return (
    <section id="skills" className="py-16 md:py-32 bg-[var(--background)]">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-center text-[var(--foreground)] mb-16 md:mb-20"
        >
          My <span className="text-[var(--primary)]">Skills</span>
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Technical Skills */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-[var(--foreground)] inline-block relative">
                Technical Skills
                <span className="absolute -bottom-3 left-0 w-full h-[2px] bg-[var(--foreground)]"></span>
              </h3>
            </div>
            
            <div className="space-y-6 mt-8">
              <TechnicalSkillBar name="HTML5" percentage={90} icon={Globe} />
              <TechnicalSkillBar name="CSS3 / Tailwind" percentage={85} icon={Box} />
              <TechnicalSkillBar name="JavaScript / TS" percentage={90} icon={Code2} />
              <TechnicalSkillBar name="React / Next.js" percentage={80} icon={Globe} />
              <TechnicalSkillBar name="Node.js / Express" percentage={85} icon={Database} />
            </div>
          </motion.div>
          
          {/* Right Column: Professional Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-[var(--foreground)] inline-block relative">
                Professional Skills
                <span className="absolute -bottom-3 left-0 w-full h-[2px] bg-[var(--foreground)]"></span>
              </h3>
            </div>
            
            <div className="grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-2 gap-y-12 gap-x-4 mt-12">
              <ProfessionalSkillCircle name="Creativity" percentage={90} />
              <ProfessionalSkillCircle name="Communication" percentage={80} />
              <ProfessionalSkillCircle name="Problem Solving" percentage={90} />
              <ProfessionalSkillCircle name="Teamwork" percentage={85} />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function TechnicalSkillBar({ name, percentage, icon: Icon }: { name: string, percentage: number, icon: React.ComponentType<{ size?: number; className?: string }> }) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-2">
        <div className="flex items-center gap-3 text-[var(--foreground)]">
          <Icon size={20} className="text-[var(--primary)]" />
          <span className="font-semibold text-lg">{name}</span>
        </div>
        <span className="text-[var(--foreground)] text-sm font-bold">{percentage}%</span>
      </div>
      <div className="w-full h-3 bg-[var(--foreground)]/10 rounded-full overflow-hidden border border-[var(--border)]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="h-full bg-[var(--primary)] shadow-[0_0_20px_var(--primary)]"
        />
      </div>
    </div>
  );
}

function ProfessionalSkillCircle({ name, percentage }: { name: string, percentage: number }) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-[150px] h-[150px] flex items-center justify-center mb-6">
        {/* Background track circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="75"
            cy="75"
            r={radius}
            stroke="rgba(0,0,0,0.4)"
            strokeWidth="12"
            fill="none"
          />
          {/* Progress stroke circle */}
          <motion.circle
            cx="75"
            cy="75"
            r={radius}
            stroke="var(--primary)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            style={{ strokeDasharray: circumference }}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
            className="drop-shadow-[0_0_20px_var(--primary)]"
          />
        </svg>
        <span className="absolute text-[var(--foreground)] font-bold text-2xl">{percentage}%</span>
      </div>
      <span className="text-[var(--foreground)] font-semibold text-lg text-center">{name}</span>
    </div>
  );
}
