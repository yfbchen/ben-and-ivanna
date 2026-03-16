import { images } from "@/config/images";

export function RegistrySection() {
  return (
    <section
      id="gift"
      className="min-h-[650px] bg-wine flex items-center justify-center py-12 md:py-16"
    >
      <div className="container mx-auto px-8 md:px-12 lg:px-16">
        <div className="max-w-5xl mx-auto grid gap-12 md:gap-16 md:grid-cols-2 items-center justify-items-center">
          <div className="text-ivory max-w-xl w-full text-center md:text-left">
            <p className="font-body text-xs md:text-sm tracking-[0.3em] uppercase text-gold mb-6">
              Registry
            </p>
            <h2 className="font-display text-3xl md:text-5xl mb-6">
              Gift Registry
            </h2>
            <p className="font-body text-base md:text-lg text-ivory/90 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat.
            </p>
          </div>
          <div className="w-full flex justify-center">
            <img
              src={images.heroHorizontal}
              alt="Registry placeholder"
              className="aspect-[4/5] w-full max-w-sm object-cover rounded-xl border border-gold/40"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
