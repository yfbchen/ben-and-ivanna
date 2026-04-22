import { Fragment } from "react";
import {
  weddingBodyCopyClassName,
  weddingSectionClassName,
  weddingSectionTitleMarginClassNameOurStory,
} from "@/config/weddingSectionLayout";
import { ourStoryTimelineAccentHex } from "@/config/weddingThemeTokens";
import { useWeddingThemeFromDocument } from "@/hooks/useWeddingThemeFromDocument";
import { ourStoryEvents } from "@/data/wedding";

export function OurStorySection() {
  const weddingTheme = useWeddingThemeFromDocument();
  const timelineAccent = ourStoryTimelineAccentHex(weddingTheme);
  const timelineLineColor = `color-mix(in srgb, ${timelineAccent} 55%, transparent)`;

  return (
    <section
      id="our-story"
      className={`${weddingSectionClassName} flex justify-center flex-col items-center`}
    >
      <h2
        className={`font-wedding-section-heading text-4xl md:text-5xl tracking-brand text-wedding-heading text-center leading-tight ${weddingSectionTitleMarginClassNameOurStory}`}
      >
        Our Story
      </h2>

      <div className="w-full max-w-[min(100%,84rem)] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 md:-mt-6">
        {/* Desktop: grid timeline */}
        <div className="relative h-[500px] hidden md:block">
          <div
            className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
            style={{ backgroundColor: timelineLineColor }}
            aria-hidden
          />
          <div
            className="grid h-full gap-x-4 md:gap-x-6 lg:gap-x-8 xl:gap-x-10"
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
                    <div className="relative z-20 w-32 h-32 overflow-hidden rounded-full border border-wine/35 shrink-0 transition-transform duration-300 ease-out hover:scale-[1.85]">
                      <img
                        src={event.image}
                        alt={event.alt}
                        referrerPolicy="no-referrer"
                        className="h-full w-full rounded-full object-cover [transform:translateZ(0)]"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className={weddingBodyCopyClassName}>{event.date}</p>
                      <p
                        className={`${weddingBodyCopyClassName} max-w-[min(100%,12rem)] mt-0.5`}
                      >
                        {event.text}
                      </p>
                    </div>
                  )}
                </div>
                <div
                  className="flex items-center justify-center"
                  style={{ gridColumn: i + 1, gridRow: 2 }}
                >
                  <div
                    className="w-4 h-4 rounded-full border-2 border-[var(--wedding-surface-neutral)] z-10 shrink-0"
                    style={{ backgroundColor: timelineAccent }}
                  />
                </div>
                <div
                  className="flex flex-col items-center justify-start pt-1 min-w-0"
                  style={{ gridColumn: i + 1, gridRow: 3 }}
                >
                  {event.imageAbove ? (
                    <div className="text-center">
                      <p className={weddingBodyCopyClassName}>{event.date}</p>
                      <p
                        className={`${weddingBodyCopyClassName} max-w-[min(100%,12rem)] mt-0.5`}
                      >
                        {event.text}
                      </p>
                    </div>
                  ) : (
                    <div className="relative z-20 w-32 h-32 overflow-hidden rounded-full border border-wine/35 shrink-0 transition-transform duration-300 ease-out hover:scale-[1.85]">
                      <img
                        src={event.image}
                        alt={event.alt}
                        referrerPolicy="no-referrer"
                        className="h-full w-full rounded-full object-cover [transform:translateZ(0)]"
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
              <div className="relative z-20 w-36 h-36 overflow-hidden rounded-full border border-wine/35 mb-2 shrink-0 transition-transform duration-300 ease-out hover:scale-[1.85]">
                <img
                  src={event.image}
                  alt={event.alt}
                  referrerPolicy="no-referrer"
                  className="h-full w-full rounded-full object-cover [transform:translateZ(0)]"
                />
              </div>
              <p className={weddingBodyCopyClassName}>{event.date}</p>
              <p className={`${weddingBodyCopyClassName} max-w-[240px] mt-0.5`}>
                {event.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
