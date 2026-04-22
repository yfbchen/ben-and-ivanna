import { WeddingThemeSwatches } from "@/components/wedding/WeddingThemeSwatches";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { images } from "@/config/images";
import { useWeddingThemeController } from "@/hooks/useWeddingThemeController";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const GalleryPage = () => {
  const { selectedTheme, handleThemeChange } = useWeddingThemeController();
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const thumbnailRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const openViewer = (index: number) => {
    setSelectedImageIndex(index);
    setIsViewerOpen(true);
  };

  const showPreviousImage = useCallback(() => {
    setSelectedImageIndex((currentIndex) =>
      (currentIndex - 1 + images.gallery.length) % images.gallery.length,
    );
  }, []);

  const showNextImage = useCallback(() => {
    setSelectedImageIndex(
      (currentIndex) => (currentIndex + 1) % images.gallery.length,
    );
  }, []);

  useEffect(() => {
    if (!isViewerOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPreviousImage();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNextImage();
      }

      if (event.key === "Escape") {
        event.preventDefault();
        setIsViewerOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isViewerOpen, showNextImage, showPreviousImage]);

  useEffect(() => {
    if (!isViewerOpen) {
      return;
    }

    thumbnailRefs.current[selectedImageIndex]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [isViewerOpen, selectedImageIndex]);

  return (
    <>
      <WeddingThemeSwatches selectedTheme={selectedTheme} onThemeChange={handleThemeChange} />
      <main className="min-h-screen pt-24 pb-16 bg-wedding-main-surface">
        <section className="container mx-auto px-6 md:px-10 lg:px-16">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h1 className="font-wedding-section-heading text-4xl md:text-5xl lg:text-6xl tracking-brand text-theme-navbar mb-4">
              Gallery
            </h1>
            <p className="font-wedding-content text-sm md:text-base tracking-brand text-theme-navbar max-w-2xl mx-auto">
              We can&apos;t wait to share photos from our wedding day with all of you. In the
              meantime, check out some of our favorite photos from our engagement session!
            </p>
          </div>

          <div className="mx-auto w-full max-w-5xl">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {images.gallery.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => openViewer(index)}
                  className="group relative block w-full overflow-hidden rounded-xl border border-border bg-background text-left transition-transform duration-200 hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-label={`Open photo ${index + 1} in full screen`}
                >
                  <img
                    src={src}
                    alt={`Gallery photo ${index + 1}`}
                    className="aspect-[4/5] h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
        <DialogContent
          overlayClassName="bg-black/90"
          className="max-h-[92vh] max-w-[88vw] border border-border bg-background p-4 shadow-2xl focus:outline-none sm:max-w-4xl sm:rounded-lg sm:p-5 [&>button]:hidden"
        >
          <DialogTitle className="sr-only">Expanded gallery image</DialogTitle>
          <DialogDescription className="sr-only">
            View large photo and navigate with previous or next controls.
          </DialogDescription>
          <div className="relative mx-auto w-full max-w-4xl rounded-xl bg-muted/20 p-3 sm:p-4">
            <DialogClose
              className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/70 sm:right-4 sm:top-4"
              aria-label="Close preview"
            >
              <X className="h-5 w-5" />
            </DialogClose>

            <div className="relative">
              <div className="flex min-h-[18rem] items-center justify-center overflow-hidden rounded-xl bg-black/5 px-12 py-2 sm:min-h-[22rem] sm:px-14">
                <img
                  src={images.gallery[selectedImageIndex]}
                  alt={`Gallery photo ${selectedImageIndex + 1} expanded`}
                  className="max-h-[68vh] w-auto max-w-full rounded-md object-contain"
                />
              </div>

              <button
                type="button"
                onClick={showPreviousImage}
                className="absolute left-2 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/70 sm:left-3"
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                type="button"
                onClick={showNextImage}
                className="absolute right-2 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/70 sm:right-3"
                aria-label="Next photo"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-3 overflow-x-auto px-1 pb-1">
              <div className="flex w-max min-w-full gap-2 pr-1">
                {images.gallery.map((src, index) => {
                  const isActive = index === selectedImageIndex;

                  return (
                    <button
                      key={`thumb-${src}`}
                      ref={(element) => {
                        thumbnailRefs.current[index] = element;
                      }}
                      type="button"
                      onClick={() => setSelectedImageIndex(index)}
                      aria-label={`View photo ${index + 1}`}
                      aria-current={isActive ? "true" : undefined}
                      className={`h-14 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-navbar/35 focus-visible:ring-offset-1 focus-visible:ring-offset-background ${
                        isActive
                          ? "border-4 border-theme-navbar"
                          : "border-border hover:border-theme-navbar/50"
                      }`}
                    >
                      <img
                        src={src}
                        alt={`Gallery thumbnail ${index + 1}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GalleryPage;

