"use client";
import * as React from "react"
import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined';
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel"
import { Achievement } from '@/types/type';

export function AchievementCarousel({ title, content, images, isRecognition, recognitions, ...props }: Achievement) {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)

    const plugin = React.useRef(
        Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })
    )

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
        <div className="cursor-pointer relative">
            <Carousel className="max-w-sm "
                plugins={[plugin.current]}
                setApi={setApi}
            >
                <CarouselContent className="">
                    {images.map((image, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                        <div className="w-full h-full max-w-80 max-h-80">
                                            <Image
                                                src={image}
                                                className="object-contain w-full h-full"
                                                alt={`Achievement image ${index + 1}`}
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
            </Carousel>
            <div className="absolute inset-x-0 bottom-0 flex justify-center align-center mb-4">
                {images.map((_, index) => (
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
    );
}


