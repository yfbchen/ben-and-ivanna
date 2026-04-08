import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface RsvpSectionProps {
  searchFirstName: string;
  setSearchFirstName: (v: string) => void;
  searchLastName: string;
  setSearchLastName: (v: string) => void;
  isSearching: boolean;
  onSearch: (e: React.FormEvent) => void;
}

export function RsvpSection({
  searchFirstName,
  setSearchFirstName,
  searchLastName,
  setSearchLastName,
  isSearching,
  onSearch,
}: RsvpSectionProps) {
  return (
    <section
      id="rsvp"
      className="w-full flex items-center justify-center py-16 md:py-24"
    >
      <div className="container mx-auto px-6 md:px-10 lg:px-14">
        <div className="max-w-5xl mx-auto grid gap-12 md:gap-16 md:grid-cols-[1.1fr,1.2fr] items-center justify-items-center">
          <div className="max-w-md w-full text-ivory text-center md:text-left">
            <p className="font-body text-sm tracking-[0.3em] uppercase text-gold mb-4">
              RSVP
            </p>
            <h2 className="font-display text-3xl md:text-5xl mb-4">
              Will You Join Us?
            </h2>
            <p className="text-ivory/90 font-body">
              Kindly respond by June 30, 2026 so we can plan the celebration
              with you in mind.
            </p>
          </div>

          <div className="max-w-xl w-full">
            <form
              onSubmit={onSearch}
              className="space-y-6 bg-ivory/98 p-8 md:p-12 shadow-elegant rounded-lg border border-gold/45"
            >
              <p className="font-body text-sm text-charcoal/60 uppercase tracking-wide">
                RSVP For:
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  placeholder="First name"
                  value={searchFirstName}
                  onChange={(e) => setSearchFirstName(e.target.value)}
                  disabled={isSearching}
                  className="font-body bg-ivory border-forest/25 text-charcoal placeholder:text-charcoal/45 focus-visible:ring-forest/35"
                />
                <Input
                  placeholder="Last name"
                  value={searchLastName}
                  onChange={(e) => setSearchLastName(e.target.value)}
                  disabled={isSearching}
                  className="font-body bg-ivory border-forest/25 text-charcoal placeholder:text-charcoal/45 focus-visible:ring-forest/35"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-gold text-wine hover:bg-gold-light font-semibold shadow-md"
                disabled={isSearching}
              >
                {isSearching ? (
                  "Searching..."
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
