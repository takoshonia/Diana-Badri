import floralTop from "./floral-top.png"
import floralLeft from "./floral-left.png"
import floralBottom from "./floral-bottom.png"
import couple1 from "./couple-1.png"

/** Bundled paths so images load even when `/public` URLs fail (e.g. odd hosting paths). */
export const weddingImages = {
  floralTop,
  floralLeft,
  floralRight: floralLeft,
  floralBottom,
  couple1,
} as const
