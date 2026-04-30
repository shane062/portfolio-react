import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-8 max-w-7xl mx-auto flex flex-col justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: Content */}
        <div className="lg:col-span-6 space-y-12">
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter leading-[1.1] text-foreground">
            Hello, I'm <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-purple-600">
              Lai Weng Hong.
            </span>
          </h1>
          
          <div className="space-y-8 max-w-xl">
            <div className="flex items-start gap-5 group">
              <div className="mt-1 flex-shrink-0 w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-teal-600 transition-colors group-hover:bg-teal-100 dark:group-hover:bg-teal-900/30">
                <span className="material-symbols-outlined">settings</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold tracking-tight">Full-Stack Architect</h3>
                <p className="text-muted-foreground leading-relaxed">Specializing in building robust, scalable applications using modern ecosystems like Next.js and high-performance backend patterns.</p>
              </div>
            </div>

            <div className="flex items-start gap-5 group">
              <div className="mt-1 flex-shrink-0 w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-purple-600 transition-colors group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30">
                <span className="material-symbols-outlined">cloud</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold tracking-tight">Cloud Infrastructure</h3>
                <p className="text-muted-foreground leading-relaxed">Engineering cloud-native environments on AWS with Docker and Kubernetes for high availability and zero-downtime deployments.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Portrait & Floating Icons */}
        <div className="lg:col-span-6 relative flex justify-center items-center">
          <div className="relative z-10 w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden glow-frame border-[8px] border-white dark:border-slate-900">
            <Image
              src="/images/lai-weng-hong.png" // Ensure this image path is correct in your public folder
              alt="Lai Weng Hong Professional Portrait"
              className="w-full h-full object-cover"
              width={600}
              height={800}
              priority
            />
          </div>

          {/* Floating Elements */}
          <div className="absolute inset-0 z-20 pointer-events-none hidden md:block">
            {/* Next.js */}
            <div className="absolute top-[10%] left-[5%] backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 p-4 rounded-2xl shadow-xl flex flex-col items-center gap-1 border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">Frontend</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                <span className="font-bold text-sm">Next.js</span>
              </div>
            </div>
            
            {/* Docker */}
            <div className="absolute bottom-[25%] right-[5%] backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 p-4 rounded-2xl shadow-xl flex flex-col items-center gap-1 border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">DevOps</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span className="font-bold text-sm">Docker</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}