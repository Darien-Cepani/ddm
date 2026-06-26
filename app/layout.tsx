import type { Metadata } from "next";
import { DM_Sans, Gelasio } from "next/font/google";
import "./globals.css";
import { themeInitScript } from "@/lib/theme";
import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { Cursor } from "@/components/fx/Cursor";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

const gelasio = Gelasio({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-gelasio",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ddm.al"),
  title: {
    default: "DDM — Do Digital Media · Stop planning, start doing",
    template: "%s · DDM",
  },
  description:
    "DDM builds brands that dominate the market — premium websites, CRM, ecommerce, marketing, content and design. Clean, fast, animated, no headache.",
  keywords: ["digital agency", "web design", "marketing", "CRM", "ecommerce", "branding", "Albania"],
  openGraph: {
    title: "DDM — Do Digital Media",
    description: "Premium websites for dirt cheap. No monthly bleed. Just more visibility, revenue, clients.",
    url: "https://ddm.al",
    siteName: "DDM",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "DDM — Do Digital Media" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${gelasio.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
        <Cursor />
      </body>
    </html>
  );
}
