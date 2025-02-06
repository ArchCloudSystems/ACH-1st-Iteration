"use client"

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import Image from "next/image"

export default function SignUp() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Start monitoring your cloud infrastructure
          </p>
        </div>

        <Button
          onClick={() => signIn("dev-google", { callbackUrl: "/welcome" })}
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