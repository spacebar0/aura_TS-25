
// src/components/aura/StoreCarousel.tsx
'use client';

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { storeCarouselImages } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

interface StoreCarouselProps {
  isFocused: boolean;
  setApi: (api: CarouselApi | undefined) => void;
}

export function StoreCarousel({ isFocused, setApi }: StoreCarouselProps) {
  const [current, setCurrent] = React.useState(0);
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  const handleApi = React.useCallback((api: CarouselApi | undefined) => {
    setApi(api);
  }, [setApi]);

  React.useEffect(() => {
    const carouselApi = api; // get the api from the state
    if (!carouselApi) {
      return;
    }

    setCurrent(carouselApi.selectedScrollSnap());

    const onSelect = (api: CarouselApi) => {
      setCurrent(api.selectedScrollSnap());
    };

    carouselApi.on('select', onSelect);

    return () => {
      carouselApi.off('select', onSelect);
    };
  }, [api]);

  return (
    <div className="relative w-full">
      <Carousel
        setApi={handleApi}
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {storeCarouselImages.map((imageUrl, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden rounded-2xl">
                <Image
                  src={imageUrl}
                  alt={`Store promotion image ${index + 1}`}
                  fill
                  className="object-cover"
                  data-ai-hint="gameplay screenshot"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {storeCarouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => (api as CarouselApi)?.scrollTo(index)}
            className={cn(
              'w-2 h-2 rounded-full transition-colors',
              current === index ? 'bg-primary' : 'bg-muted/50'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
