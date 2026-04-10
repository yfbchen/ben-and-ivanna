import { CalendarPlus } from "lucide-react";

import { images } from "@/config/images";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { downloadIcsFile, getGoogleCalendarUrl } from "@/lib/calendar";

export function OurWeddingSection() {
  return (
    <section id="our-wedding" className="w-full py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-10 lg:px-14">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-wedding-section-heading text-3xl md:text-4xl tracking-brand text-wedding-heading mb-6 md:mb-8 text-center">
            Our Wedding
          </h2>
          <p className="font-wedding-content text-base md:text-lg tracking-brand text-wedding-body text-center max-w-3xl mx-auto mb-10 md:mb-12">
            Let&apos;s eat, laugh, and dance the night away! We&apos;re so excited to celebrate
            with you.
          </p>
          <div className="flex justify-center mb-12 md:mb-16">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="elegant"
                  size="lg"
                  className="border-0 h-14 min-w-[220px] rounded-full px-10 text-sm sm:text-base normal-case"
                >
                  <CalendarPlus className="h-5 w-5 shrink-0" />
                  Add to calendar.
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="bg-wedding-main-contrast border border-theme-content-subtle text-theme-navbar"
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
                src={images.calendar}
                alt="Wedding date"
                className="w-full max-w-[200px] object-contain mb-4 rounded-xl"
              />
              <div className="font-wedding-content text-base md:text-lg tracking-brand text-wedding-body space-y-0.5">
                <p>Saturday</p>
                <p>September 12, 2026</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <img
                src={images.calendar}
                alt="Wedding venue"
                className="w-full max-w-[200px] object-contain mb-4 rounded-xl"
              />
              <div className="font-wedding-content text-base md:text-lg tracking-brand text-wedding-body space-y-0.5 max-w-[260px]">
                <p>Gufo</p>
                <p>660 Cambridge St., Cambridge</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <img
                src={images.calendar}
                alt="Wedding day schedule"
                className="w-full max-w-[200px] object-contain mb-4 rounded-xl"
              />
              <div className="font-wedding-content text-base md:text-lg tracking-brand text-wedding-body space-y-0.5">
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
