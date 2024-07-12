import type { Metadata } from "next";
import { Kode_Mono } from "next/font/google";
import "./globals.css";
import TopNavBar from "../components/TopNavBar";
import { Footer } from '../components/Footer'
import { ThemeProvider } from "@/components/theme-provider"

const kodeMono  = Kode_Mono({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio - Lai Weng Hong",
  description: "Welcome to the portfolio of Lai Weng Hong, showcasing projects and experiences in web development and software engineering.",
  authors: [{url:"https://www.linkedin.com/in/weng-hong-lai-a02769256/", name:"Lai Weng Hong"}],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={kodeMono.className}>
        <div className="hidden xxs:block">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TopNavBar/>
          <main  className="hidden xxs:flex">
            {children}
          </main>
          <Footer/>
        </ThemeProvider>
        </div>
        <div className="flex xxs:hidden justify-center align-center items-center min-h-screen">
          <p className="p-4 text-center text-xs">Your screen resolution is too low for the best experience. Please adjust your screen resolution.</p>
        </div>
      </body>
    </html>
  );
}
