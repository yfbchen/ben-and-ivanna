import { Fragment } from "react";
import { ourStoryEvents } from "@/data/wedding";

export function OurStorySection() {
  return (
    <section
      id="our-story"
      className="min-h-[650px] bg-forest flex justify-center flex-col items-center py-12 md:py-16"
    >
      <h2 className="font-script text-4xl md:text-5xl lg:text-6xl text-ivory/95 text-center mb-12 md:mb-16">
        Our Story
      </h2>

      <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
        {/* Desktop: grid timeline */}
        <div className="relative h-[420px] hidden md:block">
          <div
            className="absolute inset-x-0 top-1/2 h-px bg-ivory/40 -translate-y-1/2"
            aria-hidden
          />
          <div
            className="grid h-full gap-x-2"
            style={{
              gridTemplateColumns: "repeat(6, 1fr)",
              gridTemplateRows: "1fr 16px 1fr",
            }}
          >
            {ourStoryEvents.map((event, i) => (
              <Fragment key={i}>
                <div
                  className="flex flex-col items-center justify-end pb-1 min-w-0"
                  style={{ gridColumn: i + 1, gridRow: 1 }}
                >
                  {event.imageAbove ? (
                    <div className="relative z-20 w-32 h-32 overflow-hidden rounded-full border border-ivory/50 shrink-0 transition-transform duration-300 ease-out hover:scale-150">
                      <img
                        src={event.image}
                        alt={event.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="font-body text-base text-ivory/90">
                        {event.date}
                      </p>
                      <p className="font-body text-sm text-ivory/80 leading-snug max-w-[140px] mt-0.5">
                        {event.text}
                      </p>
                    </div>
                  )}
                </div>
                <div
                  className="flex items-center justify-center"
                  style={{ gridColumn: i + 1, gridRow: 2 }}
                >
                  <div className="w-4 h-4 rounded-full bg-ivory/70 border-2 border-forest z-10 shrink-0" />
                </div>
                <div
                  className="flex flex-col items-center justify-start pt-1 min-w-0"
                  style={{ gridColumn: i + 1, gridRow: 3 }}
                >
                  {event.imageAbove ? (
                    <div className="text-center">
                      <p className="font-body text-base text-ivory/90">
                        {event.date}
                      </p>
                      <p className="font-body text-sm text-ivory/80 leading-snug max-w-[140px] mt-0.5">
                        {event.text}
                      </p>
                    </div>
                  ) : (
                    <div className="relative z-20 w-32 h-32 overflow-hidden rounded-full border border-ivory/50 shrink-0 transition-transform duration-300 ease-out hover:scale-150">
                      <img
                        src={event.image}
                        alt={event.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </Fragment>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="flex flex-col gap-8 md:hidden">
          {ourStoryEvents.map((event, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="relative z-20 w-36 h-36 overflow-hidden rounded-full border border-ivory/50 mb-2 shrink-0 transition-transform duration-300 ease-out hover:scale-150">
                <img
                  src={event.image}
                  alt={event.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-body text-lg text-ivory/90">{event.date}</p>
              <p className="font-body text-base text-ivory/80 leading-snug max-w-[240px] mt-0.5">
                {event.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
