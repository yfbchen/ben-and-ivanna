const galleryImages = Object.values(
  import.meta.glob<string>("@/assets/gallery/*.{png,jpg,jpeg,webp}", {
    eager: true,
    as: "url",
  }),
);

const GalleryPage = () => {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-butter">
        <section className="container mx-auto px-6 md:px-10 lg:px-16">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
              Our Captured Memories
            </h1>
            <p className="font-body text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              A collection of our favorite photos from our engagement and wedding celebrations.
            </p>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {galleryImages.map((src, index) => (
              <div key={index} className="break-inside-avoid overflow-hidden rounded-sm border border-border bg-background">
                <img
                  src={src}
                  alt={`Gallery photo ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>
    </main>
  );
};

export default GalleryPage;

