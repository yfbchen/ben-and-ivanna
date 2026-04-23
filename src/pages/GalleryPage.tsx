import { WeddingThemeSwatches } from "@/components/wedding/WeddingThemeSwatches";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GALLERY_FILTER_TABS, type GalleryFilterId } from "@/config/images";
import { weddingBodyCopyClassName } from "@/config/weddingSectionLayout";
import { cn } from "@/lib/utils";
import { useGalleryCatalog } from "@/hooks/useGalleryCatalog";
import { useWeddingThemeController } from "@/hooks/useWeddingThemeController";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const INITIAL_VISIBLE_IMAGE_COUNT = 24;
const VISIBLE_IMAGE_STEP = 24;

const GalleryPage = () => {
  const { selectedTheme, handleThemeChange } = useWeddingThemeController();
  const { items: catalogItems, status: catalogStatus, errorMessage: catalogError } =
    useGalleryCatalog();
  const [activeFilter, setActiveFilter] = useState<GalleryFilterId>("all");
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const thumbnailRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const loadMoreAnchorRef = useRef<HTMLDivElement | null>(null);
  const [visibleImageCount, setVisibleImageCount] = useState(INITIAL_VISIBLE_IMAGE_COUNT);

  const visibleItems = useMemo(
    () =>
      activeFilter === "all"
        ? catalogItems
        : catalogItems.filter((item) => item.category === activeFilter),
    [activeFilter, catalogItems],
  );
  const renderedItems = useMemo(
    () => visibleItems.slice(0, visibleImageCount),
    [visibleImageCount, visibleItems],
  );
  const hasMoreItems = renderedItems.length < visibleItems.length;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    setIsViewerOpen(false);
  }, [activeFilter]);

  useEffect(() => {
    setVisibleImageCount(INITIAL_VISIBLE_IMAGE_COUNT);
  }, [activeFilter, catalogItems]);

  useEffect(() => {
    if (!hasMoreItems) {
      return;
    }

    const target = loadMoreAnchorRef.current;
    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          setVisibleImageCount((current) => Math.min(current + VISIBLE_IMAGE_STEP, visibleItems.length));
          break;
        }
      },
      { rootMargin: "450px 0px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMoreItems, visibleItems.length]);

  const openViewer = (index: number) => {
    setSelectedImageIndex(index);
    setIsViewerOpen(true);
  };

  const showPreviousImage = useCallback(() => {
    setSelectedImageIndex((currentIndex) => {
      const len = visibleItems.length;
      if (len === 0) return 0;
      return (currentIndex - 1 + len) % len;
    });
  }, [visibleItems]);

  const showNextImage = useCallback(() => {
    setSelectedImageIndex((currentIndex) => {
      const len = visibleItems.length;
      if (len === 0) return 0;
      return (currentIndex + 1) % len;
    });
  }, [visibleItems]);

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
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h1 className="font-wedding-section-heading text-4xl md:text-5xl lg:text-6xl tracking-brand text-theme-navbar mb-4">
              Gallery
            </h1>
            <p className="font-wedding-content text-sm md:text-base tracking-brand text-theme-navbar max-w-2xl mx-auto">
              We can&apos;t wait to share photos from our wedding with you in the future! In the
              meantime, you can browse our engagement shoot taken in New York and our pre-wedding
              shoot taken in China.
            </p>
          </div>

          <div className="mx-auto mb-8 w-full max-w-5xl sm:hidden">
            <label htmlFor="gallery-category-filter-mobile-trigger" className="sr-only">
              Filter gallery by category
            </label>
            <Select value={activeFilter} onValueChange={(value) => setActiveFilter(value as GalleryFilterId)}>
              <SelectTrigger
                id="gallery-category-filter-mobile-trigger"
                aria-label="Filter gallery by category"
                className="h-11 w-full rounded-full border-border/80 bg-background/60 px-4 font-wedding-content text-sm tracking-brand text-theme-navbar/85 focus:ring-theme-navbar/35 focus:ring-offset-1"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent
                position="popper"
                side="bottom"
                align="start"
                className="z-[70] mt-1 rounded-2xl border-border/80 bg-background/95 backdrop-blur-sm"
              >
                {GALLERY_FILTER_TABS.map((tab) => (
                  <SelectItem
                    key={tab.id}
                    value={tab.id}
                    className="font-wedding-content text-sm tracking-brand text-theme-navbar/85 focus:bg-background focus:text-theme-navbar"
                  >
                    {tab.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div
            role="tablist"
            aria-label="Filter gallery by category"
            className="mx-auto mb-8 hidden max-w-5xl gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex sm:flex-wrap sm:justify-center"
          >
            {GALLERY_FILTER_TABS.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  id={`gallery-tab-${tab.id}`}
                  onClick={() => setActiveFilter(tab.id)}
                  className={cn(
                    "shrink-0 rounded-full border px-3.5 py-2 text-center font-wedding-content text-sm tracking-brand transition-colors sm:px-4 sm:py-2.5 md:text-base",
                    isActive
                      ? "border-theme-navbar bg-theme-navbar/10 text-theme-navbar shadow-sm"
                      : "border-border/80 bg-background/60 text-theme-navbar/85 hover:border-theme-navbar/45 hover:text-theme-navbar",
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="mx-auto w-full max-w-5xl">
            {catalogError && (
              <p
                className={`${weddingBodyCopyClassName} mb-6 text-center text-destructive`}
                role="alert"
              >
                {catalogError} Some photos may be missing.
              </p>
            )}
            {catalogStatus === "loading" ? (
              <div className="flex flex-col items-center justify-center gap-3 py-4" aria-live="polite">
                <span
                  className="h-8 w-8 animate-spin rounded-full border-2 border-theme-navbar/25 border-t-theme-navbar"
                  aria-hidden="true"
                />
                <p className={`${weddingBodyCopyClassName} text-center text-theme-navbar/85`}>
                  Loading gallery…
                </p>
              </div>
            ) : visibleItems.length === 0 ? (
              <p className={`${weddingBodyCopyClassName} text-center`}>Coming Soon!</p>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
                  {renderedItems.map((item, index) => (
                    <button
                      key={item.src}
                      type="button"
                      onClick={() => openViewer(index)}
                      className="group relative block w-full overflow-hidden rounded-xl border border-border bg-background text-left transition-transform duration-200 hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      aria-label={`Open photo ${index + 1} in full screen`}
                    >
                      <img
                        src={item.src}
                        alt={`Gallery photo ${index + 1}`}
                        className="aspect-[4/5] h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        loading={index < 4 ? "eager" : "lazy"}
                        fetchPriority={index < 4 ? "high" : "auto"}
                        decoding="async"
                        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                      />
                    </button>
                  ))}
                </div>
                {hasMoreItems && (
                  <div ref={loadMoreAnchorRef} className="mt-6 h-8 w-full" aria-hidden="true" />
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
        <DialogContent
          overlayClassName="bg-black/90"
          className="left-0 top-0 h-[100dvh] w-screen translate-x-0 translate-y-0 max-w-none border-none bg-transparent p-0 shadow-none focus:outline-none sm:left-1/2 sm:top-1/2 sm:h-auto sm:w-[min(92vw,1100px)] sm:-translate-x-1/2 sm:-translate-y-1/2 [&>button]:hidden"
        >
          <DialogTitle className="sr-only">Expanded gallery image</DialogTitle>
          <DialogDescription className="sr-only">
            View large photo and navigate with previous or next controls.
          </DialogDescription>
          <div className="relative mx-auto flex h-full w-full flex-col overflow-hidden border border-border bg-wedding-main-surface shadow-2xl sm:max-h-[92vh] sm:rounded-2xl">
            <DialogClose
              className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/65 text-white transition hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="Close preview"
            >
              <X className="h-5 w-5" />
            </DialogClose>

            <div className="relative flex min-h-0 flex-1 items-center justify-center bg-muted/10 px-10 py-4 sm:min-h-[24rem] sm:px-14 sm:py-5">
              <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-10 flex items-center justify-between px-2 sm:px-4">
                <button
                  type="button"
                  onClick={showPreviousImage}
                  disabled={visibleItems.length < 2}
                  className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/70 disabled:pointer-events-none disabled:opacity-40 sm:h-10 sm:w-10"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>

                <button
                  type="button"
                  onClick={showNextImage}
                  disabled={visibleItems.length < 2}
                  className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/70 disabled:pointer-events-none disabled:opacity-40 sm:h-10 sm:w-10"
                  aria-label="Next photo"
                >
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>

              <div className="flex h-full min-h-0 w-full items-center justify-center">
                {visibleItems[selectedImageIndex] && (
                  <img
                    src={visibleItems[selectedImageIndex].src}
                    alt={`Gallery photo ${selectedImageIndex + 1} expanded`}
                    className="h-full w-auto max-w-full rounded-md object-contain"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                )}
              </div>
            </div>

            <div className="border-t border-border/70 bg-wedding-main-surface px-3 py-3 sm:px-4">
              <div className="overflow-x-auto">
                <div className="flex w-max min-w-full gap-2 pr-1">
                {visibleItems.map((item, index) => {
                  const isActive = index === selectedImageIndex;

                  return (
                    <button
                      key={`thumb-${item.src}`}
                      ref={(element) => {
                        thumbnailRefs.current[index] = element;
                      }}
                      type="button"
                      onClick={() => setSelectedImageIndex(index)}
                      aria-label={`View photo ${index + 1}`}
                      aria-current={isActive ? "true" : undefined}
                      className={`h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-navbar/35 focus-visible:ring-offset-1 focus-visible:ring-offset-background ${
                        isActive
                          ? "border-4 border-theme-navbar"
                          : "border-border hover:border-theme-navbar/50"
                      }`}
                    >
                      <img
                        src={item.src}
                        alt={`Gallery thumbnail ${index + 1}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  );
                })}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GalleryPage;
