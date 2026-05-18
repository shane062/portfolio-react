"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/profile';

export function Footer() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const currentYear = mounted ? new Date().getFullYear() : '2026';

    const socialLinks = [
        { name: 'GITHUB', href: siteConfig.links.github },
        { name: 'LINKEDIN', href: siteConfig.links.linkedin },
        { name: 'EMAIL', href: siteConfig.links.mail },
    ];

    return (
        <footer className="border-t border-black/10 dark:border-white/10">
            <div className="max-w-7xl mx-auto px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Left — Attribution */}
                <div className="flex flex-col items-center md:items-start gap-1">
                    <p className="font-dot-matrix text-[10px] uppercase tracking-[0.2em] text-black/40 dark:text-white/40">
                        © {currentYear} {siteConfig.author}
                    </p>
                    <p className="font-dot-matrix text-[9px] uppercase tracking-[0.15em] text-black/25 dark:text-white/25">
                        [ NEXT.JS • REACT • TAILWIND ]
                    </p>
                </div>

                {/* Right — Social Links */}
                <div className="flex items-center gap-4">
                    {socialLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="font-dot-matrix text-[10px] uppercase tracking-[0.2em] text-black/40 dark:text-white/40 hover:text-[#ff0000] transition-colors duration-200 border-b border-transparent hover:border-[#ff0000]"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            [ {link.name} ]
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    )
}