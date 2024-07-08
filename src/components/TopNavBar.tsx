import Link from 'next/link';
import React from 'react';

const TopNavBar = () => {
    return (

        <header className="sticky top-0 flex h-16 justify-end items-center gap-4 border-b bg-background px-4 md:px-6 z-50 shadow-md">
            <nav className="hidden flex gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                {/* <Link
                href="#"
                className="flex items-center gap- text-lg font-semibold md:text-base"
            >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
            </Link> */}
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
