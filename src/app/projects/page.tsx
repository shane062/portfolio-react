"use client";
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
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Project } from '@/types/type';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      const response = await fetch("/metadata.json");
      const data = await response.json();
      setProjects(data.projects);
    }
    fetchProjects();
  }, []);

  return (
    <div className="grid grid-cols-12 justify-items-center content-start min-h-[calc(100vh-160px)]">

      <div className="col-span-6 col-start-4 col-end-10 p-2">
        <h1 className="text-2xl font-extrabold tracking-tight lg:text-4xl text-center">/Project(s)</h1>
        <p className="text-xl text-muted-foreground text-justify leading-tight">
          A modal dialog that interrupts the user with important content and expects
          a response.
        </p>
      </div>

      <div className="col-span-12 grid grid-cols-12 grid-flow-row-dense min-w-screen justify-items-center p-16 gap-8 sm:p-8">
        {projects.map((project, index) => (
          <div key={index} className="xl:col-span-3 md:col-span-4 sm:col-span-6 col-span-12 min-w-full">
            <Dialog>
              <DialogTrigger asChild>

                <div>
                  <ProjectCard className="place-self-center"
                    title={project.title}
                    description={project.description}
                    card_bg={project["card_bg"]}
                    avatar={project["avatar"]}
                    avatar_fb={project.avatar_fb}
                    tech_badge={project.tech_badge} />
                </div>

              </DialogTrigger>
              <DialogContent className="overflow-y-auto max-h-[calc(100vh-16px)] lg:max-w-[60vw] md:max-w-[65vw] sm:max-w-[70vw]">
                <div className="grid grid-cols-12 gap-4 py-4">
                  <div className='grid col-span-12'>
                    <span className='text-2xl font-extrabold'>{project.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {project.description}
                    </span>
                  </div>

                  {/* Images */}
                  <div className='flex col-span-12 justify-center'>
                    <Carousel className="max-w-sm">
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
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  </div>

                  <div className='grid col-span-12'>
                    <span className='text-2xl font-extrabold'>About</span>
                    <span className="text-sm text-muted-foreground text-justify">
                      {project.about}
                    </span>
                  </div>

                  <div className='grid col-span-12'>
                    <span className='text-2xl font-extrabold'>Technologies</span>
                    <span className=" flex flex-wrap gap-1">
                      {project.tech_badge.map((tech, index) => (
                        <Badge key={index} className="hover:bg-green-400">{tech}</Badge>
                      ))}
                    </span>
                  </div>

                  <div className='grid col-span-12'>
                    <span className='text-2xl font-extrabold'>Website</span>
                    <div>
                      <Link
                        className="text-sm text-muted-foreground text-justify"
                        href={project.website}>
                        {project.website}
                      </Link>
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
