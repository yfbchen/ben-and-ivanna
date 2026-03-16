import { Link } from "react-router-dom";
import { images } from "@/config/images";
import { Button } from "@/components/ui/button";

export function GallerySection() {
  return (
    <section
      id="gallery"
      className="min-h-[650px] bg-butter flex items-center justify-center py-12 md:py-16"
    >
      <div className="container mx-auto px-8 md:px-12 lg:px-16">
        <div className="max-w-5xl mx-auto grid gap-12 md:gap-16 md:grid-cols-2 items-center justify-items-center">
          <div className="w-full flex justify-center">
            <img
              src={images.heroHorizontal}
              alt="Gallery placeholder"
              className="aspect-[4/5] w-full max-w-sm object-cover rounded-xl border border-wine/30"
            />
          </div>
          <div className="max-w-xl w-full text-center md:text-left">
            <h2 className="font-body text-3xl md:text-3xl tracking-[0.3em] uppercase text-gold mb-6">
              Gallery
            </h2>
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed">
              There's no better way to capture the memories of our special day
              than through photos. You'll find all of our favorite photos and
              moments from our engagement and wedding day on the gallery board!
            </p>
            <Button
              variant="minimal"
              className="mt-6 tracking-[0.2em] uppercase text-xs"
              asChild
            >
              <Link to="/gallery">View Full Gallery</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
