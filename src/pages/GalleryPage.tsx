import { WeddingThemeSwatches } from "@/components/wedding/WeddingThemeSwatches";
import { images } from "@/config/images";
import { useWeddingThemeController } from "@/hooks/useWeddingThemeController";

const GalleryPage = () => {
  const { selectedTheme, handleThemeChange } = useWeddingThemeController();

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
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {images.gallery.map((src, index) => (
                <div
                  key={index}
                  className="break-inside-avoid overflow-hidden rounded-sm border border-border bg-background"
                >
                  <img
                    src={src}
                    alt={`Gallery photo ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
    </main>
    </>
  );
};

export default GalleryPage;

