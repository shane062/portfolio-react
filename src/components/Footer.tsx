import { Separator } from "@/components/ui/separator"
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import Link from 'next/link';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <div>
            <Separator className="" />
            <footer className="py-6 md:py-0">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                    <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                        © {currentYear} Lai Weng Hong. All rights reserved.
                    </p>

                    <div className="flex items-center gap-2">
                        <Link
                            href="https://github.com/shane062"
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <GitHubIcon />
                        </Link>

                        <Link
                            href="https://www.linkedin.com/in/weng-hong-lai-a02769256/"
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <LinkedInIcon />
                        </Link>

                        <Link
                            href="mailto:shanelai.dev@gmail.com"
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <EmailIcon />
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}