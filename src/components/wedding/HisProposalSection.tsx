import { images } from "@/config/images";

export function HisProposalSection() {
  return (
    <section
      id="his-proposal"
      className="min-h-[650px] bg-wine flex items-center justify-center py-12 md:py-16"
    >
      <div className="container mx-auto px-8 md:px-12 lg:px-16">
        <div className="max-w-5xl mx-auto grid gap-12 md:gap-16 md:grid-cols-2 items-center justify-items-center">
          <div className="order-2 md:order-1 max-w-xl w-full text-center md:text-left">
            <h2 className="font-body text-3xl md:text-3xl tracking-[0.3em] uppercase text-gold mb-6">
              His Proposal
            </h2>
            <div className="space-y-4 font-body text-base md:text-lg text-ivory/90 leading-relaxed">
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat.
              </p>
              <p>
                Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
                consequat.
              </p>
              <p>
                Duis autem vel eum iriure dolor in hendrerit in vulputate velit
                esse molestie consequat, vel illum dolore eu feugiat nulla
                facilisis.
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
