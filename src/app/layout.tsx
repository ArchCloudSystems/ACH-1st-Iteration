import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Providers } from "@/components/providers"
import { EB_Garamond } from "next/font/google"
import { cn } from "@/utils"
import "./globals.css"
import ErrorBoundary from "@/components/error-boundary"
import { AuthProvider } from "@/components/auth-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const eb_garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
})

export const metadata: Metadata = {
  title: "ArchCloudHub - Enterprise Cloud Solutions",
  description: "Enterprise-grade cloud monitoring and management platform",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn(inter.variable, eb_garamond.variable)}>
      <body className="min-h-[calc(100vh-1px)] flex flex-col font-sans bg-brand-50 text-brand-950 antialiased">
        <ErrorBoundary>
          <AuthProvider>
            <main className="relative flex-1 flex flex-col">
              <Providers>{children}</Providers>
            </main>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}