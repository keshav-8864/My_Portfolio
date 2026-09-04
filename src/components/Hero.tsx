"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { personalInfo, socialLinks } from "@/data/portfolio";

function useTypewriter(words: string[], typingSpeed = 100, deletingSpeed = 50, pauseTime = 1500) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setText(currentWord.substring(0, text.length - 1));
        if (text.length <= 1) { // When almost deleted, switch to next word
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }, deletingSpeed);
    } else {
      timeout = setTimeout(() => {
        setText(currentWord.substring(0, text.length + 1));
        if (text.length === currentWord.length) {
          timeout = setTimeout(() => setIsDeleting(true), pauseTime);
        }
      }, typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return text;
}

export function Hero() {
  const typedText = useTypewriter(["Full-Stack Developer", "Software Engineer", "AI/RAG Developer"]);

  return (
    <section 
      className="relative w-full min-h-screen flex flex-col justify-center pt-24 pb-12 md:pt-[70px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/Purple Illustrated Mountain Desktop Wallpaper.png'), linear-gradient(to right, var(--background), var(--background))" }}
    >
      <div className="container mx-auto px-6 max-w-7xl z-10 mt-10 lg:mt-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 w-full">
          {/* Left Text Content */}
          <div className="flex-1 w-full max-w-[600px] flex flex-col items-start text-left">
            <motion.h3
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
              className="text-2xl md:text-[32px] font-bold text-[var(--foreground)] mb-2 md:mb-0"
            >
              Hello, It's Me
            </motion.h3>
            
            <motion.h1
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-[56px] font-bold text-[var(--foreground)] leading-tight -my-1 mb-2 md:mb-0"
            >
              {personalInfo.name}
            </motion.h1>
            
            <motion.h3
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
              className="text-xl sm:text-2xl md:text-[32px] font-bold text-[var(--foreground)] mb-6 md:mb-[30px]"
            >
              And I'm a <span className="text-[var(--primary)]">{typedText}</span><span className="animate-pulse text-[var(--primary)] font-normal">|</span>
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-[20px] text-[var(--foreground)] leading-relaxed mb-6 max-w-lg"
            >
              {personalInfo.shortDescription}
            </motion.p>
            
            <div className="flex items-center flex-wrap">
              {socialLinks.map((link, i) => {
                const Icon = link.icon;
                const delay = 0.2 * (7 + i);
                const isInternal = link.url.startsWith('#');
                
                return (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target={isInternal ? undefined : "_blank"}
                    rel={isInternal ? undefined : "noopener noreferrer"}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: delay, ease: "easeOut" }}
                    className="inline-flex justify-center items-center w-[40px] h-[40px] bg-transparent border-2 border-[var(--primary)] rounded-full text-[20px] text-[var(--primary)] transition-all duration-500 hover:bg-[var(--primary)] hover:text-[var(--background)] hover:shadow-[0_0_20px_var(--primary)] mr-[15px] mb-[30px]"
                    aria-label={link.name}
                  >
                    <Icon />
                  </motion.a>
                );
              })}
            </div>

            <motion.a
              href="#about"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2, ease: "easeOut" }}
              className="inline-block px-[28px] py-[12px] bg-[var(--primary)] rounded-full text-[16px] text-[var(--background)] tracking-[1px] font-semibold shadow-[0_0_5px_var(--primary),0_0_25px_var(--primary)] transition-all duration-300 hover:shadow-[0_0_5px_cyan,0_0_25px_cyan,0_0_50px_cyan,0_0_100px_cyan]"
            >
              More About Me
            </motion.a>
          </div>

          {/* Right Photo Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            className="flex-1 w-full max-w-sm lg:max-w-md relative mt-10 lg:mt-0"
          >
            <div className="relative aspect-square rounded-full overflow-hidden border-2 border-[var(--primary)] p-3 shadow-[0_0_20px_var(--primary)] bg-[var(--background)]/50 backdrop-blur-xl transition-shadow duration-500 hover:shadow-[0_0_20px_var(--primary)]">
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary)]/20 to-transparent rounded-full animate-pulse mix-blend-overlay"></div>
              
              <div className="relative w-full h-full rounded-full overflow-hidden bg-[var(--background)]/50 flex flex-col items-center justify-center group">
                <Image
                  src="/keshav.jpg"
                  alt="Keshav Dixit - Full Stack Developer"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
