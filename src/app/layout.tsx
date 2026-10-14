import "./globals.css";
import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import Header from "@/components/Header";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "@fortawesome/fontawesome-free/css/all.min.css";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const TITLE = `${SITE_NAME} | Founder & Builder`;
const DESCRIPTION =
  "Jayesh Padhiar is a founder and builder working on shippin.io, a permanent software discovery directory, and an engineer at Jio. Writing, bookshelf and what I'm doing now.";
const SHARE_IMAGE = "/images/profile-live.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: `%s | ${SITE_NAME}` },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: SHARE_IMAGE, width: 576, height: 576, alt: SITE_NAME }],
  },
  twitter: { card: "summary" },
};

// Runs before first paint so the saved theme is applied without a flash.
const themeScript = `try{var t=localStorage.getItem("theme");document.documentElement.setAttribute("data-theme",t==="dark"?"dark":"light")}catch(e){document.documentElement.setAttribute("data-theme","light")}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${robotoMono.className} antialiased min-h-dvh flex flex-col`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:border focus:border-foreground"
        >
          Skip to content
        </a>
        <Header />
        {children}
      </body>
    </html>
  );
}
