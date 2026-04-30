"use client";
import * as React from "react"
import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image";
import Link from 'next/link';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from "@/components/ui/carousel"
import { Achievement } from '@/types/type';

export default function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  useEffect(() => {
    async function fetchAchievements() {
      const response = await fetch("/metadata.json");
      const data = await response.json();
      setAchievements(data.achievements);
    }
    fetchAchievements();
  }, []);

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <main className="min-h-screen pt-32 pb-20 max-w-7xl mx-auto px-8">
      {/* Hero Section */}
      <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-12 h-[2px] bg-teal-600"></span>
            <span className="text-teal-600 font-bold tracking-widest uppercase text-xs">Hall of Recognition</span>
          </div>
          <h1 className="text-6xl font-extrabold tracking-tighter text-slate-900 dark:text-white mb-6 leading-[1.1]">
            Milestones & <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-purple-600">Excellence</span>.
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
            A curated archive of technical certifications, industry awards, and contributions to the global engineering community.
          </p>
        </div>
      </header>

      {/* Achievements Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24">
        {achievements.map((achievement, index) => {
          // Make the first item large (Principal Card style)
          if (index === 0) {
            return (
              <div key={index} className="md:col-span-8 group relative overflow-hidden bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-10 hover:shadow-lg transition-shadow cursor-pointer">
                 <Dialog>
                    <DialogTrigger className="flex flex-col md:flex-row gap-10 text-left outline-none w-full h-full">
                        <div className="flex-1 order-2 md:order-1 flex flex-col">
                          <div className="mb-8">
                            <span className="material-symbols-outlined text-4xl text-yellow-600 mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>trophy</span>
                            <h2 className="text-3xl font-bold tracking-tight mb-2 text-slate-900 dark:text-white">{achievement.title}</h2>
                            <p className="text-slate-500 dark:text-slate-400 mb-6 text-lg line-clamp-3" dangerouslySetInnerHTML={{ __html: achievement.content }}></p>
                          </div>
                        </div>
                        <div className="w-full md:w-64 h-80 rounded-lg overflow-hidden order-1 md:order-2 shadow-sm shrink-0">
                          {achievement.images[0] && (
                            <Image src={achievement.images[0]} alt={achievement.title} width={300} height={400} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          )}
                        </div>
                    </DialogTrigger>
                    {/* Reuse your existing Dialog Content below */}
                    <DialogContent className="overflow-y-scroll max-h-screen lg:max-w-[60vw]">
                        <DialogTitle className='text-balance sm:text-2xl font-extrabold'>{achievement.title}</DialogTitle>
                        <div className="py-4"><p dangerouslySetInnerHTML={{ __html: achievement.content }}></p></div>
                    </DialogContent>
                 </Dialog>
              </div>
            );
          }

          // Render the rest as smaller grid items
          return (
            <div key={index} className="md:col-span-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl p-8 border border-slate-200/50 dark:border-slate-800 hover:border-teal-500/30 transition-colors cursor-pointer flex flex-col justify-between group">
                <Dialog>
                    <DialogTrigger className="text-left outline-none h-full flex flex-col">
                        <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 shadow-sm border border-slate-100 dark:border-slate-700 group-hover:scale-105 transition-transform">
                            <span className="material-symbols-outlined text-3xl text-purple-600" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{achievement.title}</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3" dangerouslySetInnerHTML={{ __html: achievement.content }}></p>
                        <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-800 w-full flex justify-between items-center">
                            <span className="text-xs font-bold tracking-wider uppercase text-slate-400">View Details</span>
                            <span className="material-symbols-outlined text-teal-500 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="overflow-y-scroll max-h-screen lg:max-w-[60vw]">
                        <DialogTitle className='text-balance sm:text-2xl font-extrabold'>{achievement.title}</DialogTitle>
                        <div className="py-4"><p dangerouslySetInnerHTML={{ __html: achievement.content }}></p></div>
                    </DialogContent>
                </Dialog>
            </div>
          );
        })}
      </div>
    </main>
  );
}