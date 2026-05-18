import type { Metadata, Viewport } from "next";
import { Inter, Kode_Mono, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import TopNavBar from "../components/TopNavBar";
import { Footer } from '../components/Footer';
import { ThemeProvider } from "@/components/theme-provider";

/**
 * Font declarations — loaded via next/font for zero-FOUT performance.
 * These replace the old CSS @import approach which was render-blocking.
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const kodeMono = Kode_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-kode-mono",
});

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-share-tech-mono",
});

/** SEO metadata — used by Next.js for <head> generation */
export const metadata: Metadata = {
  title: "Lai Weng Hong — Software Engineer",
  description: "Software Engineer specializing in AWS Cloud Engineering, Event-Driven Architectures, and full-stack development. View my experience, projects, and achievements.",
  keywords: ["Software Engineer", "Full Stack Developer", "AWS", "Cloud Engineering", "React", "Next.js", "TypeScript"],
  authors: [{ name: "Lai Weng Hong" }],
  openGraph: {
    title: "Lai Weng Hong — Software Engineer",
    description: "Software Engineer specializing in AWS Cloud Engineering, Event-Driven Architectures, and full-stack development.",
    type: "website",
  },
};

/** Viewport config — ensures proper mobile scaling */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${kodeMono.variable} ${shareTechMono.variable} ${kodeMono.className}`}
        suppressHydrationWarning
      >
        {/* Main app — hidden below xxs (340px) breakpoint */}
        <div className="hidden xxs:block">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <TopNavBar />
            <main className="hidden xxs:block">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </div>

        {/* Ultra-small screen fallback */}
        <div className="flex xxs:hidden justify-center align-center items-center min-h-screen">
          <p className="p-4 text-center text-xs font-dot-matrix uppercase tracking-widest">
            [ RESOLUTION TOO LOW — PLEASE RESIZE ]
          </p>
        </div>
      </body>
    </html>
  );
}
