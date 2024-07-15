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
    const [zoomedImage, setZoomedImage] = useState(null);

    const openZoomedImage = (imageUrl) => {
        setZoomedImage(imageUrl);
    };

    const closeZoomedImage = () => {
        setZoomedImage(null);
    };

    useEffect(() => {
        async function fetchProjects() {
            const response = await fetch("/portfolio-react/metadata.json");
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
        <div className="grid grid-cols-12 justify-items-center content-start min-h-[calc(100vh-161px)]  sm:px-8 py-4 ">
            <div className="col-span-10 col-start-2 col-end-12 p-8 lg:col-span-6 lg:col-start-4 lg:col-end-10 md:col-span-8 md:col-start-3 md:col-end-11 p-8">
                <h1 className="lg:text-4xl md:text-3xl sm:text-2xl xs:text-lg text-md font-extrabold tracking-tight text-center">_experience(s)</h1>
                <p className="lg:text-lg md:text-md sm:text-sm text-xs text-muted-foreground text-justify leading-tight">
                Career-related work experience I've gained.
                </p>
            </div>
            <div className="col-span-12 xl:w-9/12 lg:w-10/12 md:w-11/12 w-full p-8 sm:p-4">
                <Timeline position={isSmallScreen ? "right" : 'alternate'} sx={timelineSx}>
                    {experiences.map((experience, index) => (
                        <TimelineItem key={index}>
                            <TimelineSeparator>
                                {/* <TimelineConnector /> */}
                                <TimelineDot/>
                                <TimelineConnector
                                // sx={{ bgcolor: 'secondary.main' }} 
                                />
                            </TimelineSeparator>

                            <TimelineContent className="grid grid-cols-12 content-center mb-8">
                                <div className='col-span-12'>
                                    <h3 className='text-balance lg:text-2xl md:text-xl sm:text-lg xs:text-md text-sm  font-semibold font-kode-mono text-pretty'>
                                        {experience.company}
                                    </h3>
                                    <h3 className='text-balance whitespace-pre-line lg:text-xl md:text-lg sm:text-md xs:text-sm text-xs  font-kode-mono font-semibold text-pretty'>
                                        {experience.time}
                                    </h3>
                                    <h3 className='text-balance whitespace-pre-line lg:text-xl md:text-lg sm:text-md xs:text-sm text-xs font-kode-mono font-semibold text-pretty'>
                                        {experience.title}
                                    </h3>
                                </div>

                                <Separator className="my-2 col-span-12" />

                                <div className='col-span-12'>
                                    <p className="text-balance text-justify font-kode-mono lg:text-md md:text-sm text-xs">
                                        {experience.content}
                                    </p>
                                </div>

                                {experience.image && (
                                    <>
                                    <div className='col-span-12' onClick={() => openZoomedImage(experience.image)}>
                                        <Image
                                            src={experience.image}
                                            className="object-contain w-full h-full border-4 border-solid cursor-zoom-in"
                                            alt={`Experience image ${index + 1}`}
                                            width={500} // Adjust width as needed
                                            height={500} // Adjust height as needed
                                            priority={true}
                                            quality={100}
                                        />
                                    </div>
                                     {zoomedImage && (
                                        <div
                                          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 cursor-zoom-out z-20"
                                          onClick={closeZoomedImage}
                                        >
                                          <Image
                                            src={zoomedImage}
                                            alt="Zoomed experience image"
                                            layout="fill"
                                            objectFit="contain"
                                          />
                                        </div>
                                      )}
                                      </>
                                )}

                                <div className="col-span-12 mt-2">
                                    {experience.tech_badge.map((tech, index) => (
                                        <Badge key={index} className="text-balance hover:bg-neon-green mx-1 font-kode-mono text-[8px] sm:text-[10px]">{tech}</Badge>
                                    ))}
                                </div>
                            </TimelineContent>

                        </TimelineItem>
                    ))}
                    {/* Fixed Timeline */}
                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot/>

                        </TimelineSeparator>

                        <TimelineContent sx={{ py: '12px', px: 2 }} />
                    </TimelineItem>
                </Timeline>
            </div>
        </div>
    );
}