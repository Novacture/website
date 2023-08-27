import { notFound } from "next/navigation"
import { SliceZone } from "@prismicio/react"
import * as prismic from "@prismicio/client"

import { createClient } from "@/prismicio"
import { components } from "@/slices"
import { Layout } from "@/components/Layout"
import { getLocales } from "@/lib/getLocales"

/**
 * This page renders a Prismic Document dynamically based on the URL.
 */

/**
 * @typedef {{ uid: string }} Params
 */

/**
 * @param {{ params: Params }}
 * @returns {Promise<import("next").Metadata>}
 */
export async function generateMetadata({ params }) {
  const client = createClient()
  const page = await client
    .getByUID("page", params.uid, { lang: params.lang })
    .catch(() => notFound())
  const settings = await client.getSingle("settings", { lang: params.lang })

  return {
    title: `${prismic.asText(page.data.title)} | ${prismic.asText(
      settings.data.siteTitle
    )}`,
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title || undefined,
      images: [
        {
          url: page.data.meta_image.url || ""
        }
      ]
    }
  }
}

/**
 * @param {{ params: Params }}
 */
export default async function Page({ params }) {
  const client = createClient()

  const page = await client
    .getByUID("page", params.uid, { lang: params.lang })
    .catch(() => notFound())
  const navigation = await client.getSingle("navigation", {
    lang: params.lang
  })
  const settings = await client.getSingle("settings", { lang: params.lang })

  const locales = await getLocales(page, client)

  return (
    <Layout locales={locales} navigation={navigation} settings={settings}>
      <SliceZone slices={page.data.slices} components={components} />
    </Layout>
  )
}

export async function generateStaticParams() {
  const client = createClient()

  /**
   * Query all Documents from the API, except the homepage.
   */
  const pages = await client.getAllByType("page", {
    predicates: [prismic.filter.not("my.page.uid", "home")],
    lang: "*"
  })

  /**
   * Define a path for every Document.
   */
  return pages.map((page) => {
    return { uid: page.uid, lang: page.lang }
  })
}
