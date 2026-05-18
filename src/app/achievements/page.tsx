"use client";
import * as React from "react"
import { useEffect, useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { Achievement } from '@/types/type';

export default function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    async function fetchAchievements() {
      const response = await fetch("/metadata.json");
      const data = await response.json();
      setAchievements(data.achievements);
    }
    fetchAchievements();
  }, []);

  return (
    <main className="min-h-screen pt-28 pb-20 max-w-7xl mx-auto px-8">
      <div className="fixed inset-0 noise-bg pointer-events-none z-0"></div>

      {/* Hero */}
      <header className="relative z-10 mb-20 animate-fade-up">
        <div className="font-dot-matrix text-[9px] uppercase tracking-[0.3em] text-black/30 dark:text-white/30 mb-4">
          SYS.ACHIEVEMENT_LOG
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-black dark:text-white mb-4 leading-[1.05]">
          MILESTONES &<br />
          <span className="text-[#ff0000]">EXCELLENCE</span>
        </h1>
        <p className="text-sm text-black/50 dark:text-white/50 text-justify max-w-lg leading-relaxed font-light">
          A curated archive of technical certifications, industry awards, and contributions to the global engineering community.
        </p>
      </header>

      {/* Achievements Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-px bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10 mb-24">
        {achievements.map((achievement, index) => {
          if (index === 0) {
            return (
              <div key={index} className="md:col-span-8 bg-white dark:bg-[#050505] p-8 flex flex-col group animate-fade-up-delay-1">
                <Dialog>
                  <DialogTrigger className="text-left outline-none w-full h-full flex flex-col md:flex-row gap-8">
                    <div className="flex-1 order-2 md:order-1 flex flex-col">
                      <div className="mb-6">
                        <div className="font-dot-matrix text-[9px] uppercase tracking-[0.3em] text-[#ff0000] mb-3">[ CHAMPION ]</div>
                        <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-3 text-black dark:text-white uppercase">{achievement.title}</h2>
                        <div className="text-sm text-black/50 dark:text-white/50 text-justify leading-relaxed line-clamp-3" dangerouslySetInnerHTML={{ __html: achievement.content }}></div>
                      </div>
                      {achievement.isRecognition && achievement.recognitions && (
                        <div className="mt-auto pt-4 border-t border-black/10 dark:border-white/10 space-y-2">
                          <div className="font-dot-matrix text-[8px] uppercase tracking-[0.3em] text-black/30 dark:text-white/30">PRESS.COVERAGE</div>
                          {achievement.recognitions.map((rec, rIdx) => (
                            <Link key={rIdx} href={rec.link} target="_blank" rel="noopener noreferrer" className="block font-dot-matrix text-[10px] uppercase tracking-[0.15em] text-black/40 dark:text-white/40 hover:text-[#ff0000] transition-colors">
                              [ → {rec.title} ]
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="w-full md:w-56 h-64 overflow-hidden order-1 md:order-2 shrink-0 border border-black/10 dark:border-white/10">
                      {achievement.images[0] && (
                        <Image src={achievement.images[0]} alt={achievement.title} width={300} height={400} className="w-full h-full object-cover  group-hover:contrast-150 transition-all duration-500" />
                      )}
                    </div>
                  </DialogTrigger>
                  <DialogContent className="overflow-y-auto max-h-[90vh] lg:max-w-[60vw] bg-white dark:bg-[#050505] border border-black dark:border-white rounded-none">
                    <DialogTitle className="text-lg font-bold uppercase tracking-wide text-black dark:text-white">{achievement.title}</DialogTitle>
                    <div className="py-4 text-sm text-black/60 dark:text-white/60 text-justify leading-relaxed" dangerouslySetInnerHTML={{ __html: achievement.content }}></div>
                    {achievement.images.length > 1 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {achievement.images.map((img, imgIdx) => (
                          <div key={imgIdx} className="border border-black/10 dark:border-white/10 overflow-hidden">
                            <Image src={img} alt={`${achievement.title} ${imgIdx + 1}`} width={500} height={400} className="w-full h-auto object-cover " />
                          </div>
                        ))}
                      </div>
                    )}
                    {achievement.isRecognition && achievement.recognitions && (
                      <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10 space-y-2">
                        <div className="font-dot-matrix text-[9px] uppercase tracking-[0.3em] text-black/30 dark:text-white/30 mb-2">EXTERNAL.REFERENCES</div>
                        {achievement.recognitions.map((rec, rIdx) => (
                          <Link key={rIdx} href={rec.link} target="_blank" rel="noopener noreferrer" className="block font-dot-matrix text-[10px] uppercase tracking-[0.15em] text-[#ff0000] hover:underline">
                            [ → {rec.title} ]
                          </Link>
                        ))}
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            );
          }

          return (
            <div key={index} className="md:col-span-4 bg-white dark:bg-[#050505] p-8 flex flex-col group animate-fade-up-delay-2">
              <Dialog>
                <DialogTrigger className="text-left outline-none h-full flex flex-col">
                  <div className="font-dot-matrix text-[9px] uppercase tracking-[0.3em] text-black/30 dark:text-white/30 mb-4">
                    {achievement.isRecognition ? '[ CERTIFIED ]' : '[ AWARD ]'}
                  </div>
                  <h3 className="text-base font-bold mb-3 text-black dark:text-white uppercase tracking-wide">{achievement.title}</h3>
                  <div className="text-sm text-black/50 dark:text-white/50 text-justify leading-relaxed mb-6 line-clamp-3" dangerouslySetInnerHTML={{ __html: achievement.content }}></div>
                  <div className="mt-auto pt-4 border-t border-black/10 dark:border-white/10 w-full flex justify-between items-center">
                    <span className="font-dot-matrix text-[9px] uppercase tracking-[0.2em] text-black/30 dark:text-white/30">VIEW.DETAILS</span>
                    <span className="font-dot-matrix text-[11px] text-[#ff0000] group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </DialogTrigger>
                <DialogContent className="overflow-y-auto max-h-[90vh] lg:max-w-[60vw] bg-white dark:bg-[#050505] border border-black dark:border-white rounded-none">
                  <DialogTitle className="text-lg font-bold uppercase tracking-wide text-black dark:text-white">{achievement.title}</DialogTitle>
                  <div className="py-4 text-sm text-black/60 dark:text-white/60 text-justify leading-relaxed" dangerouslySetInnerHTML={{ __html: achievement.content }}></div>
                  {achievement.images.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {achievement.images.map((img, imgIdx) => (
                        <div key={imgIdx} className="border border-black/10 dark:border-white/10 overflow-hidden">
                          <Image src={img} alt={`${achievement.title} ${imgIdx + 1}`} width={500} height={400} className="w-full h-auto object-cover " />
                        </div>
                      ))}
                    </div>
                  )}
                  {achievement.isRecognition && achievement.recognitions && (
                    <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10 space-y-2">
                      <div className="font-dot-matrix text-[9px] uppercase tracking-[0.3em] text-black/30 dark:text-white/30 mb-2">EXTERNAL.REFERENCES</div>
                      {achievement.recognitions.map((rec, rIdx) => (
                        <Link key={rIdx} href={rec.link} target="_blank" rel="noopener noreferrer" className="block font-dot-matrix text-[10px] uppercase tracking-[0.15em] text-[#ff0000] hover:underline">
                          [ → {rec.title} ]
                        </Link>
                      ))}
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          );
        })}
      </div>
    </main>
  );
}