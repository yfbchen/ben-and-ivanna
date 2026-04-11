import { Link } from "react-router-dom";
import { Images } from "lucide-react";
import { images } from "@/config/images";
import {
  weddingBodyCopyClassName,
  weddingElegantCtaButtonClassName,
  weddingSectionClassName,
  weddingSectionContainerClassName,
} from "@/config/weddingSectionLayout";
import { Button } from "@/components/ui/button";

export function GallerySection() {
  return (
    <section
      id="gallery"
      className={`${weddingSectionClassName} flex items-center justify-center`}
    >
      <div className={weddingSectionContainerClassName}>
        <div
          className="max-w-5xl mx-auto grid grid-cols-1 items-start justify-items-center gap-12 [grid-template-areas:'galleryHdr'_'galleryPhoto'_'galleryCopy'] md:grid-cols-2 md:justify-items-stretch md:gap-16 md:[grid-template-areas:'galleryPhoto_galleryHdr'_'galleryPhoto_galleryCopy']"
        >
          <h2
            className="[grid-area:galleryHdr] mb-0 max-w-xl justify-self-center text-center font-wedding-section-heading text-3xl tracking-brand text-wedding-heading md:justify-self-start md:text-left md:text-5xl"
          >
            Gallery
          </h2>
          <div className="[grid-area:galleryCopy] max-w-xl justify-self-center text-center md:justify-self-start md:text-left">
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
          <div className="[grid-area:galleryPhoto] flex w-full justify-center">
            <img
              src={images.galleryFrame}
              alt="Ben and Ivanna — engagement gallery preview"
              className="h-auto w-full rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
