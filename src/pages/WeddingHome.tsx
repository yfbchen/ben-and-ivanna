import { useState, useEffect, Fragment } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, MapPin, Calendar, Clock, Gift, Mail, Search, X } from "lucide-react";
import { toast } from "sonner";
import { createClient } from '@supabase/supabase-js';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { images } from "@/config/images";
import { EnvelopeModal } from "@/components/EnvelopeModal";

const heroPhotoHorizontal = images.heroHorizontal;
const heroPhotoVertical = images.heroVertical;
const calendarImage = images.calendar;

const supabaseUrl = 'https://fpcnecyggvzhcoigoegf.supabase.co';
const supabaseAnonKey = 'sb_publishable_RaiMNVnnKyF6g1cqPaUinQ_KajPffxb';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ourStoryEvents = [
  {
    date: "2010",
    text: "\"I like your t-shirt\" - Ben's first compliment to Ivanna. That began our friendship.",
    image: heroPhotoHorizontal,
    alt: "When we met",
    imageAbove: true,
  },
  {
    date: "2013",
    text: "Ben asked Ivanna to be his prom date...and swept her off her feet!",
    image: heroPhotoVertical,
    alt: "Asked to prom",
    imageAbove: false,
  },
  {
    date: "2014",
    text: "Our \"first dance\" together, as Waldo finds his Walda. Still only best friends :)",
    image: heroPhotoHorizontal,
    alt: "Waldo and Walda",
    imageAbove: true,
  },
  {
    date: "10.11.2014",
    text: "We started dating <3! Ben asked Ivanna out after taking her out on a very very long stroll at night.",
    image: heroPhotoVertical,
    alt: "dating",
    imageAbove: false,
  },
  {
    date: "2023",
    text: "We move in together at NYC and start the next chapter of our lives!",
    image: heroPhotoVertical,
    alt: "move in",
    imageAbove: true,
  },
  {
    date: "04.03.2025",
    text: "WE'RE ENGAGED!",
    image: heroPhotoHorizontal,
    alt: "Engagement",
    imageAbove: false,
  },
];

type Guest = {
  id: string;
  party_id: string;
  firstname: string;
  lastname: string;
  email: string | null;
  phone: string | null;
  attending: string | null;
  dietary_restrictions: string | null;
  message: string | null;
  updated_at: string;
};

const WeddingHome = () => {
  const location = useLocation();
  const [searchFirstName, setSearchFirstName] = useState("");
  const [searchLastName, setSearchLastName] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [foundPartyMembers, setFoundPartyMembers] = useState<Guest[]>([]);
  const [rsvpModalOpen, setRsvpModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [partyResponses, setPartyResponses] = useState<
    Record<string, { attending: string; email: string; phone: string; dietaryRestrictions: string; message: string }>
  >({});

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const navOffset = 72;
    const targetY = element.getBoundingClientRect().top + window.pageYOffset - navOffset;
    const startY = window.pageYOffset;
    const distance = targetY - startY;
    const duration = 900;
    const startTime = performance.now();

    const easeInOutQuad = (t: number) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = easeInOutQuad(progress);
      window.scrollTo(0, startY + distance * eased);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  // When navigating to /#section (e.g. from Layout nav), smooth-scroll to that section
  useEffect(() => {
    const id = location.hash.slice(1);
    if (id) {
      const el = document.getElementById(id);
      if (el) {
        requestAnimationFrame(() => scrollToSection(id));
      }
    }
  }, [location.pathname, location.hash]);

  // Update URL hash when user scrolls to a section (so refresh keeps them there)
  useEffect(() => {
    const sectionIds = ["hero", "our-wedding", "our-story", "his-proposal", "gallery", "gift", "rsvp"];
    const navOffset = 72;
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const updateHashFromScroll = () => {
      const scrollY = window.scrollY + navOffset + 100;
      let activeId = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (scrollY >= top && scrollY < bottom) {
          activeId = id;
          break;
        }
        if (scrollY < top) break;
        activeId = id;
      }
      const newHash = `#${activeId}`;
      if (window.location.hash !== newHash) {
        window.history.replaceState(null, "", `${window.location.pathname}${newHash}`);
      }
    };

    const onScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateHashFromScroll, 100);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateHashFromScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const handleGuestSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const first = searchFirstName.trim();
    const last = searchLastName.trim();
    if (!first || !last) {
      toast.error("Please enter both first and last name.");
      return;
    }
    setIsSearching(true);
    setFoundPartyMembers([]);
    try {
      // 1. Find guest by name to get their party_id
      const { data: matchedGuest, error: searchError } = await supabase
        .from("guests")
        .select("party_id")
        .ilike("firstname", first)
        .ilike("lastname", last)
        .limit(1)
        .maybeSingle();

      if (searchError) throw searchError;
      if (!matchedGuest) {
        toast.error("We couldn't find your invitation. Please check the spelling or contact us.");
        return;
      }

      // 2. Fetch all guests in the same party
      const { data: partyGuests, error: partyError } = await supabase
        .from("guests")
        .select("id, party_id, firstname, lastname, email, phone, attending, dietary_restrictions, message, updated_at")
        .eq("party_id", matchedGuest.party_id)
        .order("firstname");

      if (partyError) throw partyError;
      const guests = partyGuests ?? [];
      setFoundPartyMembers(guests);
      setPartyResponses(
        Object.fromEntries(
          guests.map((g) => [
            g.id,
            {
              attending: g.attending === "yes" || g.attending === "no" ? g.attending : "",
              email: "",
              phone: "",
              dietaryRestrictions: "",
              message: "",
            },
          ])
        )
      );
      setRsvpModalOpen(true);
    } catch (error) {
      console.error("Guest search error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const updatePartyResponse = (guestId: string, field: string, value: string) => {
    setPartyResponses((prev) => ({
      ...prev,
      [guestId]: {
        ...(prev[guestId] ?? { attending: "", email: "", phone: "", dietaryRestrictions: "", message: "" }),
        [field]: value,
      },
    }));
  };

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      for (const guest of foundPartyMembers) {
        const r = partyResponses[guest.id];
        if (!r) continue;
        const { error } = await supabase
          .from("guests")
          .update({
            attending: r.attending || null,
            email: r.email.trim() || null,
            phone: r.phone.trim() || null,
            dietary_restrictions: r.dietaryRestrictions.trim() || null,
            message: r.message.trim() || null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", guest.id);

        if (error) throw error;
      }
      toast.success("Thank you! Your response has been saved.");
      setRsvpModalOpen(false);
    } catch (error) {
      console.error("RSVP update error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero: Ivanna & Ben */}
      <section
        id="hero"
        className="min-h-[650px] bg-wine flex items-center justify-center pt-6 pb-6 overflow-hidden"
      >
        <div className="container relative mx-auto px-2 md:px-4 lg:px-6 min-h-[650px] max-w-6xl">
          {/* Horizontal image: bottom-left, slightly higher */}
          <div className="absolute left-0 md:left-4 bottom-6 md:bottom-10 w-[35%] max-w-xl h-50 md:h-55 lg:h-60 rounded-xl border border-gold/40 shadow-lg bg-wine overflow-hidden">
            <img
              src={heroPhotoHorizontal}
              alt="Ivanna and Ben"
              className="w-full h-full object-fill"
            />
          </div>
          {/* Vertical image: right side */}
          <div className="absolute right-0 md:right-4 top-15 md:top-20 bottom-6 md:bottom-10 w-32 md:w-44 lg:w-80 rounded-xl border border-gold/40 shadow-lg bg-wine overflow-hidden">
            <img
              src={heroPhotoVertical}
              alt="Ivanna and Ben"
              className="w-full h-full object-fill"
            />
          </div>
          {/* Title overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-gold text-center leading-tight">
              <span>Ivanna</span><br />
              <span>&amp; Ben</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Our Wedding */}
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
                  src={calendarImage}
                  alt="Wedding date"
                  className="w-full max-w-[200px] object-contain mb-4 rounded-xl"
                />
                <p className="font-display text-xl md:text-2xl text-wine/90">
                  Saturday September 12, 2026
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <img
                  src={calendarImage}
                  alt="Wedding venue"
                  className="w-full max-w-[200px] object-contain mb-4 rounded-xl"
                />
                <p className="font-body text-base md:text-lg text-charcoal">
                  Gufo &middot; 660 Cambridge St &middot; Cambridge, MA 02141
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <img
                  src={calendarImage}
                  alt="Wedding schedule"
                  className="w-full max-w-[200px] object-contain mb-4 rounded-xl"
                />
                <p className="font-body text-base md:text-lg text-charcoal">
                  Doors Open: 5:00 PM &nbsp;&bull;&nbsp; Ceremony: 5:30 PM &nbsp;&bull;&nbsp; Reception: 7:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section
        id="our-story"
        className="min-h-[650px] bg-forest flex justify-center flex-col items-center py-12 md:py-16"
      >
        <h2 className="font-script text-4xl md:text-5xl lg:text-6xl text-ivory/95 text-center mb-12 md:mb-16">
          Our Story
        </h2>

        <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
          {/* Timeline: grid with explicit center row so line and dots share the same axis */}
          <div className="relative h-[420px] hidden md:block">
            {/* Central line - at exactly 50% of container */}
            <div
              className="absolute inset-x-0 top-1/2 h-px bg-ivory/40 -translate-y-1/2"
              aria-hidden
            />

            <div
              className="grid h-full gap-x-2"
              style={{
                gridTemplateColumns: "repeat(5, 1fr)",
                gridTemplateRows: "1fr 16px 1fr",
              }}
            >
              {ourStoryEvents.map((event, i) => (
                <Fragment key={i}>
                  {/* Top row */}
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
                        <p className="font-body text-base text-ivory/90">{event.date}</p>
                        <p className="font-body text-sm text-ivory/80 leading-snug max-w-[140px] mt-0.5">
                          {event.text}
                        </p>
                      </div>
                    )}
                  </div>
                  {/* Center row - dot on the line (row 2 is exactly at 50%) */}
                  <div
                    key={`${i}-dot`}
                    className="flex items-center justify-center"
                    style={{ gridColumn: i + 1, gridRow: 2 }}
                  >
                    <div className="w-4 h-4 rounded-full bg-ivory/70 border-2 border-forest z-10 shrink-0" />
                  </div>
                  {/* Bottom row */}
                  <div
                    key={`${i}-bottom`}
                    className="flex flex-col items-center justify-start pt-1 min-w-0"
                    style={{ gridColumn: i + 1, gridRow: 3 }}
                  >
                    {event.imageAbove ? (
                      <div className="text-center">
                        <p className="font-body text-base text-ivory/90">{event.date}</p>
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

          {/* Mobile: simple vertical timeline */}
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

      {/* His Proposal */}
      <section
        id="his-proposal"
        className="min-h-[650px] bg-wine flex items-center justify-center py-12 md:py-16"
      >
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="max-w-5xl mx-auto grid gap-12 md:gap-16 md:grid-cols-2 items-center justify-items-center">
            <div className="order-2 md:order-1 max-w-xl w-full text-center md:text-left">
              <h2 className="font-body text-3xl md:text-3xl tracking-[0.3em] uppercase text-gold mb-6">
                His Proposal
              </h2>
              <div className="space-y-4 font-body text-base md:text-lg text-ivory/90 leading-relaxed">
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
                  euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                </p>
                <p>
                  Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit
                  lobortis nisl ut aliquip ex ea commodo consequat.
                </p>
                <p>
                  Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
                  consequat, vel illum dolore eu feugiat nulla facilisis.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2 w-full flex justify-center">
              <img
                src={heroPhotoHorizontal}
                alt="Proposal placeholder"
                className="aspect-[4/5] w-full max-w-sm object-cover rounded-xl border border-gold/40"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section
        id="gallery"
        className="min-h-[650px] bg-butter flex items-center justify-center py-12 md:py-16"
      >
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="max-w-5xl mx-auto grid gap-12 md:gap-16 md:grid-cols-2 items-center justify-items-center">
            {/* Left: single photo block */}
            <div className="w-full flex justify-center">
              <img
                src={heroPhotoHorizontal}
                alt="Gallery placeholder"
                className="aspect-[4/5] w-full max-w-sm object-cover rounded-xl border border-wine/30"
              />
            </div>

            {/* Right: heading + copy */}
            <div className="max-w-xl w-full text-center md:text-left">
              <h2 className="font-body text-3xl md:text-3xl tracking-[0.3em] uppercase text-gold mb-6">
                Gallery
              </h2>
              <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed">
                There's no better way to capture the memories of our special day than through photos. You'll
                find all of our favorite photos and moments from our engagement and wedding day on the gallery board!
              </p>
              <Button
                variant="minimal"
                className="mt-6 tracking-[0.2em] uppercase text-xs"
                asChild
              >
                <Link to="/gallery">
                  View Full Gallery
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Registry */}
      <section
        id="gift"
        className="min-h-[650px] bg-wine flex items-center justify-center py-12 md:py-16"
      >
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="max-w-5xl mx-auto grid gap-12 md:gap-16 md:grid-cols-2 items-center justify-items-center">
            <div className="text-ivory max-w-xl w-full text-center md:text-left">
              <p className="font-body text-xs md:text-sm tracking-[0.3em] uppercase text-gold mb-6">
                Registry
              </p>
              <h2 className="font-display text-3xl md:text-5xl mb-6">
                Gift Registry
              </h2>
              <p className="font-body text-base md:text-lg text-ivory/90 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
                euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
              </p>
            </div>
            <div className="w-full flex justify-center">
              <img
                src={heroPhotoHorizontal}
                alt="Registry placeholder"
                className="aspect-[4/5] w-full max-w-sm object-cover rounded-xl border border-gold/40"
              />
            </div>
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="min-h-[650px] bg-forest flex items-center justify-center py-12 md:py-16">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="max-w-5xl mx-auto grid gap-12 md:gap-16 md:grid-cols-[1.1fr,1.2fr] items-center justify-items-center">
            <div className="max-w-md w-full text-ivory text-center md:text-left">
              <p className="font-body text-sm tracking-[0.3em] uppercase mb-4">
                RSVP
              </p>
              <h2 className="font-display text-3xl md:text-5xl mb-4">
                Will You Join Us?
              </h2>
              <p className="text-ivory/90 font-body">
                Kindly respond by June 30, 2026 so we can plan the celebration with you in mind.
              </p>
            </div>

            <div className="max-w-xl w-full">
              <form onSubmit={handleGuestSearch} className="space-y-6 bg-gold-light p-8 md:p-12 shadow-xl rounded-lg">
                <p className="font-body text-sm text-muted-foreground uppercase tracking-wide">
                  RSVP For:
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    placeholder="First name"
                    value={searchFirstName}
                    onChange={(e) => setSearchFirstName(e.target.value)}
                    disabled={isSearching}
                    className="font-body bg-gold-light border-charcoal/20"
                  />
                  <Input
                    placeholder="Last name"
                    value={searchLastName}
                    onChange={(e) => setSearchLastName(e.target.value)}
                    disabled={isSearching}
                    className="font-body bg-gold-light border-charcoal/20"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-rose-800 hover:bg-rose-900 text-white"
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

      {/* RSVP modal - envelope opens, letter slides out, then modal transitions in */}
      <EnvelopeModal isOpen={rsvpModalOpen} onClose={() => setRsvpModalOpen(false)}>
        <div className="flex flex-col min-h-0 flex-1 overflow-hidden rounded-lg border border-stone-200 bg-[#FAF9F6] p-6 shadow-xl">
          <div className="flex items-center justify-between shrink-0 mb-4">
            <h2 className="font-display text-lg font-semibold">
              {foundPartyMembers.length > 0
                ? `RSVP for ${foundPartyMembers.map((g) => `${g.firstname} ${g.lastname}`).join(" & ")}`
                : "RSVP"}
            </h2>
            <button
              type="button"
              onClick={() => setRsvpModalOpen(false)}
              className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </div>
          <form onSubmit={handleRsvpSubmit} className="flex flex-col min-h-0 flex-1 overflow-hidden">
            <div className="py-4 space-y-6 overflow-y-auto min-h-0 flex-1 pr-2">
                    {foundPartyMembers.map((guest) => {
                      const r = partyResponses[guest.id] ?? {
                        attending: "",
                        email: "",
                        phone: "",
                        dietaryRestrictions: "",
                        message: "",
                      };
                      return (
                        <div
                          key={guest.id}
                          className="rounded-lg border border-border bg-muted/30 p-4 space-y-4"
                        >
                          <h4 className="font-display text-lg text-foreground">
                            {guest.firstname} {guest.lastname}
                          </h4>
                          <div className="space-y-3">
                            <div>
                              <Label className="text-muted-foreground font-body text-sm uppercase tracking-wide">
                                Attending
                              </Label>
                              <RadioGroup
                                value={r.attending}
                                onValueChange={(v) => updatePartyResponse(guest.id, "attending", v)}
                                className="flex gap-6 pt-2"
                              >
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <RadioGroupItem value="yes" id={`${guest.id}-yes`} />
                                  <span className="font-body text-sm">Yes</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <RadioGroupItem value="no" id={`${guest.id}-no`} />
                                  <span className="font-body text-sm">No</span>
                                </label>
                              </RadioGroup>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`${guest.id}-email`} className="text-muted-foreground font-body text-sm">
                                Email
                              </Label>
                              <Input
                                id={`${guest.id}-email`}
                                type="email"
                                placeholder="your@email.com"
                                value={r.email}
                                onChange={(e) => updatePartyResponse(guest.id, "email", e.target.value)}
                                className="font-body"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`${guest.id}-phone`} className="text-muted-foreground font-body text-sm">
                                Phone
                              </Label>
                              <Input
                                id={`${guest.id}-phone`}
                                type="tel"
                                placeholder="(555) 123-4567"
                                value={r.phone}
                                onChange={(e) => updatePartyResponse(guest.id, "phone", e.target.value)}
                                className="font-body"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`${guest.id}-dietary`} className="text-muted-foreground font-body text-sm">
                                Dietary restrictions
                              </Label>
                              <Input
                                id={`${guest.id}-dietary`}
                                placeholder="Vegetarian, allergies, etc."
                                value={r.dietaryRestrictions}
                                onChange={(e) => updatePartyResponse(guest.id, "dietaryRestrictions", e.target.value)}
                                className="font-body"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`${guest.id}-message`} className="text-muted-foreground font-body text-sm">
                                Message (optional)
                              </Label>
                              <textarea
                                id={`${guest.id}-message`}
                                placeholder="Leave a note for the couple..."
                                value={r.message}
                                onChange={(e) => updatePartyResponse(guest.id, "message", e.target.value)}
                                rows={3}
                                className="flex w-full rounded-md border border-input bg-background px-4 py-3 text-sm font-body transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
            </div>
            <div className="shrink-0 pt-4 border-t border-border mt-4">
              <Button
                type="submit"
                size="lg"
                className="w-full bg-rose-800 hover:bg-rose-900 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Update response"}
              </Button>
            </div>
          </form>
        </div>
      </EnvelopeModal>
    </>
  );
};

export default WeddingHome;
