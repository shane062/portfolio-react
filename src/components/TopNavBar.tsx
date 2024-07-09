"use client"

import Link from 'next/link';
import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const TopNavBar = () => {
    const { setTheme } = useTheme()

    return (

        <header className="sticky top-0 flex h-16 justify-end items-center gap-4 border-b bg-background px-4 md:px-6 z-10 shadow-md">
            <nav className="hidden flex gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link
                    href="/"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    Home
                </Link>
                <Link
                    href="/projects"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    Projects
                </Link>
                <Link
                    href="/achievements"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    Achievements
                </Link>
                <Link
                    href="/experiences"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    Experiences
                </Link>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                            System
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                {/* <Link
                href="#"
                className="text-foreground transition-colors hover:text-foreground"
            >
                Settings
            </Link> */}
            </nav>
        </header>

    );
};

export default TopNavBar;
