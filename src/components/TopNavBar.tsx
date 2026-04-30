"use client"
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'
import * as React from "react"
import { MoonIcon, SunIcon, HamburgerMenuIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const TopNavBar = () => {
    const { setTheme, theme } = useTheme()
    const router = useRouter()
    const pathname = usePathname()

    const navLinks = [
        { name: 'HOME', path: '/' },
        { name: 'PROJECTS', path: '/projects' },
        { name: 'ACHIEVEMENTS', path: '/achievements' },
        { name: 'EXPERIENCE', path: '/experiences' },
    ]

    return (
        <header className="fixed top-0 w-full z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-slate-200/15 dark:border-slate-800/15 shadow-sm transition-colors duration-300">
            <div className="flex justify-between items-center max-w-7xl mx-auto px-8 h-20">
                <div className="text-2xl font-black tracking-tighter text-slate-900 dark:text-slate-50">
                    Lai Weng Hong
                </div>
                
                <nav className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.path;
                        return (
                            <Link key={link.name} href={link.path}
                                className={`font-medium transition-colors duration-200 ${
                                    isActive 
                                    ? "text-teal-500 dark:text-teal-400 font-bold relative after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-yellow-600 after:rounded-full" 
                                    : "text-slate-600 dark:text-slate-400 hover:text-teal-500"
                                }`}
                            >
                                {link.name}
                            </Link>
                        )
                    })}
                </nav>

                <div className="flex items-center gap-6">
                    <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="text-slate-600 dark:text-slate-400">
                        <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                    <button className="hidden md:block bg-gradient-to-r from-teal-400 to-purple-600 text-white px-6 py-2.5 rounded-md font-semibold text-sm hover:scale-105 transition-transform duration-200 active:scale-95">
                        Connect
                    </button>

                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon"><HamburgerMenuIcon className="h-5 w-5" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {navLinks.map((link) => (
                                    <DropdownMenuItem key={link.name} onClick={() => router.push(link.path)}>
                                        {link.name}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopNavBar;