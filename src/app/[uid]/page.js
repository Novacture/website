import { notFound } from "next/navigation"
import { SliceZone } from "@prismicio/react"
import * as prismic from "@prismicio/client"

import { createClient } from "@/prismicio"
import { components } from "@/slices"

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
  const page = await client.getByUID("page", params.uid).catch(() => notFound())
  const settings = await client.getSingle("settings")

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
  const page = await client.getByUID("page", params.uid).catch(() => notFound())

  return <SliceZone slices={page.data.slices} components={components} />
}

export async function generateStaticParams() {
  const client = createClient()

  /**
   * Query all Documents from the API, except the homepage.
   */
  const pages = await client.getAllByType("page", {
    predicates: [prismic.filter.not("my.page.uid", "home")]
  })

  /**
   * Define a path for every Document.
   */
  return pages.map((page) => {
    return { uid: page.uid }
  })
}
