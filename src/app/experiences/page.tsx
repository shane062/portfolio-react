"use client";
import { useEffect, useState } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Separator } from "@/components/ui/separator"
import Image from "next/image";
import { Experience } from '@/types/type';
import { Badge } from "@/components/ui/badge"
import { useMediaQuery } from '@mui/material';

export default function CustomizedTimeline() {
    const [experiences, setExperiences] = useState<Experience[]>([]);

    useEffect(() => {
        async function fetchProjects() {
            const response = await fetch("/metadata.json");
            const data = await response.json();
            setExperiences(data.experiences);
        }
        fetchProjects();
    }, []);

    const isSmallScreen = useMediaQuery('(max-width: 640px)');

    const timelineSx = isSmallScreen ? {
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      } : {};

    return (
        <div className="grid grid-cols-12 justify-items-center content-start min-h-[calc(100vh-160px)]">
            <div className="col-span-6 col-start-4 col-end-10 p-2">
                <h1 className="text-2xl font-extrabold tracking-tight lg:text-4xl text-center">/Experience(s)</h1>
                <p className="text-xl text-muted-foreground text-justify leading-tight">
                    A modal dialog that interrupts the user with important content and expects
                    a response.
                </p>
            </div>


            <div className="col-span-12 xl:w-9/12 lg:w-10/12 md:w-11/12 w-full">
                <Timeline position={isSmallScreen ? "right" : 'alternate'} sx={timelineSx}>
                    {experiences.map((experience, index) => (
                        <TimelineItem key={index}>
                            <TimelineSeparator>
                                {/* <TimelineConnector /> */}
                                <TimelineDot color="primary" />
                                <TimelineConnector
                                // sx={{ bgcolor: 'secondary.main' }} 
                                />
                            </TimelineSeparator>

                            <TimelineContent className="grid grid-cols-12 content-center">
                                <div className='grid grid-rows-3 col-span-12'>
                                    <span className='text-2xl font-semibold'>
                                        {experience.company}
                                    </span>
                                    <span className='text-xl font-semibold '>
                                        {experience.time}
                                    </span>
                                    <span className='text-xl font-semibold'>
                                        {experience.title}
                                    </span>
                                </div>

                                <Separator className="my-2 col-span-12" />

                                <div className='col-span-12'>
                                    <p className="text-justify">
                                        {experience.content}
                                    </p>
                                </div>

                                {experience.image && (
                                    <div className='col-span-12'>
                                        <Image
                                            src={experience.image}
                                            className="object-contain w-full h-full border-4 border-solid border-black"
                                            alt={`Experience image ${index + 1}`}
                                            width={500} // Adjust width as needed
                                            height={500} // Adjust height as needed
                                            priority={true}
                                            quality={100}
                                        />
                                    </div>
                                )}

                                <div className="col-span-12 mt-2">
                                    {experience.tech_badge.map((tech, index) => (
                                        <Badge key={index} className="hover:bg-green-400 mx-1">{tech}</Badge>
                                    ))}
                                </div>
                            </TimelineContent>

                        </TimelineItem>
                    ))}
                    {/* Fixed Timeline */}
                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot color="primary" />

                        </TimelineSeparator>

                        <TimelineContent sx={{ py: '12px', px: 2 }} />
                    </TimelineItem>
                </Timeline>
            </div>
        </div>
    );
}