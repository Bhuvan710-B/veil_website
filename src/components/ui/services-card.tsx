"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

import useEmblaCarousel from "embla-carousel-react"
import { Button } from "@/components/ui/button"

// --- Carousel Context ---
type CarouselApi = ReturnType<typeof useEmblaCarousel>[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]
type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}
type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

export function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }
  return context
}

// --- Main Carousel Component ---
export const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins,
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) return
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext],
    )

    React.useEffect(() => {
      if (!api || !setApi) return
      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) return
      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)
      return () => {
        api?.off("select", onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          opts,
          orientation,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  },
)
Carousel.displayName = "Carousel"

export const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()
  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className,
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

export const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className,
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

export const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { scrollNext, canScrollNext } = useCarousel()
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-10 w-10 rounded-full",
        "right-2 top-1/2 -translate-y-1/2",
        className,
      )}
      onClick={scrollNext}
      disabled={!canScrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

export const CarouselPrev = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { scrollPrev, canScrollPrev } = useCarousel()
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-10 w-10 rounded-full",
        "left-2 top-1/2 -translate-y-1/2 z-10",
        className,
      )}
      onClick={scrollPrev}
      disabled={!canScrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrev.displayName = "CarouselPrev"

// --- Service Card & Carousel Section ---
export interface Service {
  number: string
  title: string
  description: string
  icon: React.ElementType
  gradient: string
  badge?: string
  specs?: string[]
}

export const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  }

  const Icon = service.icon

  return (
    <motion.div
      variants={cardVariants}
      className={cn(
        "relative flex h-[440px] w-full flex-col justify-between overflow-hidden rounded-3xl p-8 border border-white/10 shadow-xl",
        "bg-gradient-to-b",
        service.gradient
      )}
    >
      {/* Top Bar */}
      <div className="z-10 flex items-center justify-between w-full">
        <span className="text-xs font-mono font-bold tracking-widest text-white/50 px-2.5 py-1 rounded-full bg-black/20 border border-white/5">
          ( {service.number} )
        </span>
        {service.badge && (
          <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-signal-green/20 text-signal-green border border-signal-green/30">
            {service.badge}
          </span>
        )}
      </div>

      {/* Icon */}
      <div className="z-10 my-auto">
        <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md flex items-center justify-center text-white mb-4">
          <Icon className="h-7 w-7 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="z-10">
        <h3 className="mb-2 text-xl font-bold tracking-tight text-white">
          {service.title}
        </h3>
        <p className="text-sm text-white/75 leading-relaxed mb-4">
          {service.description}
        </p>
        {service.specs && service.specs.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
            {service.specs.map((spec, i) => (
              <span key={i} className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/25 text-white/70">
                {spec}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
    </motion.div>
  )
}

export const ServiceCarousel = ({ services }: { services: Service[] }) => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <div className="w-full max-w-6xl mx-auto px-4 relative">
      <Carousel
        ref={ref}
        opts={{
          align: "start",
          loop: true,
        }}
        className="relative"
      >
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ staggerChildren: 0.1 }}
        >
          <CarouselContent>
            {services.map((service, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <ServiceCard service={service} index={index} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </motion.div>
        <div className="flex justify-end gap-2 mt-6">
          <CarouselPrev className="static translate-y-0 bg-veil-ink/80 text-white border-white/10 hover:bg-veil-ink" />
          <CarouselNext className="static translate-y-0 bg-veil-ink/80 text-white border-white/10 hover:bg-veil-ink" />
        </div>
      </Carousel>
    </div>
  )
}
