import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import Providers from "@/components/Providers";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { Metadata } from "next";

const geist = Geist({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = ({
  title: "Next Wave XR",
  description: "The future of immersive experiences",
  icons: {
    icon: "/images/NextWaveXRLogoV2.png",
    apple: "/images/NextWaveXRLogoV2.png",
  },
  openGraph: {
    title: "Next Wave XR",
    description: "The future of immersive experiences",
    url: "https://www.nextwavexr.com",
    images: [
      {
        url: "/images/NextWaveXRLogoV2.png",
        width: 1200,
        height: 630,
      },
    ],
  },
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
    >
      <body>
        <ThemeProvider>
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
