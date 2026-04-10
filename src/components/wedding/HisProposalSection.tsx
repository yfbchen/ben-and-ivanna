import { images } from "@/config/images";

export function HisProposalSection() {
  return (
    <section
      id="his-proposal"
      className="w-full flex items-center justify-center py-16 md:py-24"
    >
      <div className="container mx-auto px-6 md:px-10 lg:px-14">
        <div className="max-w-5xl mx-auto grid gap-12 md:gap-16 md:grid-cols-2 items-center justify-items-center">
          <div className="order-2 md:order-1 max-w-xl w-full text-center md:text-left">
            <h2 className="font-wedding-section-heading text-3xl md:text-5xl tracking-brand text-wedding-heading mb-6">
              His Proposal
            </h2>
            <div className="space-y-4 font-wedding-content text-base md:text-lg tracking-brand text-wedding-body leading-relaxed">
              <p>
                In April 2023, when we were visiting our favorite city in the
                world, something amazing happened. It was a beautiful, sunny day,
                and we were taking a stroll through the park. Then, Ben
                surprised me and got down on one knee and asked me to be his
                wife. It was the happiest day of our lives, and we can&apos;t
                wait to start our forever together.
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
