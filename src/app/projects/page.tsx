"use client";
import * as React from "react"
import { useEffect, useState } from 'react';
import { ProjectCard } from "@/components/ProjectCard";
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image";
import Link from 'next/link';
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  type CarouselApi,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Project } from '@/types/type';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      const response = await fetch("/portfolio-react/metadata.json");
      const data = await response.json();
      setProjects(data.projects);
    }
    fetchProjects();
  }, []);

  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="grid grid-cols-12 justify-items-center content-start min-h-[calc(100vh-161px)] sm:px-8 py-4 ">
      <div className="col-span-10 col-start-2 col-end-12 p-8 lg:col-span-6 lg:col-start-4 lg:col-end-10 md:col-span-8 md:col-start-3 md:col-end-11 p-8">
        <h1 className="text-balance font-extrabold tracking-tight lg:text-4xl md:text-3xl sm:text-2xl xs:text-lg text-md text-center">_project(s)</h1>
        <p className="text-balance lg:text-lg md:text-md sm:text-sm text-xs text-muted-foreground text-justify leading-tight">
          The projects I've undertaken.
        </p>
      </div>

      <div className="col-span-12 grid grid-cols-12 grid-flow-col place-items-stretch min-w-ft gap-4 sm:gap-8 sm:p-4">
        {projects.map((project, index) => (
          <div key={index} className="grid grid0cols-12 xl:col-span-3 md:col-span-4 sm:col-span-6 col-span-10 col-start-2">
            <Dialog>
              <DialogTrigger className="grid place-items-stretch">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <ProjectCard className="place-self-center"
                          title={project.title}
                          description={project.description}
                          card_bg={project["card_bg"]}
                          avatar={project["avatar"]}
                          avatar_fb={project.avatar_fb}
                          tech_badge={project.tech_badge} />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{project.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
              </DialogTrigger>
              <DialogContent className="overflow-y-auto max-h-screen lg:max-w-[60vw] md:max-w-[70vw] sm:max-w-[80vw] xs:max-w-[90vw] max-w-[100vw] py-4">
                <div className="grid grid-cols-12 gap-4 ">
                  <div className='grid col-span-12'>
                    <span className='text-balance text-xl sm:text-2xl font-extrabold'>{project.title}</span>
                    <span className="text-balance text-xs sm:text-sm text-muted-foreground">
                      {project.description}
                    </span>
                  </div>

                  {/* Images */}
                  <div className='flex justify-center col-span-12 cursor-pointer relative'>
                    <Carousel className="sm:max-w-sm xs:max-w-xs max-w-72" setApi={setApi}>
                      <CarouselContent>
                        {project.images.map((image, index) => (
                          <CarouselItem key={index}>
                            <div className="p-1">
                              <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-6">
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
                          <>
                            {index === current ? (
                              <FiberManualRecordIcon className="{w-3 h-3 rounded-full " />
                            ) : (
                              <FiberManualRecordOutlinedIcon className="{w-3 h-3 rounded-full " />
                            )}
                          </>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className='grid col-span-12'>
                    <span className='text-balance text-xl sm:text-2xl font-extrabold'>About</span>
                    <span className="text-balance text-xs sm:text-sm text-muted-foreground text-justify">
                      {project.about}
                    </span>
                  </div>

                  <div className='grid col-span-12'>
                    <span className='text-balance text-xl sm:text-2xl font-extrabold'>Technologies</span>
                    <span className="flex flex-wrap gap-1">
                      {project.tech_badge.map((tech, index) => (
                        <Badge key={index} className="text-balance hover:bg-neon-green text-[8px] sm:text-[10px]">{tech}</Badge>
                      ))}
                    </span>
                  </div>

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

                </div>
                {/* <DialogFooter>

                </DialogFooter> */}
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
}
