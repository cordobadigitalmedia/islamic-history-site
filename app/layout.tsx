import "@/styles/globals.css"
import "@/styles/styles.css"
import type { Viewport } from "next"
import { Noto_Sans, Noto_Serif } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"

export const viewport: Viewport = {
  width: "device-width",
}

const noto_sans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
})

const noto_serif = Noto_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-serif",
})

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={noto_sans.variable + " " + noto_serif.variable}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            <div
              className="min-h-screen p-4 md:p-8 bg-fixed"
              style={{
                backgroundImage:
                  "url('./7777ec68-bdc5-431c-905e-56ee7b09af8e.webp')",
              }}
            >
              {children}
            </div>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
