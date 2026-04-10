import { Link } from "react-router-dom";
import { Images } from "lucide-react";
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
            <h2 className="font-wedding-section-heading text-3xl md:text-5xl tracking-brand text-wedding-heading mb-6">
              Gallery
            </h2>
            <p className="font-wedding-content text-base md:text-lg tracking-brand text-wedding-body leading-relaxed">
              We can&apos;t wait to share photos from our wedding day with all
              of you. In the meantime, check out some of our favorite photos
              from our engagement session!
            </p>
            <Button
              variant="elegant"
              size="lg"
              className="mt-6 border-0 h-14 min-w-[220px] rounded-full px-10 text-sm sm:text-base normal-case"
              asChild
            >
              <Link to="/gallery">
                <Images className="h-5 w-5 shrink-0" />
                See Gallery
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
