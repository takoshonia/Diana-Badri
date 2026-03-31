import { cn } from "@/lib/utils"
import { weddingImages } from "@/src/assets/wedding"

interface FloralBottomStripProps {
  /** Opacity (e.g. opacity-50, opacity-70) */
  className?: string
  /** Vertical size of the strip; image scales to this height */
  heightClass?: string
}

/**
 * Single centered floral-bottom.png (no horizontal repeat).
 */
export function FloralBottomStrip({
  className,
  heightClass = "h-28 md:h-36",
}: FloralBottomStripProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute -bottom-2 left-0 right-0 bg-no-repeat bg-bottom bg-center",
        heightClass,
        className
      )}
      style={{
        backgroundImage: `url(${weddingImages.floralTop.src})`,
        backgroundSize: "contain",
      }}
    />
  )
}
