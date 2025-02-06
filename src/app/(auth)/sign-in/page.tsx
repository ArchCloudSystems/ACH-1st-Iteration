"use client"

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"

export default function SignIn() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
  const intent = searchParams.get("intent")

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Sign in to ArchCloudHub
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enterprise cloud monitoring and management
          </p>
        </div>

        <Button
          onClick={() => signIn("dev-google", { 
            callbackUrl: intent ? `/dashboard?intent=${intent}` : callbackUrl 
          })}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300"
        >
          <Image
            src="/google.svg"
            alt="Google logo"
            width={20}
            height={20}
          />
          Continue with Google
        </Button>
      </div>
    </div>
  )
}