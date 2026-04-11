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
          <div className="max-w-md w-full text-center md:text-left">
            <h2 className="font-wedding-section-heading text-3xl md:text-5xl tracking-brand mb-4 text-wedding-rsvp-heading">
              RSVP
            </h2>
            <p className="max-w-[46ch] mx-auto md:mx-0 font-wedding-content text-xl md:text-2xl leading-snug tracking-brand text-wedding-rsvp-body">
              Kindly respond by June 30, 2026 so we can plan the celebration
              with you in mind.
            </p>
          </div>

          <div className="max-w-xl w-full">
            <form
              onSubmit={onSearch}
              className="space-y-6 bg-black/8 p-8 md:p-12 shadow-elegant rounded-2xl border border-white/45"
            >
              <h3 className="font-wedding-section-heading font-bold text-xl md:text-2xl tracking-brand text-white leading-tight">
                Will you be joining us?
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  placeholder="First Name"
                  value={searchFirstName}
                  onChange={(e) => setSearchFirstName(e.target.value)}
                  disabled={isSearching}
                  className="h-12 rounded-full px-5 font-wedding-content bg-ivory border-forest/25 text-theme-navbar placeholder:text-theme-navbar/45 focus-visible:ring-forest/35"
                />
                <Input
                  placeholder="Last Name"
                  value={searchLastName}
                  onChange={(e) => setSearchLastName(e.target.value)}
                  disabled={isSearching}
                  className="h-12 rounded-full px-5 font-wedding-content bg-ivory border-forest/25 text-theme-navbar placeholder:text-theme-navbar/45 focus-visible:ring-forest/35"
                />
              </div>
              <Button
                type="submit"
                variant="rsvp"
                size="lg"
                className="w-full rounded-full px-10 font-semibold tracking-brand font-wedding-button-rsvp"
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
