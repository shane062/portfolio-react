import {
    Card
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

type ProjectCardProps = {
    title: string;
    description: string;
    card_bg: string;
    className?: string;
    avatar: string;
    avatar_fb: string;
    tech_badge: string[];
};

export function ProjectCard({ title, description, card_bg, avatar, avatar_fb, tech_badge, className, ...props }: ProjectCardProps) {
    return (
        <div className="relative group">
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-300 group-hover:blur-sm rounded-lg"
                style={{ backgroundImage: `url(${card_bg})` }} />
            <Card className="flex items-end relative bg-white bg-opacity-0 group-hover:bg-opacity-40 min-h-60">

                <div className="grid grid-cols-3 content-end p-2 transition-all duration-300 ease-in-out transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="flex col-span-3 gap-2 items-center">
                        <Avatar>
                            <AvatarImage src={avatar} alt="@shadcn" />
                            <AvatarFallback>{avatar_fb}</AvatarFallback>
                        </Avatar>
                        <span className="text-xl text-black font-bold">{title}</span>
                    </div>
                    <span className="text-md text-black col-span-3">{description}</span>
                    <div className="col-span-3 flex flex-wrap gap-1">
                        {tech_badge.map((tech, index) => (
                            <Badge key={index} className="hover:bg-green-400">{tech}</Badge>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    )
}
