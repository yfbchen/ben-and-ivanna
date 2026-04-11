import { CalendarPlus } from "lucide-react";

import { WEDDING_OUR_WEDDING_ICONS } from "@/config/weddingLockups";
import {
  weddingBodyCopyClassName,
  weddingElegantCtaButtonClassName,
  weddingSectionClassName,
  weddingSectionContainerClassName,
  weddingSectionTitleMarginClassName,
} from "@/config/weddingSectionLayout";
import { useWeddingThemeFromDocument } from "@/hooks/useWeddingThemeFromDocument";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { downloadIcsFile, getGoogleCalendarUrl } from "@/lib/calendar";

/** Large decorative icons; grid column width caps them in the 3-up layout. */
const ourWeddingIconClassName =
  "w-full max-w-[520px] object-contain mb-0 rounded-xl mx-auto";

/** Pull captions up toward the art (line-height + PNG padding leave a gap). */
const ourWeddingCaptionClassName = `${weddingBodyCopyClassName} space-y-0.5 -mt-1.5`;

export function OurWeddingSection() {
  const weddingTheme = useWeddingThemeFromDocument();
  const [iconDate, iconVenue, iconSchedule] = WEDDING_OUR_WEDDING_ICONS[weddingTheme];

  return (
    <section id="our-wedding" className={weddingSectionClassName}>
      <div className={weddingSectionContainerClassName}>
        <div className="max-w-7xl mx-auto">
          <h2
            className={`font-wedding-section-heading text-3xl md:text-4xl tracking-brand text-wedding-heading text-center ${weddingSectionTitleMarginClassName}`}
          >
            Our Wedding
          </h2>
          <p
            className={`${weddingBodyCopyClassName} text-center max-w-3xl mx-auto mb-10 md:mb-12`}
          >
            Let&apos;s eat, laugh, and dance the night away! We&apos;re so excited to celebrate
            with you.
          </p>
          <div className="flex justify-center mb-6 md:mb-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="elegant"
                  size="lg"
                  className={weddingElegantCtaButtonClassName}
                >
                  <CalendarPlus className="h-5 w-5 shrink-0" />
                  Add To Calendar
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="min-w-[var(--radix-dropdown-menu-trigger-width)] w-[var(--radix-dropdown-menu-trigger-width)] bg-wedding-main-contrast border border-theme-content-subtle text-theme-navbar"
              >
                <DropdownMenuItem asChild>
                  <a
                    href={getGoogleCalendarUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Calendar
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={downloadIcsFile}>
                  Apple Calendar / Outlook
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="grid gap-8 md:gap-12 md:grid-cols-3 items-start">
            <div className="flex flex-col items-center text-center">
              <img
                src={iconDate}
                alt="Wedding date"
                className={ourWeddingIconClassName}
              />
              <div className={ourWeddingCaptionClassName}>
                <p>Saturday</p>
                <p>September 12, 2026</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <img
                src={iconVenue}
                alt="Wedding venue"
                className={ourWeddingIconClassName}
              />
              <div className={`${ourWeddingCaptionClassName} max-w-[260px]`}>
                <p>Gufo</p>
                <p>660 Cambridge St., Cambridge</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <img
                src={iconSchedule}
                alt="Wedding day schedule"
                className={ourWeddingIconClassName}
              />
              <div className={ourWeddingCaptionClassName}>
                <p>Door Opens: 5PM</p>
                <p>Ceremony: 5:30PM</p>
                <p>Cocktail Hour: 6PM</p>
                <p>Reception: 7PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
