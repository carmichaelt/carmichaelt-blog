import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants";

import "./globals.css";

const junicode = localFont({
  src: [
    {
      path: "../../public/fonts/junicode/Junicode.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/junicode/Junicode-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/junicode/Junicode-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/junicode/Junicode-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-junicode",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: ["/tc-logo.png"],
  },
  icons: {
    icon: "/tc-logo.png",
    apple: "/tc-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${junicode.variable}`}>
      <head>
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body className={`${junicode.className} min-h-dvh bg-black text-zinc-200 antialiased`}>
        <div className="flex min-h-dvh flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
