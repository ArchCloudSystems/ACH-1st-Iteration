"use client"

import { Heading } from "@/components/heading"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Button } from "@/components/ui/button"
import { client } from "@/lib/client"
import { STRIPE_PLANS } from "@/lib/stripe"
import { useSession, signIn } from "next-auth/react"
import { useMutation } from "@tanstack/react-query"
import { CheckIcon } from "lucide-react"
import { useRouter } from "next/navigation"

const Page = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const { mutate: createCheckoutSession, isPending } = useMutation({
    mutationFn: async () => {
      const res = await client.payment.createCheckoutSession.$post()
      return await res.json()
    },
    onSuccess: ({ url }) => {
      if (url) router.push(url)
    },
  })

  const handleGetAccess = () => {
    if (session) {
      createCheckoutSession()
    } else {
      signIn("google", { callbackUrl: "/pricing?intent=upgrade" })
    }
  }

  return (
    <div className="bg-brand-25 py-24 sm:py-32">
      <MaxWidthWrapper>
        <div className="mx-auto max-w-2xl sm:text-center">
          <Heading className="text-center">Simple, transparent pricing</Heading>
          <p className="mt-6 text-base/7 text-gray-600 max-w-prose text-center text-pretty">
            Choose the plan that best fits your needs. All plans include a 30-day
            money-back guarantee.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-xl grid-cols-1 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {/* Free Plan */}
          <div className="flex flex-col p-6 bg-white rounded-3xl ring-1 ring-gray-200">
            <h3 className="text-lg font-semibold leading-8 text-gray-900">
              Free
            </h3>
            <p className="mt-4 text-sm leading-6 text-gray-600">
              Perfect for getting started and exploring features.
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight text-gray-900">
                $0
              </span>
              <span className="text-sm font-semibold leading-6 text-gray-600">
                /month
              </span>
            </p>

            <ul
              role="list"
              className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
            >
              {[
                "1,000 events per month",
                "3 team members",
                "Basic analytics",
                "Email support",
                "Community access",
              ].map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    className="h-6 w-5 flex-none text-brand-700"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              onClick={() => router.push("/sign-up")}
              variant="outline"
              className="mt-8"
            >
              Get Started
            </Button>
          </div>

          {/* Pro Plan */}
          <div className="flex flex-col p-6 bg-brand-700 rounded-3xl ring-1 ring-gray-200">
            <h3 className="text-lg font-semibold leading-8 text-white">Pro</h3>
            <p className="mt-4 text-sm leading-6 text-gray-200">
              For teams that need more power and advanced features.
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight text-white">
                ${STRIPE_PLANS.PRO.price}
              </span>
              <span className="text-sm font-semibold leading-6 text-gray-200">
                /month
              </span>
            </p>

            <ul
              role="list"
              className="mt-8 space-y-3 text-sm leading-6 text-gray-200"
            >
              {STRIPE_PLANS.PRO.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    className="h-6 w-5 flex-none text-brand-200"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              onClick={handleGetAccess}
              disabled={isPending}
              className="mt-8 bg-white text-brand-700 hover:bg-gray-100"
            >
              {isPending ? "Processing..." : "Upgrade to Pro"}
            </Button>
          </div>
        </div>

        <div className="mt-16 max-w-2xl text-center mx-auto">
          <h3 className="text-lg font-semibold text-gray-900">
            Enterprise Plan
          </h3>
          <p className="mt-4 text-sm text-gray-600">
            Need a custom solution? Contact our sales team for a tailored plan
            that meets your specific requirements.
          </p>
          <Button
            variant="outline"
            className="mt-6"
            onClick={() => router.push("/contact")}
          >
            Contact Sales
          </Button>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

export default Page