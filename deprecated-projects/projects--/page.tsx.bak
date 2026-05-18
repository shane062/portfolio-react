"use client";
import * as React from "react"
import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image";
import Link from 'next/link';
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogTitle,       // Add this import
  DialogDescription  // Add this import
} from "@/components/ui/dialog"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  type CarouselApi,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Project } from '@/types/type';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  useEffect(() => {
    async function fetchProjects() {
      const response = await fetch("/metadata.json");
      const data = await response.json();
      setProjects(data.projects);
    }
    fetchProjects();
  }, []);

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <main className="min-h-screen pt-32 pb-20 px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <header className="mb-16">
        <h1 className="text-[3.5rem] font-black tracking-tight leading-none mb-6 text-slate-900 dark:text-white">
          Engineered Solutions.
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl">
          A curated selection of high-performance architectures, data-driven applications, and technical explorations bridging logic and aesthetics.
        </p>
      </header>

      {/* Bento/Tactile Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {projects.map((project, index) => {
          const isWide = index % 5 === 4;

          return (
            <div key={index} className={`group flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-[0_20px_40px_rgba(19,27,46,0.06)] hover:border-teal-500/50 transition-all duration-300 ${isWide ? 'lg:col-span-2' : ''}`}>
              <Dialog>
                <DialogTrigger className="text-left flex flex-col h-full w-full outline-none">
                  <div className={`relative w-full overflow-hidden rounded-t-xl mb-6 ${isWide ? 'md:flex-row h-full aspect-auto' : 'aspect-video'}`}>
                    {index === 0 && (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm">New</span>
                      </div>
                    )}
                    <Image
                      src={project.images[0] || project.card_bg}
                      alt={project.title}
                      width={800} height={450}
                      className={`object-cover group-hover:scale-105 transition-transform duration-500 ${isWide ? 'h-full w-full md:w-1/2' : 'h-full w-full'}`}
                      priority
                    />
                    {isWide && (
                      <div className="md:w-1/2 p-8 flex flex-col hidden md:flex absolute right-0 top-0 h-full bg-white dark:bg-slate-900">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{project.title}</h3>
                          <span className="material-symbols-outlined text-teal-600">code</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed line-clamp-3">{project.description}</p>
                        <div className="flex flex-wrap gap-3 mt-auto">
                          {project.tech_badge.slice(0, 3).map((tech, i) => (
                            <span key={i} className="flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-bold tracking-wide text-slate-700 dark:text-slate-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span> {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className={`px-8 pb-8 flex-1 flex-col ${isWide ? 'md:hidden flex' : 'flex'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{project.title}</h3>
                      <span className="material-symbols-outlined text-teal-600">terminal</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-3 mt-auto">
                      {project.tech_badge.slice(0, 3).map((tech, i) => (
                        <span key={i} className="flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-bold tracking-wide text-slate-700 dark:text-slate-300">
                          <span className={`w-1.5 h-1.5 rounded-full ${i % 2 === 0 ? 'bg-teal-500' : 'bg-purple-500'}`}></span> {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </DialogTrigger>

                <DialogContent className="overflow-y-scroll max-h-screen lg:max-w-[60vw] md:max-w-[65vw] sm:max-w-[70vw] sm:min-h-[calc(100vh-10vh)]">
                  <div className="grid grid-cols-12 gap-4 pt-6 pb-4 xs:pt-0 xs:pb-0">
                    <div className='grid col-span-12'>
                      {/* FIX: Use DialogTitle and DialogDescription instead of spans */}
                      <DialogTitle className='text-balance text-xl sm:text-2xl font-extrabold'>
                        {project.title}
                      </DialogTitle>
                      <DialogDescription className="text-balance text-xs sm:text-sm text-muted-foreground mt-2">
                        {project.description}
                      </DialogDescription>
                    </div>

                    <div className='flex justify-center col-span-12 cursor-pointer relative'>
                      <Carousel className="sm:max-w-sm xs:max-w-xs max-w-72" setApi={setApi}>
                        <CarouselContent>
                          {project.images.map((image, index) => (
                            <CarouselItem key={index}>
                              <div className="p-1">
                                <Card>
                                  <Dialog>
                                    <DialogTrigger>
                                      <CardContent className="flex aspect-square items-center justify-center p-6 w-full h-full">
                                        <div className="relative w-full h-full max-w-80 max-h-80">
                                          <Image
                                            src={image}
                                            className="object-contain w-full h-full"
                                            alt={`Project image ${index + 1}`}
                                            width={500}
                                            height={500}
                                            priority={true}
                                            quality={100}
                                          />
                                        </div>
                                      </CardContent>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-full max-h-screen p-0 bg-black/80 bg-opacity-50 cursor-zoom-out">
                                      {/* FIX: Add hidden screen reader title/description for the zoom dialog */}
                                      <DialogTitle className="sr-only">Zoomed Project Image</DialogTitle>
                                      <DialogDescription className="sr-only">A closer view of the project image.</DialogDescription>
                                      
                                      <DialogClose asChild>
                                        <div className=" w-full h-screen">
                                          <Image
                                            src={image}
                                            alt="Zoomed experience image"
                                            layout="fill"
                                            className="object-contain w-full h-full"
                                            priority
                                          />
                                        </div>
                                      </DialogClose>
                                    </DialogContent>
                                  </Dialog>
                                </Card>
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className='hidden xs:flex' />
                        <CarouselNext className='hidden xs:flex' />
                      </Carousel>
                      <div className="absolute inset-x-0 bottom-0 flex justify-center align-center mb-4 w-full">
                        <div className="flex flex-wrap justify-center sm:max-w-sm xs:max-w-xs max-w-72 overflow-hidden px-2">
                          {project.images.map((_, index) => (
                            <React.Fragment key={index}>
                              {index === current ? (
                                <FiberManualRecordIcon className="w-3 h-3 rounded-full" />
                              ) : (
                                <FiberManualRecordOutlinedIcon className="w-3 h-3 rounded-full" />
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className='grid col-span-12'>
                      <span className='text-balance text-xl sm:text-2xl font-extrabold'>About</span>
                      <span className="text-balance text-xs sm:text-sm text-muted-foreground text-justify" dangerouslySetInnerHTML={{ __html: project.about }} />
                    </div>

                    <div className='grid col-span-12'>
                      <span className='text-balance text-xl sm:text-2xl font-extrabold'>Technologies</span>
                      <span className="flex flex-wrap gap-1">
                        {project.tech_badge.map((tech, index) => (
                          <Badge key={index} className="text-balance hover:bg-neon-green text-[8px] sm:text-[10px]">{tech}</Badge>
                        ))}
                      </span>
                    </div>
                    {project.website && (
                      <div className='grid col-span-12'>
                        <span className='text-balance text-xl sm:text-2xl font-extrabold'>Website</span>
                        <div className='flex flex-wrap gap-2 my-1'>
                          <Link
                            className="text-balance text-xs sm:text-sm text-muted-foreground text-justify text-blue-700 underline"
                            href={project.website}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {project.website}
                          </Link>
                          {
                            project.available == false && (
                              <Badge key={index} className='text-balance text-[8px] sm:text-[10px]'>Not Available</Badge>
                            )
                          }
                        </div>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          );
        })}
      </div>
    </main>
  );
}