import { Link } from "react-router-dom";
import { images } from "@/config/images";
import { Button } from "@/components/ui/button";

export function GallerySection() {
  return (
    <section
      id="gallery"
      className="w-full flex items-center justify-center py-16 md:py-24"
    >
      <div className="container mx-auto px-6 md:px-10 lg:px-14">
        <div className="max-w-5xl mx-auto grid gap-12 md:gap-16 md:grid-cols-2 items-center justify-items-center">
          <div className="w-full flex justify-center">
            <img
              src={images.heroHorizontal}
              alt="Gallery placeholder"
              className="aspect-[4/5] w-full max-w-sm object-cover rounded-xl border border-wine/30"
            />
          </div>
          <div className="max-w-xl w-full text-center md:text-left">
            <h2 className="font-wedding-section-heading text-3xl md:text-3xl tracking-brand uppercase text-wedding-heading mb-6">
              Gallery
            </h2>
            <p className="font-wedding-content text-base md:text-lg tracking-brand text-wedding-body leading-relaxed">
              There's no better way to capture the memories of our special day
              than through photos. You'll find all of our favorite photos and
              moments from our engagement and wedding day on the gallery board!
            </p>
            <Button
              variant="minimal"
              className="mt-6 tracking-brand uppercase text-xs"
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
