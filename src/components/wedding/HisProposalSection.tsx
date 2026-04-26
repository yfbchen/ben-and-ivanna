import { images } from "@/config/images";
import { WEDDING_PROPOSAL_FRAME_URLS } from "@/config/weddingLockups";
import {
  weddingBodyCopyClassName,
  weddingSectionClassName,
  weddingSectionContainerClassName,
  weddingSectionTitleMarginClassName,
} from "@/config/weddingSectionLayout";
import { useWeddingThemeFromDocument } from "@/hooks/useWeddingThemeFromDocument";

export function HisProposalSection() {
  const weddingTheme = useWeddingThemeFromDocument();
  const proposalFrameSrc = WEDDING_PROPOSAL_FRAME_URLS[weddingTheme];

  return (
    <section
      id="his-proposal"
      className={`${weddingSectionClassName} flex items-center justify-center`}
    >
      <div className={weddingSectionContainerClassName}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center md:gap-x-16 md:gap-y-0">
          <div className="max-md:contents md:flex md:min-h-0 md:max-w-xl md:flex-col md:justify-center md:justify-self-start md:text-left">
            <h2
              className={`order-1 justify-self-center text-center font-wedding-section-heading text-3xl tracking-brand text-wedding-heading md:order-none md:justify-self-start md:text-left md:text-5xl ${weddingSectionTitleMarginClassName}`}
            >
              His Proposal
            </h2>
            <div
              className={`order-3 max-w-xl justify-self-center space-y-4 text-center md:order-none md:justify-self-start md:text-left ${weddingBodyCopyClassName}`}
            >
              <p>
                In April 2025, what seemed like just another trip to Japan became
                something unforgettable. Ben secretly planned a proposal, enlisting
                a few close friends to help him book a private theater in Tokyo.
                There, he surprised Ivanna with a heartfelt video capturing the past
                decade of their lives together.
              </p>
              <p>
                Through tears and laughter, he asked the question—and Ivanna said "yes"!
              </p>
            </div>
          </div>
          <div className="order-2 flex w-full flex-col items-stretch gap-4 md:order-none md:gap-5">
            <img
              src={images.proposalGif}
              alt="Proposal in a private theater in Tokyo"
              className="h-auto w-full rounded-xl"
              loading="lazy"
              decoding="async"
            />
            <img
              src={proposalFrameSrc}
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
