import { images } from "@/config/images";
import {
  weddingBodyCopyClassName,
  weddingSectionClassName,
  weddingSectionContainerClassName,
  weddingSectionTitleMarginClassName,
} from "@/config/weddingSectionLayout";

export function HisProposalSection() {
  return (
    <section
      id="his-proposal"
      className={`${weddingSectionClassName} flex items-center justify-center`}
    >
      <div className={weddingSectionContainerClassName}>
        <div className="max-w-5xl mx-auto grid gap-12 md:gap-16 md:grid-cols-2 items-center justify-items-center">
          <div className="order-2 md:order-1 max-w-xl w-full text-center md:text-left">
            <h2
              className={`font-wedding-section-heading text-3xl md:text-5xl tracking-brand text-wedding-heading ${weddingSectionTitleMarginClassName}`}
            >
              His Proposal
            </h2>
            <div className={`space-y-4 ${weddingBodyCopyClassName}`}>
              <p>
                In April 2025, what seemed like just another trip to Japan became
                something unforgettable. Ben secretly planned a proposal,
                enlisting a few close friends to help him book a private theater
                in Tokyo. There, he surprised Ivanna with a heartfelt video
                capturing the past decade of their lives together.
              </p>
              <p>
                Through tears and laughter, he asked the question—and she said
                yes!
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2 w-full flex justify-center">
            <img
              src={images.heroHorizontal}
              alt="Proposal placeholder"
              className="aspect-[4/5] w-full max-w-sm object-cover rounded-xl border border-gold/40"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
