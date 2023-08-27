import { notFound } from "next/navigation"
import { getLocales } from "@/lib/getLocales"
import { SliceZone } from "@prismicio/react"
import * as prismic from "@prismicio/client"

import { createClient } from "@/prismicio"
import { components } from "@/slices"
import { Layout } from "@/components/Layout"

/**
 * This component renders your homepage.
 *
 * Use Next's generateMetadata function to render page metadata.
 *
 * Use the SliceZone to render the content of the page.
 */

/**
 * @returns {Promise<import("next").Metadata>}
 */
export async function generateMetadata({ params: { lang } }) {
  const client = createClient()
  const home = await client.getByUID("page", "home", { lang })

  return {
    title: prismic.asText(home.data.title),
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title || undefined,
      images: [
        {
          url: home.data.meta_image.url || ""
        }
      ]
    }
  }
}

export default async function Index({ params: { lang } }) {
  /**
   * The client queries content from the Prismic API
   */
  const client = createClient()
  const home = await client
    .getByUID("page", "home", { lang })
    .catch(() => notFound())
  const navigation = await client.getSingle("navigation", { lang })
  const settings = await client.getSingle("settings", { lang })

  const locales = await getLocales(home, client)

  return (
    <Layout locales={locales} navigation={navigation} settings={settings}>
      <SliceZone slices={home.data.slices} components={components} />
    </Layout>
  )
}
