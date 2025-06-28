import "./globals.css";
import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";

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
        className={`h-screen w-screen ${robotoMono.className} antialiased flex flex-row items-start justify-start`}
      >
        {children}
      </body>
    </html>
  );
}
