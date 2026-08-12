import { useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function ImageCarousel({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];
  const hasMultipleImages = images.length > 1;

  const goToPrevious = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? images.length - 1 : currentIndex - 1,
    );
  };

  const goToNext = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === images.length - 1 ? 0 : currentIndex + 1,
    );
  };

  return (
    <section className="mt-8">
      <div className="relative overflow-hidden rounded-lg border border-black/10 bg-black/5 dark:border-white/20 dark:bg-white/5">
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={activeImage.src}
            alt={activeImage.alt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-contain"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-4 py-3 text-white">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm md:text-base">{activeImage.caption}</p>
            <span className="shrink-0 text-sm opacity-80">
              {activeIndex + 1} / {images.length}
            </span>
          </div>
        </div>
        {hasMultipleImages && (
          <>
            <button
              aria-label="Previous image"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white"
              type="button"
              onClick={goToPrevious}
            >
              <FiChevronLeft />
            </button>
            <button
              aria-label="Next image"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white"
              type="button"
              onClick={goToNext}
            >
              <FiChevronRight />
            </button>
          </>
        )}
      </div>
    </section>
  );
}
