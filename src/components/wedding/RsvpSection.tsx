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
          <div className="max-w-md w-full text-theme-navbar text-center md:text-left">
            <h2 className="font-wedding-section-heading text-3xl md:text-5xl tracking-brand mb-4">
              RSVP
            </h2>
            <p className="font-wedding-content tracking-brand">
              Please respond by June 1st, 2024 so we can plan our celebration
              and your arrival.
            </p>
          </div>

          <div className="max-w-xl w-full">
            <form
              onSubmit={onSearch}
              className="space-y-6 bg-ivory/98 p-8 md:p-12 shadow-elegant rounded-lg border border-gold/45"
            >
              <p className="font-wedding-content text-base text-theme-navbar tracking-brand">
                Will you be joining us? *
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  placeholder="First Name"
                  value={searchFirstName}
                  onChange={(e) => setSearchFirstName(e.target.value)}
                  disabled={isSearching}
                  className="font-wedding-content bg-ivory border-forest/25 text-theme-navbar placeholder:text-theme-navbar/45 focus-visible:ring-forest/35"
                />
                <Input
                  placeholder="Last Name"
                  value={searchLastName}
                  onChange={(e) => setSearchLastName(e.target.value)}
                  disabled={isSearching}
                  className="font-wedding-content bg-ivory border-forest/25 text-theme-navbar placeholder:text-theme-navbar/45 focus-visible:ring-forest/35"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-gold text-wine hover:bg-gold-light font-semibold shadow-md tracking-brand font-wedding-button-rsvp"
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
