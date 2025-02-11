"use client";

import * as React from "react";
import Image from "next/image";
import AutoPlay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

// Sample banner data
const banners = [
  {
    id: 1,
    image: "/images/banners/1.png",
    alt: "Valentine's Day Promotion",
  },
  {
    id: 2,
    image: "/images/banners/1.png",
    alt: "Special Offer",
  },
  {
    id: 3,
    image: "/images/banners/1.png",
    alt: "New Collection",
  },
];

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [AutoPlay()]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full">
      <div className="overflow-hidden rounded-[16px]" ref={emblaRef}>
        <div className="flex">
          {banners.map((banner) => (
            <div key={banner.id} className="relative flex-[0_0_100%]">
              {/* Mobile Image */}
              <div className="block md:hidden">
                <Image
                  src={banner.image || "/placeholder.svg"}
                  alt={banner.alt}
                  width={640}
                  height={200}
                  className="w-full object-cover"
                  priority
                />
              </div>

              {/* Tablet Image */}
              <div className="hidden md:block lg:hidden">
                <Image
                  src={banner.image || "/placeholder.svg"}
                  alt={banner.alt}
                  width={1024}
                  height={300}
                  className="w-full object-cover"
                  priority
                />
              </div>

              {/* Desktop Image */}
              <div className="hidden lg:block">
                <Image
                  src={banner.image || "/placeholder.svg"}
                  alt={banner.alt}
                  width={1920}
                  height={400}
                  className="w-full object-cover"
                  priority
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md backdrop-blur-sm transition-all hover:bg-white"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md backdrop-blur-sm transition-all hover:bg-white"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              selectedIndex === index ? "w-6 bg-white" : "bg-white/50",
            )}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
