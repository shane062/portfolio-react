"use client"
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'
import * as React from "react"
import { MoonIcon, SunIcon, HamburgerMenuIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { assetUrl } from '@/lib/basePath';

const TopNavBar = () => {
    const { setTheme, theme } = useTheme()
    const router = useRouter()
    const pathname = usePathname()

    const navLinks = [
        { name: 'HOME', path: '/' },
        { name: 'ACHIEVEMENTS', path: '/achievements' },
        { name: 'EXPERIENCE', path: '/experiences' },
    ]

    return (
        <header className="fixed top-0 w-full z-50 bg-white/95 dark:bg-[#050505]/95 border-b border-black/10 dark:border-white/10 transition-colors duration-300">
            <div className="flex justify-between items-center max-w-7xl mx-auto px-8 h-16">
                {/* Logo / Name */}
                <Link href="/" className="font-dot-matrix text-xs uppercase tracking-[0.3em] text-black dark:text-white hover:text-[#ff0000] dark:hover:text-[#ff0000] transition-colors">
                    LAI.WENG.HONG
                </Link>
                
                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.path;
                        return (
                            <Link key={link.name} href={link.path}
                                className={`font-dot-matrix text-[11px] uppercase tracking-[0.2em] transition-colors duration-200 ${
                                    isActive 
                                    ? "text-[#ff0000]" 
                                    : "text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white"
                                }`}
                            >
                                {isActive ? `[ ${link.name} ]` : link.name}
                            </Link>
                        )
                    })}
                </nav>

                <div className="flex items-center gap-4">
                    {/* Theme Toggle */}
                    <button 
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
                        className="w-8 h-8 border border-black/20 dark:border-white/20 flex items-center justify-center text-black/60 dark:text-white/60 hover:border-[#ff0000] hover:text-[#ff0000] transition-colors duration-200"
                        aria-label="Toggle theme"
                    >
                        <SunIcon className="h-3.5 w-3.5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <MoonIcon className="absolute h-3.5 w-3.5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    </button>

                    {/* Resume Download CTA */}
                    <a 
                        href={assetUrl("/lai_weng_hong_cv.pdf")} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:block font-dot-matrix text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-black dark:border-white text-black dark:text-white hover:bg-[#ff0000] hover:border-[#ff0000] hover:text-white transition-colors duration-200"
                    >
                        [ CV .PDF ]
                    </a>

                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="w-8 h-8 border border-black/20 dark:border-white/20 flex items-center justify-center">
                                    <HamburgerMenuIcon className="h-4 w-4" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-white dark:bg-[#050505] border border-black dark:border-white rounded-none min-w-[200px]">
                                {navLinks.map((link) => (
                                    <DropdownMenuItem 
                                        key={link.name} 
                                        onClick={() => router.push(link.path)}
                                        className="font-dot-matrix text-[11px] uppercase tracking-[0.2em] rounded-none cursor-pointer focus:bg-[#ff0000]/10 focus:text-[#ff0000]"
                                    >
                                        {link.name}
                                    </DropdownMenuItem>
                                ))}
                                <DropdownMenuItem asChild className="rounded-none">
                                    <a 
                                        href={assetUrl("/lai_weng_hong_cv.pdf")} 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-dot-matrix text-[11px] uppercase tracking-[0.2em] text-[#ff0000] cursor-pointer"
                                    >
                                        [ RESUME .PDF ]
                                    </a>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopNavBar;