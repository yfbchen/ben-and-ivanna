import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, MapPin, Calendar, Clock, Gift, Mail, Menu, X } from "lucide-react";
// import heroBotanical from "@/assets/hero-botanical.jpg";
import { toast } from "sonner";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fpcnecyggvzhcoigoegf.supabase.co';
const supabaseAnonKey = 'sb_publishable_RaiMNVnnKyF6g1cqPaUinQ_KajPffxb';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const WeddingHome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    setIsMenuOpen(false);
  };

  const navItems: Array<{ label: string; sectionId: string }> = [
    { label: "Our Wedding", sectionId: "our-wedding" },
    { label: "Our Story", sectionId: "our-story" },
    { label: "His Proposal", sectionId: "his-proposal" },
    { label: "Gallery", sectionId: "gallery" },
    { label: "Registry", sectionId: "gift" },
  ];

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
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-wine text-gold border-y border-gold/40">
        <div className="container mx-auto px-6 h-14 flex items-center gap-6">
          <button
            onClick={() => scrollToSection("hero")}
            className="shrink-0 font-navBrand text-xl sm:text-2xl leading-none tracking-[0.22em] uppercase text-gold hover:text-gold/90 transition-colors"
            aria-label="Go to top navigation"
          >
            IVANNA & BEN
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex flex-1 items-center justify-end gap-10 pr-6">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.sectionId)}
                className="font-navLink text-[16px] lg:text-[17px] font-medium leading-none tracking-[0.08em] text-gold/90 hover:text-gold transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop RSVP */}
          <div className="hidden md:flex shrink-0">
            <Button
              type="button"
              onClick={() => scrollToSection("rsvp")}
              className="h-9 px-6 rounded-full bg-gold-light text-wine border border-gold/80 hover:bg-gold-light/90 shadow-soft font-navLink text-[16px] lg:text-[17px] font-medium leading-none tracking-[0.08em]"
            >
              RSVP
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden ml-auto p-2 text-gold"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gold/30 bg-wine animate-fade-in">
            <div className="container mx-auto px-6 py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.sectionId)}
                  className="text-left font-navLink text-[16px] font-medium leading-none tracking-[0.08em] text-gold/90 hover:text-gold transition-colors py-3"
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-2 pb-1">
                <Button
                  type="button"
                  onClick={() => scrollToSection("rsvp")}
                  className="w-full h-10 rounded-full bg-gold-light text-wine border border-gold/80 hover:bg-gold-light/90 shadow-soft font-navLink text-[16px] font-medium leading-none tracking-[0.08em]"
                >
                  RSVP
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero: Ivanna & Ben */}
      <section
        id="hero"
        className="min-h-[600px] bg-wine flex items-center justify-center pt-24"
      >
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="relative max-w-5xl mx-auto">
            <div className="grid gap-4 md:gap-8 md:grid-cols-2">
              <img
                src="/photo1.png"
                alt="Ivanna and Ben"
                className="aspect-[4/5] w-full object-cover border border-gold/40"
              />
              <img
                src="/photo1.png"
                alt="Ivanna and Ben"
                className="aspect-[4/5] w-full object-cover border border-gold/40"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-gold text-center leading-tight">
                Ivanna &amp; Ben
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Our Wedding */}
      <section
        id="our-wedding"
        className="min-h-[600px] bg-butter flex items-center justify-center"
      >
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-body text-3xl md:text-4xl tracking-[0.3em] uppercase text-wine mb-12 md:mb-16 text-center">
              Our Wedding
            </h2>
            <div className="grid gap-8 md:gap-12 md:grid-cols-3 items-start">
              <div className="flex flex-col items-center text-center">
                <img
                  src="/calendar.png"
                  alt="Wedding date"
                  className="w-full max-w-[200px] object-contain mb-4"
                />
                <p className="font-display text-xl md:text-2xl text-wine/90">
                  Saturday September 12, 2026
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <img
                  src="/calendar.png"
                  alt="Wedding venue"
                  className="w-full max-w-[200px] object-contain mb-4"
                />
                <p className="font-body text-base md:text-lg text-charcoal">
                  Gufo &middot; 660 Cambridge St &middot; Cambridge, MA 02141
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <img
                  src="/calendar.png"
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
        className="min-h-[600px] bg-forest flex items-center justify-center"
      >
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="max-w-5xl mx-auto grid gap-12 md:gap-16 md:grid-cols-2 items-center justify-items-center">
            <div className="w-full flex justify-center">
              <img
                src="/photo1.png"
                alt="Our story placeholder"
                className="aspect-[4/5] w-full max-w-sm object-cover border border-gold/40"
              />
            </div>
            <div className="max-w-xl w-full text-center md:text-left">
              <h2 className="font-body text-3xl md:text-3xl tracking-[0.3em] uppercase text-wine mb-6">
                Our Story
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
          </div>
        </div>
      </section>

      {/* His Proposal */}
      <section
        id="his-proposal"
        className="min-h-[600px] bg-wine flex items-center justify-center"
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
                src="/photo1.png"
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
        className="min-h-[600px] bg-butter flex items-center justify-center"
      >
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="max-w-5xl mx-auto w-full">
            <p className="font-body text-xs md:text-sm tracking-[0.3em] uppercase text-wine mb-6 text-center">
              Gallery
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-foreground mb-10 text-center">
              Favorite Moments
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <img
                src="/photo1.png"
                alt="Gallery placeholder"
                className="aspect-[4/5] w-full object-cover border border-wine/30"
              />
              <img
                src="/photo1.png"
                alt="Gallery placeholder"
                className="aspect-[4/5] w-full object-cover border border-wine/30"
              />
              <img
                src="/photo1.png"
                alt="Gallery placeholder"
                className="aspect-[4/5] w-full object-cover border border-wine/30"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Registry */}
      <section
        id="gift"
        className="min-h-[600px] bg-wine flex items-center justify-center"
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
                src="/photo1.png"
                alt="Registry placeholder"
                className="aspect-[4/5] w-full max-w-sm object-cover border border-gold/40"
              />
            </div>
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="min-h-[600px] bg-forest flex items-center justify-center">
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
    </div>
  );
};

export default WeddingHome;
