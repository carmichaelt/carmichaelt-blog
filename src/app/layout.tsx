//import Footer from "@/app/_components/footer";
import ConvexClientProvider from "@/components/providers/convex-provider-with-clerk";
import { ClerkProvider } from "@clerk/nextjs";
import { HOME_OG_IMAGE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import cn from "classnames";
import "./globals.css";
import { Navbar } from "./_components/navbar";
import localFont from "next/font/local";
import { SidebarProvider } from "@/components/ui/sidebar";

const junicode = localFont({
  src: "../../public/fonts/junicode/Junicode.ttf",
  display: "swap",
  variable: "--font-junicode",
});

//const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `Carmichaelt. Blog`,
  description: `A Partially Pre-rendered blog using Next.js and Convex.`,
  openGraph: {
    images: [HOME_OG_IMAGE_URL],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={junicode.className}>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </head>
      <body className={cn("dark:bg-slate-900 dark:text-slate-400")}>
        {/* <ThemeSwitcher /> */}
        <ClerkProvider>
          <ConvexClientProvider>
            <NuqsAdapter>
              <div className="font-junicode">
                <div className="[--header-height:calc(--spacing(14))]">
                <SidebarProvider className="flex flex-col">
                  <div className="sticky top-0 z-100">
                    <Navbar />
                  </div>
                  {children}
                  <div className="bottom-0 z-100">
                    {/*
                    <Footer />
                    */}
                    </div>
                  </SidebarProvider>
                </div>
              </div>
              <Toaster position="top-right" />
            </NuqsAdapter>
          </ConvexClientProvider>
        </ClerkProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
