import { useState, useEffect, Fragment } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, MapPin, Calendar, Clock, Gift, Mail } from "lucide-react";
import { toast } from "sonner";
import { createClient } from '@supabase/supabase-js';
// Use public folder paths - always loads correctly when deployed
const heroPhotoHorizontal = "/photos/photo1.png";
const heroPhotoVertical = "/photos/photo1-copy.png";
const calendarImage = "/calendar.png";

const supabaseUrl = 'https://fpcnecyggvzhcoigoegf.supabase.co';
const supabaseAnonKey = 'sb_publishable_RaiMNVnnKyF6g1cqPaUinQ_KajPffxb';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ourStoryEvents = [
  {
    date: "2012",
    text: "We started speaking to each other and became friends",
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

const WeddingHome = () => {
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rsvpForm, setRsvpForm] = useState({
    name: "",
    email: "",
    attending: "",
    guests: "1",
    dietaryRestrictions: "",
    message: "",
  });

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

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('rsvps')
        .insert([
          {
            name: rsvpForm.name,
            email: rsvpForm.email,
            attending: rsvpForm.attending,
            guests: parseInt(rsvpForm.guests),
            dietary_restrictions: rsvpForm.dietaryRestrictions || null,
            message: rsvpForm.message || null,
          }
        ]);

      if (error) throw error;

      toast.success("Thank you for your RSVP! We can't wait to celebrate with you.");

      setRsvpForm({
        name: "",
        email: "",
        attending: "",
        guests: "1",
        dietaryRestrictions: "",
        message: "",
      });
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      toast.error("Oops! Something went wrong. Please try again or contact us directly.");
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
          <div className="absolute left-0 md:left-4 bottom-6 md:bottom-10 w-[35%] max-w-xl h-50 md:h-55 lg:h-60 border border-gold/40 shadow-lg bg-wine overflow-hidden">
            <img
              src={heroPhotoHorizontal}
              alt="Ivanna and Ben"
              className="w-full h-full object-fill"
            />
          </div>
          {/* Vertical image: right side */}
          <div className="absolute right-0 md:right-4 top-15 md:top-20 bottom-6 md:bottom-10 w-32 md:w-44 lg:w-80 border border-gold/40 shadow-lg bg-wine overflow-hidden">
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
        className="min-h-[650px] bg-butter flex items-center justify-center"
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
                  className="w-full max-w-[200px] object-contain mb-4"
                />
                <p className="font-display text-xl md:text-2xl text-wine/90">
                  Saturday September 12, 2026
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <img
                  src={calendarImage}
                  alt="Wedding venue"
                  className="w-full max-w-[200px] object-contain mb-4"
                />
                <p className="font-body text-base md:text-lg text-charcoal">
                  Gufo &middot; 660 Cambridge St &middot; Cambridge, MA 02141
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <img
                  src={calendarImage}
                  alt="Wedding schedule"
                  className="w-full max-w-[200px] object-contain mb-4"
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
        className="min-h-[650px] bg-forest flex justify-center flex-col items-center"
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
            {[
              {
                date: "10.07.2017",
                text: "We met & fell in love",
                image: heroPhotoHorizontal,
                alt: "When we met",
              },
              {
                date: "07.07.2018",
                text: "We adventured...with a lot of fishing",
                image: heroPhotoVertical,
                alt: "Our adventures",
              },
              {
                date: "12.21.2019",
                text: "We proclaimed our love for the Lord together! Acts 22:16",
                image: heroPhotoHorizontal,
                alt: "Faith together",
              },
              {
                date: "08.24.2020",
                text: "We moved to AZ & adopted our Goosey",
                image: heroPhotoVertical,
                alt: "Moving to Arizona",
              },
              {
                date: "01.24.2023",
                text: "WE'RE ENGAGED!",
                image: heroPhotoHorizontal,
                alt: "Engagement",
              },
            ].map((event, i) => (
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
        className="min-h-[650px] bg-wine flex items-center justify-center"
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
                className="aspect-[4/5] w-full max-w-sm object-cover border border-gold/40"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section
        id="gallery"
        className="min-h-[650px] bg-butter flex items-center justify-center"
      >
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="max-w-5xl mx-auto grid gap-12 md:gap-16 md:grid-cols-2 items-center justify-items-center">
            {/* Left: single photo block */}
            <div className="w-full flex justify-center">
              <img
                src={heroPhotoHorizontal}
                alt="Gallery placeholder"
                className="aspect-[4/5] w-full max-w-sm object-cover border border-wine/30"
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
        className="min-h-[650px] bg-wine flex items-center justify-center"
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
                className="aspect-[4/5] w-full max-w-sm object-cover border border-gold/40"
              />
            </div>
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="min-h-[650px] bg-forest flex items-center justify-center">
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
              <div className="space-y-6 bg-background p-8 md:p-12 shadow-xl rounded-lg">
                <div className="space-y-4">
                  <Input
                    placeholder="Your Full Name"
                    value={rsvpForm.name}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                    required
                    disabled={isSubmitting}
                  />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={rsvpForm.email}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, email: e.target.value })}
                    required
                    disabled={isSubmitting}
                  />
                  
                  <div className="flex flex-col gap-2">
                    <label className="font-body text-sm text-muted-foreground uppercase tracking-wide">
                      Will you be attending?
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="attending"
                          value="yes"
                          checked={rsvpForm.attending === "yes"}
                          onChange={(e) => setRsvpForm({ ...rsvpForm, attending: e.target.value })}
                          className="w-4 h-4 text-rose-800"
                          required
                          disabled={isSubmitting}
                        />
                        <span className="font-body">Accept</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="attending"
                          value="no"
                          checked={rsvpForm.attending === "no"}
                          onChange={(e) => setRsvpForm({ ...rsvpForm, attending: e.target.value })}
                          className="w-4 h-4 text-rose-800"
                          disabled={isSubmitting}
                        />
                        <span className="font-body">Decline</span>
                      </label>
                    </div>
                  </div>

                  {rsvpForm.attending === "yes" && (
                    <>
                      <Input
                        placeholder="Dietary Restrictions (if any)"
                        value={rsvpForm.dietaryRestrictions}
                        onChange={(e) => setRsvpForm({ ...rsvpForm, dietaryRestrictions: e.target.value })}
                        disabled={isSubmitting}
                      />
                    </>
                  )}

                  <textarea
                    placeholder="Leave us a message (optional)"
                    value={rsvpForm.message}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, message: e.target.value })}
                    rows={4}
                    className="flex w-full rounded-md border border-input bg-background px-4 py-3 text-base font-body tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                    disabled={isSubmitting}
                  />
                </div>

                <Button 
                  onClick={handleRsvpSubmit}
                  size="lg" 
                  className="w-full bg-rose-800 hover:bg-rose-900 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send RSVP"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-cream border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Ivanna & Ben
          </h2>
          <p className="font-display text-xl text-gold italic mb-8">
            September 12, 2026
          </p>
          <Heart className="w-6 h-6 text-wine mx-auto" />
          <p className="text-muted-foreground font-body text-sm mt-8">
            We can't wait to celebrate with you!
          </p>
        </div>
      </footer>
    </>
  );
};

export default WeddingHome;
