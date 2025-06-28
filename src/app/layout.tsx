import "./globals.css";
import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import Header from "@/components/Header";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Jayesh Padhiar",
  description: "Full Stack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`h-screen w-screen ${robotoMono.className} antialiased flex flex-col items-start justify-start overflow-hidden`}
      >
        <Header />
        <div className="w-full h-full flex flex-col items-start justify-start overflow-y-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
