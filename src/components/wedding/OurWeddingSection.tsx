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
          <h2 className="font-body text-3xl md:text-4xl tracking-[0.28em] uppercase text-wedding-heading mb-12 md:mb-16 text-center">
            Our Wedding
          </h2>
          <div className="grid gap-8 md:gap-12 md:grid-cols-3 items-start">
            <div className="flex flex-col items-center text-center">
              <img
                src={images.calendar}
                alt="Wedding date"
                className="w-full max-w-[200px] object-contain mb-4 rounded-xl"
              />
              <p className="font-display text-xl md:text-2xl text-wedding-body">
                Saturday September 12, 2026
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <img
                src={images.calendar}
                alt="Wedding venue"
                className="w-full max-w-[200px] object-contain mb-4 rounded-xl"
              />
              <p className="font-body text-base md:text-lg text-wedding-body">
                Gufo &middot; 660 Cambridge St &middot; Cambridge, MA 02141
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <img
                src={images.calendar}
                alt="Wedding schedule"
                className="w-full max-w-[200px] object-contain mb-4 rounded-xl"
              />
              <p className="font-body text-base md:text-lg text-wedding-body">
                Doors Open: 5:00 PM &nbsp;&bull;&nbsp; Ceremony: 5:30 PM
                &nbsp;&bull;&nbsp; Reception: 7:00 PM
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-12 md:mt-16">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="elegant"
                  size="sm"
                  className="bg-wine text-gold-light hover:bg-wine/90 hover:text-gold-light border-0"
                >
                  <CalendarPlus className="h-4 w-4" />
                  Add to Calendar
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="bg-wedding-main-contrast border-wine/20 text-charcoal"
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
        </div>
      </div>
    </section>
  );
}
