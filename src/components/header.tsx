"use client"

import { MaxWidthWrapper } from "./max-width-wrapper"
import { Button } from "./ui/button"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const Header = () => {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg">
      <MaxWidthWrapper>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">
              Arch<span className="text-brand-600">CloudHub</span>
            </span>
          </Link>

          <div className="hidden items-center space-x-6 sm:flex">
            <nav className="flex items-center space-x-6">
              <Link
                href="/docs"
                className="text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                Documentation
              </Link>
              <Link
                href="/pricing"
                className="text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                Pricing
              </Link>
            </nav>

            {!session ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/sign-in"
                  className="text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  className="inline-flex items-center justify-center rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
                >
                  Get started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ) : (
              <Link href="/dashboard">
                <Button>Dashboard</Button>
              </Link>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  )
}