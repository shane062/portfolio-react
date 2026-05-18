import Image from "next/image";
import Link from "next/link";
import { assetUrl } from "@/lib/basePath";

export default function Home() {
  const techStack = [
    "AWS", "DYNAMODB", "DOCKER", "VUE.JS", "LARAVEL",
    "EXPRESS.JS", "REACT"
  ];

  const stats = [
    { value: "2+", label: "YEARS EXP" },
    { value: "2", label: "COMPANIES" },
    { value: "5+", label: "PROJECTS" },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 px-8 max-w-7xl mx-auto flex flex-col justify-center">
      <div className="fixed inset-0 noise-bg pointer-events-none z-0"></div>
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-7 space-y-10">
          <div className="animate-fade-up flex items-center gap-3">
            <div className="w-2 h-2 bg-[#ff0000] pulse-dot"></div>
            <span className="font-dot-matrix text-[10px] uppercase tracking-[0.3em] text-[#ff0000]">
              OPEN TO OPPORTUNITIES
            </span>
          </div>
          <div className="animate-fade-up-delay-1">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] text-black dark:text-white">
              LAI<br />
              <span className="text-[#ff0000]">WENG HONG</span>
            </h1>
          </div>
          <div className="animate-fade-up-delay-2 space-y-4">
            <div className="font-dot-matrix text-[11px] uppercase tracking-[0.3em] text-black/50 dark:text-white/50">
              [ SOFTWARE ENGINEER ]
            </div>
            <p className="text-sm md:text-base text-black/60 dark:text-white/60 text-justify leading-relaxed max-w-lg font-light">
              Specializing in AWS Cloud Engineering and Event-Driven Architectures. Building high-throughput, scalable backend systems and modern frontend interfaces.
            </p>
          </div>
          <div className="animate-fade-up-delay-3 flex gap-8 pt-2">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-3xl md:text-4xl font-extrabold tracking-tight text-black dark:text-white">{stat.value}</span>
                <span className="font-dot-matrix text-[9px] uppercase tracking-[0.3em] text-black/40 dark:text-white/40 mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
          <div className="animate-fade-up-delay-4 flex flex-wrap gap-4 pt-2">
            <Link href="/experiences" className="font-dot-matrix text-[10px] uppercase tracking-[0.2em] px-6 py-3 border border-black dark:border-white text-black dark:text-white hover:bg-[#ff0000] hover:border-[#ff0000] hover:text-white transition-colors duration-200">
              [ VIEW EXPERIENCE ]
            </Link>
            <a href={assetUrl("/resume.pdf")} target="_blank" rel="noopener noreferrer" className="font-dot-matrix text-[10px] uppercase tracking-[0.2em] px-6 py-3 border border-black/20 dark:border-white/20 text-black/50 dark:text-white/50 hover:border-[#ff0000] hover:text-[#ff0000] transition-colors duration-200">
              [ DOWNLOAD RESUME .PDF ]
            </a>
          </div>
        </div>
        <div className="lg:col-span-5 relative flex justify-center items-center">
          <div className="relative w-full max-w-sm animate-fade-up-delay-2">
            <div className="relative aspect-[4/5] border border-black dark:border-white overflow-hidden scanlines">
              <Image src={assetUrl("/images/lai-weng-hong.png")} alt="Lai Weng Hong — Software Engineer" className="w-full h-full object-cover " width={600} height={800} priority />
            </div>
            <div className="absolute -bottom-6 left-0 font-dot-matrix text-[9px] uppercase tracking-[0.2em] text-black/30 dark:text-white/30">SYS.PROFILE_IMG</div>
            <div className="absolute -top-6 right-0 font-dot-matrix text-[9px] uppercase tracking-[0.2em] text-black/30 dark:text-white/30">V.2026</div>
          </div>
        </div>
      </div>
      <div className="relative z-10 mt-20 pt-8 border-t border-black/10 dark:border-white/10 animate-fade-up-delay-4">
        <div className="font-dot-matrix text-[9px] uppercase tracking-[0.3em] text-black/30 dark:text-white/30 mb-4">CORE.TECH_STACK</div>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span key={tech} className="font-dot-matrix text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 border border-black/15 dark:border-white/15 text-black/50 dark:text-white/50 hover:border-[#ff0000] hover:text-[#ff0000] transition-colors duration-200 cursor-default">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}