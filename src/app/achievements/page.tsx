"use client";
import * as React from "react"
import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image";
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Achievement } from '@/types/type';
import { AchievementCarousel } from "@/components/AchievementCarousel";
import { title } from "process";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined';

export default function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    async function fetchAchievements() {
      const response = await fetch("/portfolio-react/metadata.json");
      const data = await response.json();
      setAchievements(data.achievements);
    }
    fetchAchievements();
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
    <div className="grid grid-cols-12 justify-items-center min-h-[calc(100vh-161px)] sm:px-8 py-4">
      <div className="col-span-10 col-start-2 col-end-12 p-8 lg:col-span-6 lg:col-start-4 lg:col-end-10 md:col-span-8 md:col-start-3 md:col-end-11 p-8">
        <h1 className="text-balance font-extrabold tracking-tight lg:text-4xl md:text-3xl sm:text-2xl xs:text-lg text-md text-center">_achievement(s)</h1>
        <p className="text-balance lg:text-lg md:text-md sm:text-sm text-xs text-muted-foreground text-justify leading-tight">
          Highlighted accomplishments I've received.
        </p>
      </div>

      <div className="col-span-12 grid grid-cols-12 grid-flow-row-dense justify-items-center gap-4 sm:gap-8 sm:p-4">
        {achievements.map((achievement, index) => (
          <div key={index} className="grid grid-cols-12 xl:col-span-3 md:col-span-4 sm:col-span-6 col-span-12">
            <Dialog>
              <DialogTrigger asChild className="col-span-12">
                <div className="cursor-pointer relative sm:px-0 px-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <AchievementCarousel
                          key={index}
                          title={achievement.title}
                          content={achievement.content}
                          images={achievement.images}
                          isRecognition={achievement.isRecognition}
                          recognitions={achievement.recognitions}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{achievement.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                </div>

              </DialogTrigger>

              <DialogContent className="overflow-y-scroll max-h-screen lg:max-w-[60vw] md:max-w-[65vw] sm:max-w-[70vw]  sm:min-h-[calc(100vh-10vh)]">
                <DialogTitle className='text-balance sm:text-2xl font-extrabold'>{achievement.title}</DialogTitle>
                <div className="grid grid-cols-12 gap-4 pt-6 pb-4 xs:pt-0 xs:pb-0">
                  {/* Images */}
                  <div className='relative flex col-span-12 justify-center'>
                    <Carousel className="max-w-sm " setApi={setApi}>
                      <CarouselContent>
                        {achievement.images.map((image, index) => (
                          <CarouselItem key={index}>
                            <div className="p-1">
                              <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                  <div className="relative max-w-60 max-w-80 max-h-80">
                                    <Image
                                      src={image}
                                      className="object-contain w-full h-full"
                                      alt={`${title} Image ${index + 1}`}
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
                      <CarouselPrevious className='hidden xs:flex'/>
                      <CarouselNext className='hidden xs:flex'/>
                    </Carousel>
                    <div className="absolute inset-x-0 bottom-0 flex justify-center align-center mb-4">
                {achievement.images.map((_, index) => (
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

                  <div className='grid col-span-12'>
                    <span className='text-balance text-xl sm:text-2xl font-extrabold'>About</span>
                    <span className="text-balance text-xs sm:text-sm text-muted-foreground text-justify" dangerouslySetInnerHTML={{ __html: achievement.content }} />
                  </div>

                  {achievement.isRecognition && (
                    <div className='grid col-span-12'>
                      <span className='text-balance text-xl sm:text-2xl font-extrabold'>Recognition</span>
                      <div>
                        {achievement.recognitions.map((recognition, index) => (
                          <Link
                            className="text-balance text-xs sm:text-sm text-muted-foreground text-justify block text-blue-700 underline py-1"
                            href={recognition.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {recognition.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

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


