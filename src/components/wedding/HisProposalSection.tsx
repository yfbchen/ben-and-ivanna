import { images } from "@/config/images";
import {
  weddingBodyCopyClassName,
  weddingSectionClassName,
  weddingSectionContainerClassName,
} from "@/config/weddingSectionLayout";

export function HisProposalSection() {
  return (
    <section
      id="his-proposal"
      className={`${weddingSectionClassName} flex items-center justify-center`}
    >
      <div className={weddingSectionContainerClassName}>
        <div
          className="max-w-5xl mx-auto grid grid-cols-1 items-start justify-items-center gap-12 [grid-template-areas:'proposalHdr'_'proposalPhoto'_'proposalCopy'] md:grid-cols-2 md:justify-items-stretch md:gap-16 md:[grid-template-areas:'proposalHdr_proposalPhoto'_'proposalCopy_proposalPhoto']"
        >
          <h2
            className="[grid-area:proposalHdr] mb-0 max-w-xl justify-self-center text-center font-wedding-section-heading text-3xl tracking-brand text-wedding-heading md:justify-self-start md:text-left md:text-5xl"
          >
            His Proposal
          </h2>
          <div
            className={`[grid-area:proposalCopy] max-w-xl justify-self-center space-y-4 text-center md:justify-self-start md:text-left ${weddingBodyCopyClassName}`}
          >
            <p>
              In April 2025, what seemed like just another trip to Japan became
              something unforgettable. Ben secretly planned a proposal, enlisting
              a few close friends to help him book a private theater in Tokyo.
              There, he surprised Ivanna with a heartfelt video capturing the past
              decade of their lives together.
            </p>
            <p>
              Through tears and laughter, he asked the question—and she said yes!
            </p>
          </div>
          <div className="[grid-area:proposalPhoto] flex w-full flex-col items-stretch gap-4 md:gap-5">
            <img
              src={images.proposalGif}
              alt="Proposal in a private theater in Tokyo"
              className="h-auto w-full rounded-xl"
              loading="lazy"
              decoding="async"
            />
            <img
              src={images.proposalFrame}
              alt="Ben and Ivanna — proposal"
              className="h-auto w-full rounded-xl"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
