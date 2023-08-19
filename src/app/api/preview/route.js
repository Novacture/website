import { redirectToPreviewURL } from "@prismicio/next"
import { createClient } from "@/prismicio"

/**
 * This endpoint handles previews that are launched from the Page Builder.
 */
/**
 * @param {import("next/server").NextRequest} request
 */
export async function GET(request) {
  const client = createClient()

  await redirectToPreviewURL({ client, request })
}
