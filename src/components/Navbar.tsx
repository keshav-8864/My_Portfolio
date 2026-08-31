"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Skill", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Resume", href: "#resume" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navLinks.map((link) => link.href.substring(1));
      let currentActive = "";
      
      if (window.scrollY < 200) {
        currentActive = "";
      } else {
        for (const section of sections) {
          if (!section) continue;
          
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 250 && rect.bottom >= 250) {
              currentActive = section;
            }
          }
        }
      }

      if (currentActive !== activeSection) {
        setActiveSection(currentActive);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 w-full z-100 transition-all duration-500",
        isScrolled
          ? "bg-[var(--background)]/80 backdrop-blur-xl border-b border-[var(--border)] py-4 shadow-2xl"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between w-full">
        <motion.a 
          href="#" 
          className="text-3xl text-[var(--foreground)] font-extrabold tracking-tight cursor-pointer"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Portfolio<span className="text-[var(--primary)]">.</span>
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {navLinks.map((link, i) => {
            const sectionId = link.href.substring(1);
            const isActive = activeSection === sectionId;
            
            return (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (i + 1), ease: "easeOut" }}
                className={cn(
                  "relative px-4 py-2 text-base font-medium transition-all duration-300 group",
                  isActive ? "text-[var(--primary)]" : "text-[var(--foreground)] hover:text-[var(--primary)]"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute left-1/2 bottom-0 h-0.5 bg-[var(--primary)] transition-all duration-300 rounded-full shadow-[0_0_20px_var(--primary)]",
                  isActive ? "w-1/2 left-1/4" : "w-0 group-hover:w-1/2 group-hover:left-1/4"
                )}></span>
              </motion.a>
            );
          })}
        </nav>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden relative z-50 p-2 text-[var(--foreground)]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 left-0 right-0 h-screen bg-[var(--background)] flex flex-col items-center justify-center space-y-6 z-40 md:hidden"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="text-3xl font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
