"use client";
import { useEffect, useState } from 'react';
import { ProjectCard } from "@/components/ProjectCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      const response = await fetch("/metadata.json");
      const data = await response.json();
      setProjects(data.projects);
    }
    fetchProjects();
  }, []);

  return (
    <div className="grid grid-cols-12 justify-items-center content-start min-h-[calc(100vh-64px)]">

      <div className="col-span-6 col-start-4 col-end-10 p-2">
        <h1 className="text-2xl font-extrabold tracking-tight lg:text-4xl text-center">/Project</h1>
        <p className="text-xl text-muted-foreground text-justify leading-tight">
          A modal dialog that interrupts the user with important content and expects
          a response.
        </p>
      </div>

      <div className="col-span-12 grid grid-cols-12 grid-flow-row-dense w-screen justify-items-center p-16 gap-8 sm:p-8">
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
              <DialogContent className="min-w-50vw min-h-50vh">
                <DialogHeader>
                  <DialogTitle>
                    <span className='text-2xl font-extrabold'>{project.title}</span></DialogTitle>
                  <DialogDescription>
                    {project.description}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  {/* Add any additional content or forms here */}
                </div>
                <DialogFooter>
                  {/* Add any footer content here, e.g., save or cancel buttons */}
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
}
