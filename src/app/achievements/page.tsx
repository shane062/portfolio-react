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
  CarouselNext
} from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Achievement } from '@/types/type';
import { AchievementCarousel } from "@/components/AchievementCarousel";
import { title } from "process";

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
    <div className="grid grid-cols-12 justify-items-center content-start min-h-[calc(100vh-160px)]">

      <div className="col-span-6 col-start-4 col-end-10 p-8">
        <h1 className="text-2xl font-extrabold tracking-tight lg:text-4xl text-center">_achievement(s)</h1>
        <p className="text-xl text-muted-foreground text-justify leading-tight">
          A modal dialog that interrupts the user with important content and expects
          a response.
        </p>
      </div>

      <div className="col-span-12 grid grid-cols-12 grid-flow-row-dense min-w-screen justify-items-center p-16 gap-8 sm:p-8">
        {achievements.map((achievement, index) => (
          <div key={index} className="xl:col-span-3 md:col-span-4 sm:col-span-6 col-span-12 min-w-full w-full">
            <Dialog>
              <DialogTrigger asChild>
                <div className="cursor-pointer relative">
                  <AchievementCarousel
                    key={index}
                    title={achievement.title}
                    content={achievement.content}
                    images={achievement.images}
                    isRecognition={achievement.isRecognition}
                    recognitions={achievement.recognitions}
                  />
                </div>

              </DialogTrigger>

              <DialogContent className="overflow-y-auto max-h-[calc(100vh-16px)] lg:max-w-[60vw] md:max-w-[65vw] sm:max-w-[70vw]">
                <DialogTitle className='text-2xl font-extrabold'>{achievement.title}</DialogTitle>
                <div className="grid grid-cols-12 gap-4 py-4">
                  {/* <div className='grid col-span-12'>

                    <span className='text-2xl font-extrabold'>{achievement.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {achievement.content}
                    </span>
                  </div> */}

                  {/* Images */}
                  <div className='flex col-span-12 justify-center'>
                    <Carousel className="max-w-sm">
                      <CarouselContent>
                        {achievement.images.map((image, index) => (
                          <CarouselItem key={index}>
                            <div className="p-1">
                              <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                  <div className="relative w-full h-full max-w-80 max-h-80">
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
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  </div>

                  <div className='grid col-span-12'>
                    <span className='text-2xl font-extrabold'>About</span>
                    <span className="text-sm text-muted-foreground text-justify" dangerouslySetInnerHTML={{ __html: achievement.content }} />
                  </div>

                  {achievement.isRecognition && (
                    <div className='grid col-span-12'>
                      <span className='text-2xl font-extrabold'>Recognition</span>
                      <div>
                        {achievement.recognitions.map((recognition, index) => (
                        <Link
                          className="text-sm text-muted-foreground text-justify block"
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


