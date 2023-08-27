import { PrismicText } from "@prismicio/react"
import * as prismic from "@prismicio/client"

import { Bounded } from "./Bounded"
import { Heading } from "./Heading"
import { PrismicRichText } from "./PrismicRichText"

function SignUpForm({ settings }) {
  return (
    <div className="px-4">
      <form
        action="/api/sign-up"
        method="post"
        className="grid w-full max-w-xl grid-cols-1 gap-6"
      >
        {prismic.isFilled.richText(settings.data.newsletterDisclaimer) && (
          <div className="text-center tracking-tight text-slate-300">
            <PrismicRichText
              field={settings.data.newsletterDescription}
              components={{
                heading1: ({ children }) => (
                  <Heading
                    as="h2"
                    size="6xl"
                    className="mb-4 text-white last:mb-0"
                  >
                    {children}
                  </Heading>
                ),
                paragraph: ({ children }) => (
                  <p className="mb-4 last:mb-0">{children}</p>
                )
              }}
            />
          </div>
        )}
        <div className="grid grid-cols-1 gap-2">
          <div className="relative">
            <label>
              <span className="sr-only">Email address</span>
              <input
                name="email"
                type="email"
                placeholder="jane.doe@example.com"
                required={true}
                className="w-full rounded border border-slate-500 bg-slate-600 py-3 pl-3 pr-10 text-white placeholder-slate-400"
              />
            </label>
            <button
              type="submit"
              className="absolute bottom-0 right-0 top-0 flex items-center justify-center px-3 text-2xl text-slate-400"
            >
              <span className="sr-only">Submit</span>
              <span aria-hidden={true}>&rarr;</span>
            </button>
          </div>
          {prismic.isFilled.richText(settings.data.newsletterDisclaimer) && (
            <p className="text-center text-xs text-slate-400">
              <PrismicText field={settings.data.newsletterDisclaimer} />
            </p>
          )}
        </div>
      </form>
    </div>
  )
}

export function Footer({ settings }) {
  const mailto = `mailto:${settings.data.contact_email}`
  return (
    <Bounded as="footer" className="bg-gray-800 pb-10 text-slate-300 md:pb-10">
      <div className="justify-items-center gap-20 md:gap-10">
        {prismic.isFilled.richText(settings.data.newsletter_bar) && (
          <SignUpForm settings={settings} />
        )}
        <div className="mx-auto w-full max-w-3xl text-center text-xs font-semibold tracking-tight">
          {settings.data.contact_text &&
            settings.data.contact_phone &&
            settings.data.contact_email && (
              <span> {settings.data.contact_text} | </span>
            )}{" "}
          {settings.data.contact_phone && (
            <span> {settings.data.contact_phone} | </span>
          )}{" "}
          {settings.data.contact_email && (
            <a href={mailto}>{settings.data.contact_email}</a>
          )}
          {/* <PrismicNextLink href="https://prismic.io" className="text-white">
            Prismic
          </PrismicNextLink> */}
        </div>
        <div className="mx-auto w-full max-w-3xl text-center text-xs font-semibold tracking-tight">
          {settings.data.address}
        </div>
        <div className="mx-auto w-full max-w-3xl text-center text-xs font-semibold tracking-tight">
          2023 {prismic.asText(settings.data.siteTitle)}
        </div>
      </div>
    </Bounded>
  )
}
