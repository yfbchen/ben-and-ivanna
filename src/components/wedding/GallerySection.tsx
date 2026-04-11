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
        <div className="max-w-5xl mx-auto grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center md:gap-x-16 md:gap-y-0">
          <div className="order-2 flex w-full justify-center md:order-none md:col-start-1 md:row-start-1">
            <img
              src={images.galleryFrame}
              alt="Ben and Ivanna — engagement gallery preview"
              className="h-auto w-full rounded-xl"
            />
          </div>
          <div className="max-md:contents md:flex md:min-h-0 md:max-w-xl md:flex-col md:justify-center md:justify-self-start md:text-left md:col-start-2 md:row-start-1">
            <h2
              className={`order-1 justify-self-center text-center font-wedding-section-heading text-3xl tracking-brand text-wedding-heading md:order-none md:justify-self-start md:text-left md:text-5xl ${weddingSectionTitleMarginClassName}`}
            >
              Gallery
            </h2>
            <div className="order-3 max-w-xl justify-self-center text-center md:order-none md:justify-self-start md:text-left">
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
      </div>
    </section>
  );
}
