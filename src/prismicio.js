import * as prismic from "@prismicio/client"
import * as prismicNext from "@prismicio/next"
import sm from "../slicemachine.config.json"
export const { repositoryName } = sm

/**
 * A list of Route Resolver objects that define how a document's \`url\` field
 * is resolved.
 * @type {prismic.ClientConfig['routes']}
 */
const routes = [
  {
    type: "page",
    uid: "home",
    path: "/:lang?"
  },
  {
    type: "page",
    path: "/:lang?/:uid"
  }
]

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config {prismic.ClientConfig} - Configuration for the Prismic client.
 */
export const createClient = ({ previewData, req, ...config } = {}) => {
  const client = prismic.createClient(repositoryName, {
    accessToken: process.env.PRISMIC_NOVACTURE_TOKEN,
    routes,
    fetchOptions:
      process.env.NODE_ENV === "production"
        ? { next: { tags: ["prismic"] }, cache: "no-store" }
        : { next: { revalidate: 5 } },
    ...config
  })

  prismicNext.enableAutoPreviews({ client, previewData, req })

  return client
}
