import type { Metadata } from "next";
import { Kode_Mono } from "next/font/google";
import "./globals.css";
import TopNavBar from "../components/TopNavBar";
import { Footer } from '../components/Footer'
import { ThemeProvider } from "@/components/theme-provider"

const kode_mono = Kode_Mono({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio - Lai Weng Hong",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={kode_mono.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TopNavBar />
          <main className="">
            {children}
          </main>
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}
