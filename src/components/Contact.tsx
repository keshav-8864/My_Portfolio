"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { socialLinks } from "@/data/portfolio";
import { SectionHeading } from "./SectionHeading";
import { Send, Loader2 } from "lucide-react";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const messageInput = document.getElementById('message') as HTMLTextAreaElement;
    
    try {
      // Using native fetch for EmailJS API to keep dependencies zero
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          // Fetching credentials securely from .env.local
          service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          user_id: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
          template_params: {
            title: "Portfolio Contact Form", // Matches {{title}} in subject
            name: nameInput.value,           // Matches {{name}} in body and From Name
            email: emailInput.value,         // Matches {{email}} in Reply To
            message: messageInput.value,     // Matches {{message}} in body
          }
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Clear form
        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';
        
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        alert("Something went wrong. Please try again or email me directly.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-16">
          <SectionHeading className="mb-4">Let&apos;s Build Something Together</SectionHeading>
          <p className="text-sm sm:text-base md:text-lg text-[var(--foreground)]/70">
            I&apos;m always interested in discussing software engineering, full-stack development, AI applications, and interesting projects.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-6 sm:space-y-8"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Get in touch</h3>
              <p className="text-sm sm:text-base text-[var(--foreground)]/70">
                Feel free to reach out for collaborations, opportunities, or just to say hi!
              </p>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                const isInternal = link.url.startsWith('#');
                
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target={isInternal ? undefined : "_blank"}
                    rel={isInternal ? undefined : "noopener noreferrer"}
                    className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 bg-card border border-border rounded-xl hover:border-[var(--primary)]/50 hover:bg-border/30 transition-colors group"
                  >
                    <div className="p-2.5 sm:p-3 bg-[var(--background)] rounded-lg group-hover:text-[var(--primary)] group-hover:bg-[var(--primary)]/10 transition-colors flex-shrink-0">
                      <Icon size={18} className="sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-sm sm:text-base font-medium truncate">
                      {link.label || link.name}
                    </span>
                  </a>
                );
              })}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3 bg-card border border-border p-5 sm:p-8 rounded-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-[var(--foreground)]/90">Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-border focus:border-[var(--primary)] focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-[var(--foreground)]/90">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-border focus:border-[var(--primary)] focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-[var(--foreground)]/90">Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-border focus:border-[var(--primary)] focus:ring-1 focus:ring-primary outline-none transition-all resize-y"
                  placeholder="Tell me about your project..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[var(--primary)] text-[var(--primary)]-foreground rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[var(--primary)]/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : isSubmitted ? (
                  <>
                    <Send size={18} className="text-green-300" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
