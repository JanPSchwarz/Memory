import { Atkinson_Hyperlegible } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

const atkinsonHyperlegible = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--default",
});

export const metadata = {
  title: "Memory App",
  description:
    "Play Memory as single or multiplayer by selecting your favorite deck. Enjoy!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${atkinsonHyperlegible.variable} antialiased`}>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
