import type { Metadata } from "next";
import { DotGothic16, JetBrains_Mono, Geist } from "next/font/google";
import "./globals.css";
import { GlobalParticleField } from "@/components/GlobalParticleField";
import { Header } from "@/components/Header";
import { SmoothScroll } from "@/components/SmoothScroll";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const dotGothic = DotGothic16({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dot-gothic",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zain Habib — Mobile Application Developer at Mobil80",
  description:
    "Zain Habib builds production-grade Flutter apps for iOS and Android — offline-first field operations, AWS Amplify, GraphQL, and Firebase.",
  icons: {
    icon: [{ url: "/icon", type: "image/png" }],
    apple: [{ url: "/apple-icon", type: "image/png" }],
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
      className={cn("dark", dotGothic.variable, jetbrains.variable, geist.variable)}
    >
      <body className="antialiased bg-background">
        <SmoothScroll>
          <div className="relative min-h-screen">
            <GlobalParticleField />
            <div className="relative z-10">
              <Header />
              {children}
            </div>
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
