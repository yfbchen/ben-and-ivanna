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
import { cn } from "@/lib/utils";

/**
 * Shared “artboard” for venue + schedule PNGs (original scale; see calendar slot for date).
 */
const ourWeddingIconSlotClassName =
  "flex h-[210px] w-full max-w-[520px] flex-col items-center justify-end px-2 pb-0.5 sm:h-[225px] md:h-[248px] md:px-3";

/**
 * Calendar column: taller slot for `mt-6 md:mt-7` on the art — keeps PNG scale logic separate.
 */
const ourWeddingCalendarIconSlotClassName =
  "flex h-[234px] w-full max-w-[520px] flex-col items-center justify-start px-2 pb-0.5 sm:h-[249px] md:h-[276px] md:px-3";

const ourWeddingIconClassName =
  "max-h-full w-full object-contain object-bottom rounded-xl";

/** Space below the aligned icon block (replaces old negative margin now that slots are fixed). */
const ourWeddingCaptionClassName = `${weddingBodyCopyClassName} space-y-0.5 mt-2`;

/** Text-only frame under each illustration — border only, no fill. */
const ourWeddingCaptionPanelClassName =
  "w-full rounded-xl border border-wine/20 bg-transparent px-3 py-2.5";

/** Same width for all three caption frames (matches pasta / venue column). */
const ourWeddingCaptionPanelMaxWidthClassName = "max-w-[260px]";

/**
 * Offsets venue + schedule icon rows so captions line up with the calendar column
 * (difference vs tall slot: 24px default/sm, 28px md — matches mt-6 / md:mt-7 headroom).
 */
const ourWeddingIconSlotCaptionAlignClassName = "mb-6 md:mb-7";

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
          <div className="grid gap-1.5 md:gap-2 md:grid-cols-3 md:items-start">
            <div className="flex flex-col items-center text-center">
              <div className={ourWeddingCalendarIconSlotClassName}>
                <div className="flex min-h-0 flex-1 flex-col justify-end">
                  <img
                    src={iconDate}
                    alt="Wedding date"
                    className={cn(
                      ourWeddingIconClassName,
                      "mt-6 md:mt-7",
                    )}
                  />
                </div>
              </div>
              <div
                className={cn(
                  ourWeddingCaptionClassName,
                  ourWeddingCaptionPanelClassName,
                  ourWeddingCaptionPanelMaxWidthClassName,
                )}
              >
                <p>Saturday</p>
                <p>September 12, 2026</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div
                className={cn(
                  ourWeddingIconSlotClassName,
                  ourWeddingIconSlotCaptionAlignClassName,
                )}
              >
                <img
                  src={iconVenue}
                  alt="Wedding venue"
                  className={ourWeddingIconClassName}
                />
              </div>
              <div
                className={cn(
                  ourWeddingCaptionClassName,
                  ourWeddingCaptionPanelClassName,
                  ourWeddingCaptionPanelMaxWidthClassName,
                )}
              >
                <p>Gufo</p>
                <p>660 Cambridge St., Cambridge</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div
                className={cn(
                  ourWeddingIconSlotClassName,
                  ourWeddingIconSlotCaptionAlignClassName,
                )}
              >
                <img
                  src={iconSchedule}
                  alt="Wedding day schedule"
                  className={ourWeddingIconClassName}
                />
              </div>
              <div
                className={cn(
                  ourWeddingCaptionClassName,
                  ourWeddingCaptionPanelClassName,
                  ourWeddingCaptionPanelMaxWidthClassName,
                )}
              >
                <p>Door Opens: 5PM</p>
                <p>Ceremony Starts: 5:30PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
