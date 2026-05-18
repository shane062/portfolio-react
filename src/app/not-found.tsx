import Link from "next/link";

/**
 * Custom 404 page — Nothing brutalist aesthetic.
 * Catches all invalid routes and provides a clear path back to Home.
 */
export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-8">
      <div className="fixed inset-0 noise-bg pointer-events-none z-0"></div>
      <div className="relative z-10 text-center space-y-8 max-w-md">
        {/* Error code */}
        <div className="font-dot-matrix text-[9px] uppercase tracking-[0.3em] text-black/30 dark:text-white/30">
          SYS.ERROR_404
        </div>

        {/* Heading */}
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-black dark:text-white">
          4<span className="text-[#ff0000]">0</span>4
        </h1>

        {/* Message */}
        <p className="font-dot-matrix text-[11px] uppercase tracking-[0.2em] text-black/50 dark:text-white/50 leading-relaxed">
          [ PATH.NOT_FOUND ] — The requested resource does not exist in this system.
        </p>

        {/* CTA */}
        <Link
          href="/"
          className="inline-block font-dot-matrix text-[10px] uppercase tracking-[0.2em] px-6 py-3 border border-black dark:border-white text-black dark:text-white hover:bg-[#ff0000] hover:border-[#ff0000] hover:text-white transition-colors duration-200"
        >
          [ SYSTEM.HOME ]
        </Link>
      </div>
    </main>
  );
}
