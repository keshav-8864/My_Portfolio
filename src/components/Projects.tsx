"use client";

import { motion } from "framer-motion";
import { featuredProjects } from "@/data/portfolio";
import { SectionHeading } from "./SectionHeading";
import { ExternalLink, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "./icons";

export function Projects() {
  return (
    <section id="projects" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionHeading>Featured Projects</SectionHeading>
        
        <div className="space-y-24 mt-16">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: typeof featuredProjects[0], index: number }) {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 lg:gap-16 items-center`}
    >
      <div className="w-full lg:w-1/2 relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-[var(--primary)]/50 to-[var(--primary)]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative aspect-video bg-[var(--card)]/80 backdrop-blur-sm border border-[var(--border)] rounded-2xl overflow-hidden flex items-center justify-center">
          {/* Fallback for no image - creating a beautiful gradient/pattern instead */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--background)] via-[var(--card)] to-[var(--primary)]/10 opacity-80"></div>
          <h3 className="relative z-10 text-2xl md:text-3xl font-extrabold text-[var(--foreground)]/20 uppercase tracking-widest text-center px-4">
            {project.title.split(' — ')[0]}
          </h3>
        </div>
      </div>
      
      <div className="w-full lg:w-1/2 space-y-6">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-[var(--primary)] transition-colors">
            {project.title}
          </h3>
          <p className="text-[var(--foreground)]/70 text-lg leading-relaxed">
            {project.description}
          </p>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--foreground)]/50 mb-3">Key Features</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {project.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-[var(--foreground)]">
                <CheckCircle2 size={16} className="text-[var(--primary)] mt-0.5 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex flex-wrap gap-2 pt-2">
          {project.technologies.map((tech) => (
            <span key={tech} className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-medium rounded-full">
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-4 pt-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[var(--card)] border border-[var(--border)] rounded-lg text-[var(--foreground)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors"
            >
              <GithubIcon size={18} />
              <span>Source</span>
            </a>
          )}
          <a
            href={project.liveDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-[var(--primary)] text-[var(--background)] rounded-lg text-sm font-bold shadow-[0_0_10px_var(--primary)] hover:shadow-[0_0_20px_var(--primary)] transition-all duration-300"
          >
            <ExternalLink size={18} /> Live Demo
          </a>
        </div>
      </div>
    </motion.div>
  );
}
