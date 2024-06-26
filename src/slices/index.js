import dynamic from "next/dynamic"

export const components = {
  hero: dynamic(() => import("./Hero")),
  image: dynamic(() => import("./Image")),
  image_cards: dynamic(() => import("./ImageCards")),
  quote: dynamic(() => import("./Quote")),
  text: dynamic(() => import("./Text")),
  text_with_image: dynamic(() => import("./TextWithImage"))
}
