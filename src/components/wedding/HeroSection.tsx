import { images } from "@/config/images";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-[650px] bg-wine flex items-center justify-center pt-6 pb-6 overflow-hidden"
    >
      <div className="container relative mx-auto px-2 md:px-4 lg:px-6 min-h-[650px] max-w-6xl">
        <div className="absolute left-0 md:left-4 bottom-6 md:bottom-10 w-[35%] max-w-xl h-50 md:h-55 lg:h-60 rounded-xl border border-gold/40 shadow-lg bg-wine overflow-hidden">
          <img
            src={images.heroHorizontal}
            alt="Ivanna and Ben"
            className="w-full h-full object-fill"
          />
        </div>
        <div className="absolute right-0 md:right-4 top-15 md:top-20 bottom-6 md:bottom-10 w-32 md:w-44 lg:w-80 rounded-xl border border-gold/40 shadow-lg bg-wine overflow-hidden">
          <img
            src={images.heroVertical}
            alt="Ivanna and Ben"
            className="w-full h-full object-fill"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-gold text-center leading-tight">
            <span>Ivanna</span>
            <br />
            <span>&amp; Ben</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
