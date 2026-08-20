import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";

import { ThemeProvider, ScrollProvider } from "@/providers";
import { PageContainer, SiteFooter } from "@/components/layout";
import { SiteHeader } from "@/components/navigation";
import { ScrollProgress } from "@/components/motion";
import { SiteBackground } from "@/components/site-background";
import { JsonLd } from "@/components/json-ld";
import { IntroLoader } from "@/components/intro-loader";

import { SITE_URL } from "@/constants";
import { cn } from "@/lib/utils";

import "lenis/dist/lenis.css";
import "./globals.css";

/* Type system:
   - Clash Display → display + body / UI
   - Telma         → script accent
   - Instrument    → editorial accent
   - Geist Mono    → code / metadata
 */

const fontInstrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

/* Local display/script fonts */
const fontClash = localFont({
  src: "./assets/ClashDisplay_Complete/Fonts/WEB/fonts/ClashDisplay-Variable.woff2",
  variable: "--font-clash",
  weight: "200 700",
  display: "swap",
});

const fontTelma = localFont({
  src: "./assets/Telma_Complete/Fonts/WEB/fonts/Telma-Variable.woff2",
  variable: "--font-telma",
  weight: "300 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Veer Tiwari — AI / ML Engineer",
    template: "%s · Veer Tiwari",
  },

  description:
    "Veer Tiwari is an AI / ML Engineer focused on Machine Learning, Deep Learning, Generative AI, NLP, Computer Vision, and RAG systems.",

  metadataBase: new URL(SITE_URL),

  alternates: {
    canonical: "/",
  },

  keywords: [
    "Veer Tiwari",
    "AI ML Engineer",
    "Machine Learning Engineer",
    "Generative AI",
    "Deep Learning",
    "RAG",
    "NLP",
    "Computer Vision",
    "Python",
    "AI Engineer",
    "Machine Learning",
    "Artificial Intelligence",
  ],

  authors: [
    {
      name: "Veer Tiwari",
      url: SITE_URL,
    },
  ],

  creator: "Veer Tiwari",

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Veer Tiwari",
    title: "Veer Tiwari — AI / ML Engineer",
    description:
      "AI / ML Engineer building practical Machine Learning, Deep Learning, and Generative AI systems.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Veer Tiwari — AI / ML Engineer",
    description:
      "AI / ML Engineer building practical Machine Learning, Deep Learning, and Generative AI systems.",
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        GeistMono.variable,
        fontInstrument.variable,
        fontClash.variable,
        fontTelma.variable,
        "h-full",
      )}
    >
      <body
        className="flex min-h-dvh flex-col"
        suppressHydrationWarning
      >
        {/* Initial loading screen */}
        <IntroLoader />

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SiteBackground />

          <ScrollProvider>
            <a href="#main" className="skip-link">
              Skip to content
            </a>

            <ScrollProgress />

            <JsonLd />

            <SiteHeader />

            <PageContainer>
              {children}
            </PageContainer>

            <SiteFooter />
          </ScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
