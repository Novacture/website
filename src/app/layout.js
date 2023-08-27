import "./globals.css"

import { Inter } from "next/font/google"
import { PrismicText } from "@prismicio/react"
import { PrismicNextLink, PrismicPreview } from "@prismicio/next"
import * as prismic from "@prismicio/client"

import { createClient } from "@/prismicio"
import { Bounded } from "@/components/Bounded"
import { repositoryName } from "@/prismicio"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
})

/**
 * @param {{ children: React.ReactNode }}
 */
export default async function RootLayout({ children }) {
  const client = createClient()
  const settings = await client.getSingle("settings")

  return (
    <html className={inter.variable}>
      <head>
        <title>{prismic.asText(settings.data.siteTitle)}</title>
        <meta
          name="description"
          content={prismic.asText(settings.data.siteDescription)}
        />
        <meta
          name="application-name"
          content={prismic.asText(settings.data.siteTitle)}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="any"
          href="https://images.prismic.io/novacture/3fb5e112-5b19-4b24-9df2-2debcea51353_favicon.png?auto=compress,format"
        />
      </head>
      <body className="overflow-x-hidden antialiased">
        {/* @ts-expect-error Async Server Component */}
        {/* <Header /> */}
        {children}
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  )
}

async function Header() {
  const client = createClient()
  const settings = await client.getSingle("settings")
  const navigation = await client.getSingle("navigation")

  return (
    <Bounded as="header" yPadding="sm">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 leading-none">
        <PrismicNextLink
          href="/"
          className="text-xl font-semibold tracking-tight"
        >
          <PrismicText field={settings.data.siteTitle} />
        </PrismicNextLink>
        <nav>
          <ul className="flex flex-wrap gap-6 md:gap-10">
            {navigation.data?.links.map((item) => (
              <li
                key={prismic.asText(item.label)}
                className="font-semibold tracking-tight text-slate-800"
              >
                <PrismicNextLink field={item.link}>
                  <PrismicText field={item.label} />
                </PrismicNextLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Bounded>
  )
}
