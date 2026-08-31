import { personalInfo, socialLinks } from "@/data/portfolio";
import { ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 border-t border-border/50 bg-card/30">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-2xl font-bold font-mono tracking-tighter mb-2">
              <span className="text-[var(--primary)]/70">&lt;</span>Keshav <span className="text-[var(--primary)]/70">/&gt;</span>
            </span>
            <p className="text-[var(--foreground)]/60 text-sm">{personalInfo.role.split(' | ')[0]}</p>
          </div>
          
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--foreground)]/50 hover:text-[var(--primary)] transition-colors p-2"
                  aria-label={link.name}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
          
          <a
            href="#"
            className="flex items-center justify-center w-10 h-10 bg-border/50 rounded-lg text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-[var(--primary)]-foreground transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </a>
        </div>
        
        <div className="mt-8 text-center text-sm text-[var(--foreground)]/40">
          <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
