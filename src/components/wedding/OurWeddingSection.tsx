import { images } from "@/config/images";

export function OurWeddingSection() {
  return (
    <section
      id="our-wedding"
      className="min-h-[650px] bg-butter flex items-center justify-center py-12 md:py-16"
    >
      <div className="container mx-auto px-8 md:px-12 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-body text-3xl md:text-4xl tracking-[0.3em] uppercase text-wine mb-12 md:mb-16 text-center">
            Our Wedding
          </h2>
          <div className="grid gap-8 md:gap-12 md:grid-cols-3 items-start">
            <div className="flex flex-col items-center text-center">
              <img
                src={images.calendar}
                alt="Wedding date"
                className="w-full max-w-[200px] object-contain mb-4 rounded-xl"
              />
              <p className="font-display text-xl md:text-2xl text-wine/90">
                Saturday September 12, 2026
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <img
                src={images.calendar}
                alt="Wedding venue"
                className="w-full max-w-[200px] object-contain mb-4 rounded-xl"
              />
              <p className="font-body text-base md:text-lg text-charcoal">
                Gufo &middot; 660 Cambridge St &middot; Cambridge, MA 02141
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <img
                src={images.calendar}
                alt="Wedding schedule"
                className="w-full max-w-[200px] object-contain mb-4 rounded-xl"
              />
              <p className="font-body text-base md:text-lg text-charcoal">
                Doors Open: 5:00 PM &nbsp;&bull;&nbsp; Ceremony: 5:30 PM
                &nbsp;&bull;&nbsp; Reception: 7:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
