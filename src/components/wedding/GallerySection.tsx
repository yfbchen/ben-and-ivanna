import { Link } from "react-router-dom";
import { Images } from "lucide-react";
import { images } from "@/config/images";
import {
  weddingBodyCopyClassName,
  weddingElegantCtaButtonClassName,
  weddingSectionClassName,
  weddingSectionContainerClassName,
  weddingSectionTitleMarginClassName,
} from "@/config/weddingSectionLayout";
import { Button } from "@/components/ui/button";

export function GallerySection() {
  return (
    <section
      id="gallery"
      className={`${weddingSectionClassName} flex items-center justify-center`}
    >
      <div className={weddingSectionContainerClassName}>
        <div className="max-w-5xl mx-auto grid gap-12 md:gap-16 md:grid-cols-2 items-center justify-items-center">
          <div className="w-full flex justify-center">
            <img
              src={images.heroHorizontal}
              alt="Gallery placeholder"
              className="aspect-[4/5] w-full max-w-sm object-cover rounded-xl border border-wine/30"
            />
          </div>
          <div className="max-w-xl w-full text-center md:text-left">
            <h2
              className={`font-wedding-section-heading text-3xl md:text-5xl tracking-brand text-wedding-heading ${weddingSectionTitleMarginClassName}`}
            >
              Gallery
            </h2>
            <p className={weddingBodyCopyClassName}>
              We can&apos;t wait to share photos from our wedding with you in the
              future! In the meantime, you can browse our engagement and
              pre-wedding shoots here.
            </p>
            <Button
              variant="elegant"
              size="lg"
              className={`mt-6 ${weddingElegantCtaButtonClassName}`}
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
