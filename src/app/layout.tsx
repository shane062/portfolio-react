import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopNavBar from "../components/TopNavBar";
import { Footer } from '../components/Footer'


const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <TopNavBar/>
        <main className="min-h-[calc(100vh-160px)]">
        {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
