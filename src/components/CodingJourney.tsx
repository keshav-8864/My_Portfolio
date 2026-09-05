"use client";

import { useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Target, Trophy, Code2 } from "lucide-react";

export interface LeetCodeStats {
  solvedProblem: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  rating: number | null;
  calendar: Record<string, number>;
}

export function CodingJourney({ stats }: { stats: LeetCodeStats | null }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the heatmap to the right (most recent days) on load
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [stats]);

  // Generate heatmap grid based on actual data
  const heatmapGrid = useMemo(() => {
    const cols = 28; // ~6 months
    const rows = 7;
    const grid: number[][] = Array.from({ length: cols }, () => Array(rows).fill(0));
    
    if (!stats) return grid;

    // Convert timestamps to date strings for easy lookup
    const submissionsByDate: Record<string, number> = {};
    Object.entries(stats.calendar).forEach(([timestamp, count]) => {
      const date = new Date(parseInt(timestamp) * 1000);
      const dateString = date.toISOString().split('T')[0];
      submissionsByDate[dateString] = count;
    });

    const today = new Date();
    // Start from Sunday of the week that is (cols - 1) weeks ago
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - today.getDay() - (cols - 1) * 7);

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + (c * 7) + r);
        
        // Don't render future days
        if (currentDate > today) {
          grid[c][r] = -1; // -1 means empty/hidden
          continue;
        }

        const dateString = currentDate.toISOString().split('T')[0];
        const count = submissionsByDate[dateString] || 0;
        
        if (count === 0) grid[c][r] = 0;
        else if (count <= 2) grid[c][r] = 1;
        else if (count <= 4) grid[c][r] = 2;
        else if (count <= 6) grid[c][r] = 3;
        else grid[c][r] = 4;
      }
    }
    
    return grid;
  }, [stats]);
  
  const getLevelColor = (level: number) => {
    switch (level) {
      case -1: return "bg-transparent"; // Future days
      case 1: return "bg-[var(--primary)]/20";
      case 2: return "bg-[var(--primary)]/40";
      case 3: return "bg-[var(--primary)]/70";
      case 4: return "bg-[var(--primary)] shadow-[0_0_5px_var(--primary)]";
      default: return "bg-[var(--card)] border border-[var(--border)]";
    }
  };

  // If we couldn't fetch stats, hide this section
  if (!stats) return null;

  return (
    <section id="journey" className="py-16 md:py-32 relative bg-[var(--background)]">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[var(--foreground)]/50 mb-3 sm:mb-4"
          >
            CODING JOURNEY
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-5xl font-bold text-[var(--foreground)] leading-tight max-w-3xl"
          >
            Mastering Problem Solving — <span className="text-[var(--primary)] inline-flex items-center gap-2">
              {stats ? `${stats.solvedProblem}+` : <div className="h-8 md:h-12 w-24 bg-[var(--primary)]/20 rounded animate-pulse" />} algorithms
            </span> conquered.
          </motion.h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
          
          {/* Left Column: Heatmap (Spans 7 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-[var(--card)]/40 border border-[var(--border)] rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col justify-between"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-6 sm:mb-10">
              <div>
                <p className="text-xs sm:text-sm text-[var(--foreground)]/60 mb-1">Activity heatmap</p>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-[var(--foreground)]">Daily problem-solving rhythm</h3>
              </div>
              <a 
                href="https://leetcode.com/u/Keshav_31_12/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-[var(--foreground)]/80 hover:text-[var(--primary)] hover:border-[var(--primary)] border border-[var(--border)] rounded-lg transition-colors bg-[var(--background)]/50 w-fit"
              >
                Profile <ExternalLink size={14} />
              </a>
            </div>

            {/* Heatmap Grid rendering */}
            <div 
              ref={scrollRef} 
              className="w-full overflow-x-auto pb-4 scroll-smooth"
            >
              <div className="flex gap-1.5 min-w-max">
                {heatmapGrid.map((col, colIndex) => (
                  <div key={colIndex} className="flex flex-col gap-1.5">
                    {col.map((level, rowIndex) => (
                      <div 
                        key={rowIndex} 
                        className={`w-3.5 h-3.5 md:w-4 md:h-4 rounded-sm ${getLevelColor(level)}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Legend */}
            <div className="flex items-center gap-2 mt-4 text-xs text-[var(--foreground)]/50">
              <span>Less</span>
              <div className="flex gap-1 ml-1 mr-1">
                <div className="w-3 h-3 rounded-sm bg-[var(--card)] border border-[var(--border)]"></div>
                <div className="w-3 h-3 rounded-sm bg-[var(--primary)]/20"></div>
                <div className="w-3 h-3 rounded-sm bg-[var(--primary)]/40"></div>
                <div className="w-3 h-3 rounded-sm bg-[var(--primary)]/70"></div>
                <div className="w-3 h-3 rounded-sm bg-[var(--primary)]"></div>
              </div>
              <span>More</span>
            </div>
          </motion.div>

          {/* Right Column: Stats Cards (Spans 5 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            {/* Card 1: Total Solved & Difficulty */}
            <div className="bg-[var(--card)]/40 border border-[var(--border)] rounded-2xl p-4 sm:p-6 flex items-start gap-3.5 sm:gap-5 hover:border-[var(--primary)]/30 transition-colors group h-full">
              <div className="bg-[var(--background)] border border-[var(--border)] p-2.5 sm:p-3 rounded-xl group-hover:border-[var(--primary)]/50 transition-colors shadow-none group-hover:shadow-[0_0_15px_var(--primary)]/20 shrink-0">
                <Target size={20} className="text-[var(--primary)] sm:w-[22px] sm:h-[22px]" />
              </div>
              <div className="w-full">
                <p className="text-xs sm:text-sm text-[var(--foreground)]/60 mb-1">Problems Solved</p>
                <div className="flex items-baseline gap-2 mb-3">
                  <h4 className="text-lg sm:text-xl font-bold text-[var(--foreground)] flex items-center">
                    {stats ? stats.solvedProblem : <div className="h-6 w-12 bg-[var(--foreground)]/10 rounded animate-pulse" />}
                  </h4>
                  <span className="text-xs text-[var(--foreground)]/50">Total</span>
                </div>
                
                <div className="flex flex-col gap-3 mt-1">
                  {/* Easy */}
                  <div>
                    <div className="flex justify-between text-xs sm:text-sm mb-1.5 items-center">
                      <span className="text-[#00b8a3] font-semibold">Easy</span>
                      <span className="text-[var(--foreground)] font-bold">
                        {stats ? stats.easySolved : <div className="h-4 w-6 bg-[var(--foreground)]/10 rounded animate-pulse" />}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[var(--card)] rounded-full overflow-hidden">
                      <div 
                        style={{ width: stats && stats.solvedProblem > 0 ? `${(stats.easySolved / stats.solvedProblem) * 100}%` : '0%' }} 
                        className="h-full bg-[#00b8a3] transition-all duration-1000" 
                      />
                    </div>
                  </div>
                  
                  {/* Medium */}
                  <div>
                    <div className="flex justify-between text-xs sm:text-sm mb-1.5 items-center">
                      <span className="text-[#ffc01e] font-semibold">Medium</span>
                      <span className="text-[var(--foreground)] font-bold">
                        {stats ? stats.mediumSolved : <div className="h-4 w-6 bg-[var(--foreground)]/10 rounded animate-pulse" />}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[var(--card)] rounded-full overflow-hidden">
                      <div 
                        style={{ width: stats && stats.solvedProblem > 0 ? `${(stats.mediumSolved / stats.solvedProblem) * 100}%` : '0%' }} 
                        className="h-full bg-[#ffc01e] transition-all duration-1000" 
                      />
                    </div>
                  </div>
                  
                  {/* Hard */}
                  <div>
                    <div className="flex justify-between text-xs sm:text-sm mb-1.5 items-center">
                      <span className="text-[#ef4743] font-semibold">Hard</span>
                      <span className="text-[var(--foreground)] font-bold">
                        {stats ? stats.hardSolved : <div className="h-4 w-6 bg-[var(--foreground)]/10 rounded animate-pulse" />}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[var(--card)] rounded-full overflow-hidden">
                      <div 
                        style={{ width: stats && stats.solvedProblem > 0 ? `${(stats.hardSolved / stats.solvedProblem) * 100}%` : '0%' }} 
                        className="h-full bg-[#ef4743] transition-all duration-1000" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Rating */}
            <div className="bg-[var(--card)]/40 border border-[var(--border)] rounded-2xl p-4 sm:p-6 flex items-start gap-3.5 sm:gap-5 hover:border-[var(--primary)]/30 transition-colors group">
              <div className="bg-[var(--background)] border border-[var(--border)] p-2.5 sm:p-3 rounded-xl group-hover:border-[var(--primary)]/50 transition-colors shadow-none group-hover:shadow-[0_0_15px_var(--primary)]/20 shrink-0">
                <Trophy size={20} className="text-[var(--primary)] sm:w-[22px] sm:h-[22px]" />
              </div>
              <div className="w-full">
                <p className="text-xs sm:text-sm text-[var(--foreground)]/60 mb-1">Global Ranking</p>
                <div className="flex items-baseline gap-3 mb-1">
                  <h4 className="text-lg sm:text-xl font-bold text-[var(--foreground)] flex items-center">
                    {stats ? (stats.ranking ? `#${stats.ranking.toLocaleString('en-US')}` : "Unranked") : <div className="h-6 w-20 bg-[var(--foreground)]/10 rounded animate-pulse" />}
                  </h4>
                </div>
                {stats ? (
                  stats.rating && (
                    <p className="text-xs sm:text-sm text-[var(--foreground)]/70 leading-snug">
                      Contest Rating: <span className="font-semibold text-[var(--foreground)]">{stats.rating}</span>
                    </p>
                  )
                ) : (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs sm:text-sm text-[var(--foreground)]/70">Contest Rating:</span>
                    <div className="h-4 w-16 bg-[var(--foreground)]/10 rounded animate-pulse" />
                  </div>
                )}
              </div>
            </div>

            {/* Card 3: Languages */}
            <div className="bg-[var(--card)]/40 border border-[var(--border)] rounded-2xl p-4 sm:p-6 flex items-start gap-3.5 sm:gap-5 hover:border-[var(--primary)]/30 transition-colors group">
              <div className="bg-[var(--background)] border border-[var(--border)] p-2.5 sm:p-3 rounded-xl group-hover:border-[var(--primary)]/50 transition-colors shadow-none group-hover:shadow-[0_0_15px_var(--primary)]/20 shrink-0">
                <Code2 size={20} className="text-[var(--primary)] sm:w-[22px] sm:h-[22px]" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-[var(--foreground)]/60 mb-1">Languages</p>
                <h4 className="text-lg sm:text-xl font-bold text-[var(--foreground)] mb-1">C++ &bull; Java &bull; Python</h4>
                <p className="text-xs sm:text-sm text-[var(--foreground)]/70 leading-snug">Comfort across paradigms</p>
              </div>
            </div>
            
          </motion.div>

        </div>
      </div>
    </section>
  );
}
