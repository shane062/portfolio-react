import { Separator } from "@/components/ui/separator"
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import Link from 'next/link';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { siteConfig } from '@/config/profile';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <div>
            <footer className="py-6 md:py-0">
                <Separator />
                <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                    <div className="flex flex-col">
                        <p className="text-balance text-center text-xs md:text-sm leading-loose text-muted-foreground md:text-left">
                            © {currentYear} {siteConfig.author}. All rights reserved.
                        </p>
                        <p className="text-balance text-center md:text-[10px] text-[0px] leading-loose text-muted-foreground md:text-left">
                            This portfolio is built with React, Next.js, shadcn/ui, MUI, and Tailwind CSS.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Link
                                        href={siteConfig.links.github}
                                        className="text-muted-foreground transition-colors hover:text-foreground"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <GitHubIcon />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Github</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Link
                                        href={siteConfig.links.linkedin}
                                        className="text-muted-foreground transition-colors hover:text-foreground"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <LinkedInIcon />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>LinkedIn</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Link
                                        href={siteConfig.links.mail}
                                        className="text-muted-foreground transition-colors hover:text-foreground"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <EmailIcon />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Mail</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            </footer>
        </div>
    )
}