import type { Metadata } from "next";
import { Balthazar, Fredoka, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

const balthazar = Balthazar({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-balthazar",
});

const fredoka = Fredoka({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-fredoka",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Flux - File Sharing",
  description: "Let your files flow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body
        className={
          "min-h-full flex flex-col bg-[#F5F1F8] " +
          `${balthazar.variable} ${fredoka.variable} ${inter.variable} ${playfair.variable}`
        }
      >
        <header className="max-w-350 mx-auto flex w-full items-center border-b border-[#d8cfdf] py-2">
          <Link
            className="flex w-full flex-1 items-center justify-start gap-5 px-5"
            href="/"
          >
            <Image
              src="/flux-logo.png"
              alt="Flux"
              width={118}
              height={28}
              priority
              className="h-14 w-auto"
            />
            <h1 className="font-fredoka text-3xl text-[#CCA8D8]">FLUX</h1>
          </Link>
        </header>
        <main className="relative">
          <Image
            src={"/site-bg.png"}
            alt="site-bg"
            width={1000}
            height={100}
            className="absolute w-screen h-auto"
          ></Image>
          <div className="z-5">{children}</div>
        </main>
      </body>
    </html>
  );
}
