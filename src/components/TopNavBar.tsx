"use client"
import Link from 'next/link';
import * as React from "react"
import { MoonIcon, SunIcon, HamburgerMenuIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const TopNavBar = () => {
    const { setTheme, theme } = useTheme()
    const router = useRouter()

    return (
        <header className="sticky top-0 flex h-16 justify-end items-center gap-4 border-b bg-background px-4 md:px-6 z-10 shadow-md">
            <nav className="hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
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
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                <span>
                                    <Button variant="outline" size="icon">
                                        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                        <span className="sr-only">Toggle theme</span>
                                    </Button>
                                    </span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => setTheme("light")}>
                                        Light
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                                        Dark
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Toggle Theme</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </nav>
            <nav className="flex flex-row gap-6 text-lg font-medium md:hidden md:items-center md:gap-5 md:text-sm lg:gap-6">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <HamburgerMenuIcon className="h-[1.2rem] w-[1.2rem]" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push('/')}>
                            Home
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push('/projects')}>
                            Projects
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push('/achievements')}>
                            Achievements
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push('/experiences')}>
                            Experiences
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => theme == "dark" ? setTheme("light") : setTheme("dark")}>
                            <div className='flex'>
                                Switch Theme:
                                {theme == "dark" ? (
                                    <MoonIcon className="mx-1 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                ) : (
                                    <SunIcon className="mx-1 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                )}
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </nav>
        </header>

    );
};

export default TopNavBar;
