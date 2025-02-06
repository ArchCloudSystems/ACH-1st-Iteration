import { Heading } from "@/components/heading"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Check, Star, Shield, Cloud, Zap, BarChart } from "lucide-react"
import { ShinyButton } from "@/components/shiny-button"
import { DiscordExample } from "@/components/discord-example"
import Image from "next/image"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Icons } from "@/components/icons"
import { Header } from "@/components/header"
import Link from "next/link"
import { InfrastructureOverview } from "@/components/infrastructure-overview"

export default function Page() {
  const codeSnippet = `await fetch('https://api.archcloudhub.com/v1/events', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    type: 'deployment',
    service: 'web-frontend',
    environment: 'production',
    version: 'v2.1.0',
    metadata: {
      duration: '45s',
      status: 'success'
    }
  })
})`

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <section className="relative py-24 sm:py-32 bg-brand-25">
        <MaxWidthWrapper className="text-center">
          <div className="relative mx-auto text-center flex flex-col items-center gap-10">
            <div className="flex items-center gap-2 text-sm px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100">
              <span className="px-3 py-1 text-xs bg-brand-100 text-brand-800 rounded-full">New</span>
              <span className="text-gray-600">Introducing Enterprise SSO & SAML Support</span>
            </div>

            <div>
              <Heading>
                <span>Enterprise Cloud Management,</span>
                <br />
                <span className="relative bg-gradient-to-r from-brand-700 to-brand-800 text-transparent bg-clip-text">
                  Built for Scale
                </span>
              </Heading>
            </div>

            <p className="text-lg text-gray-600 max-w-2xl text-center text-pretty">
              ArchCloudHub provides enterprise-grade cloud monitoring and management. Get real-time insights for{" "}
              <span className="font-semibold text-gray-700">
                deployments, system performance, and security events
              </span>{" "}
              across your infrastructure.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <ShinyButton
                href="/sign-up"
                className="relative z-10 h-14 px-8 text-base shadow-lg transition-shadow duration-300 hover:shadow-xl"
              >
                Start Free Trial
              </ShinyButton>
              
              <Link 
                href="/docs"
                className="inline-flex h-14 items-center justify-center px-8 text-base font-medium text-brand-700 bg-white border border-brand-200 rounded-md hover:bg-brand-50 transition-colors"
              >
                View Documentation
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="text-brand-600" size={20} />
                Enterprise Security
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Cloud className="text-brand-600" size={20} />
                Multi-Cloud Support
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Zap className="text-brand-600" size={20} />
                Real-time Monitoring
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <DiscordExample />

      <section className="py-24 bg-white">
        <MaxWidthWrapper>
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold text-brand-600">Features</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to manage your cloud infrastructure
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Real-time Monitoring",
                description: "Monitor your infrastructure in real-time with instant alerts and notifications.",
                icon: BarChart,
              },
              {
                title: "Multi-Cloud Support",
                description: "Manage resources across AWS, Azure, and Google Cloud from a single dashboard.",
                icon: Cloud,
              },
              {
                title: "Enterprise Security",
                description: "Bank-grade security with SSO, SAML, and role-based access control.",
                icon: Shield,
              },
              {
                title: "Advanced Analytics",
                description: "Gain deep insights into your infrastructure with detailed analytics and reporting.",
                icon: BarChart,
              },
              {
                title: "Automated Scaling",
                description: "Automatically scale your resources based on real-time demand and metrics.",
                icon: Zap,
              },
              {
                title: "24/7 Support",
                description: "Enterprise-grade support with dedicated account managers and SLAs.",
                icon: Shield,
              },
            ].map((feature, index) => (
              <div key={index} className="relative p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <feature.icon size={24} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="py-24 bg-gray-50">
        <MaxWidthWrapper>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Trusted by leading enterprises
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                Join hundreds of enterprises that trust ArchCloudHub for their cloud infrastructure management needs.
              </p>
              
              <div className="mt-12 space-y-8">
                {[
                  {
                    stat: "99.99%",
                    label: "Uptime SLA",
                  },
                  {
                    stat: "24/7",
                    label: "Enterprise Support",
                  },
                  {
                    stat: "500+",
                    label: "Enterprise Customers",
                  },
                ].map((stat, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-none">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-600 text-white">
                        <Check size={24} />
                      </div>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{stat.stat}</p>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-full w-full bg-gradient-to-br from-brand-100 to-brand-50 rounded-2xl" />
              </div>
              <div className="relative p-8">
                <InfrastructureOverview />
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="py-24 bg-white">
        <MaxWidthWrapper>
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Join leading enterprises in managing their cloud infrastructure with ArchCloudHub.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <ShinyButton
                href="/sign-up"
                className="px-8 py-3"
              >
                Start Free Trial
              </ShinyButton>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-brand-700 bg-white border border-brand-200 rounded-md hover:bg-brand-50 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  )
}