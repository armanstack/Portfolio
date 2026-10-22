
"use client";

import { ArrowUpRight, X, ChevronLeft, ChevronRight, Award, Code2, Users, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { ACHIEVEMENTSIMG } from "../data/constant";


export const AchievementsComp = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeAchievement =
    activeIndex !== null ? ACHIEVEMENTSIMG[activeIndex] : null;

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === null
        ? null
        : (current - 1 + ACHIEVEMENTSIMG.length) % ACHIEVEMENTSIMG.length
    );
  };

  const showNext = () => {
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % ACHIEVEMENTSIMG.length
    );
  };

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex]);

  return (
    <section id="achievements" className="bg-[#0a0f1e] py-24">
      <div className="container max-w-7xl mx-auto px-6">
        {/* Section heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-indigo-400 text-xs font-bold uppercase tracking-[0.3em]">
            My Journey
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-5">
            Achievements &{" "}
            <span className="text-indigo-400">Experiences</span>
          </h2>

          <p className="text-slate-400 leading-relaxed">
            From Agentic AI hackathons and technical sessions to academic
            recognition, these moments reflect my continuous learning,
            collaboration, and growth in technology.
          </p>
        </div>

        {/* Achievement gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENTSIMG.map((achievement, index) => {
            const Icon = achievement.icon;

            return (
              <button
                key={achievement.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`View ${achievement.title}`}
                className={`group relative text-left overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 hover:border-indigo-500/50 transition-all duration-500 hover:-translate-y-1 ${
                  achievement.featured ? "md:row-span-1" : ""
                }`}
              >
                {/* Image */}
                <div className="relative h- 6 4 overflow-hidden">
                  <img
                    src={achievement.image}
                    alt={achievement.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-black/10 to-transparent" />

                  <span className="absolute top-4 left-4 rounded-full border border-white/10 bg-black/50 backdrop-blur-md px-3 py-1.5 text-xs text-indigo-200">
                    {achievement.category}
                  </span>

                  <span className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-indigo-600 transition-colors">
                    <ArrowUpRight className="w-5 h-5" />
                  </span>
                </div>

                {/* Card content */}
                <div className="p-6 pt-2">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {achievement.title}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-400 leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <p className="text-center text-slate-500 text-sm mt-8">
          A few highlights from my learning and professional journey.
        </p>
      </div>

      {/* Image lightbox */}
      {activeAchievement && activeIndex !== null && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          onClick={() => setActiveIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activeAchievement.title}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            aria-label="Close image viewer"
            className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
            aria-label="Previous image"
            className="absolute left-2 md:left-6 z-10 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-indigo-600"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={activeAchievement.image}
              alt={activeAchievement.title}
              className="max-h-[72vh] max-w-full object-contain rounded-xl"
            />

            <h3 className="text-white text-xl font-bold mt-5">
              {activeAchievement.title}
            </h3>

            <p className="text-slate-400 text-sm text-center mt-2 max-w-2xl">
              {activeAchievement.description}
            </p>

            <p className="text-slate-500 text-xs mt-3">
              {activeIndex + 1} / {ACHIEVEMENTSIMG.length}
            </p>
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            aria-label="Next image"
            className="absolute right-2 md:right-6 z-10 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-indigo-600"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
};
