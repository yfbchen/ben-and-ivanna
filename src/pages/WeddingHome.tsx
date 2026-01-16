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
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-display text-2xl text-foreground">A & M</span>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {["Our Story", "Details", "RSVP", "Gift"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(" ", "-"))}
                className="font-body text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-background border-b border-border py-4 animate-fade-in">
            <div className="container mx-auto px-6 flex flex-col gap-4">
              {["Our Story", "Details", "RSVP", "Gift"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(" ", "-"))}
                  className="font-body text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors text-left py-2"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          // style={{ backgroundImage: `url(${heroBotanical})` }}
        />
        <div className="relative z-10 text-center px-6 py-32">
          <div className="animate-fade-in-up opacity-0">
            <p className="font-body text-sm tracking-[0.3em] uppercase text-wine mb-6">
              We're Getting Married
            </p>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-foreground mb-8 leading-tight">
              Ivanna
              <span className="block text-4xl md:text-5xl lg:text-6xl text-gold my-4">&</span>
              Ben
            </h1>
            <p className="font-display text-2xl md:text-3xl text-muted-foreground italic mb-12">
              September 12, 2026
            </p>
            <Button
              variant="elegant"
              size="xl"
              onClick={() => scrollToSection("rsvp")}
            >
              RSVP Now
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-gentle-float">
          <Heart className="w-6 h-6 text-wine" />
        </div>
      </section>

      {/* Our Story Section */}
      <section id="our-story" className="py-24 md:py-32 bg-cream">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-body text-sm tracking-[0.3em] uppercase text-wine mb-4 animate-fade-in-up opacity-0">
              Our Story
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-12 animate-fade-in-up opacity-0 animation-delay-100">
              How It All Began
            </h2>
            <div className="space-y-6 text-muted-foreground font-body text-lg leading-relaxed animate-fade-in-up opacity-0 animation-delay-200">
              <p>
                We first met at a cozy coffee shop on a rainy afternoon in October 2019. 
                What started as a chance encounter over a shared love of lattes and 
                literature turned into hours of conversation and laughter.
              </p>
              <p>
                From that day forward, we've been inseparable—traveling the world together, 
                adopting our beloved dog Luna, and building a life filled with love, 
                adventure, and endless cups of coffee.
              </p>
              <p>
                Now, we're thrilled to begin our next chapter and would be honored 
                to have you celebrate this special day with us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details Section */}
      <section id="details" className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <p className="font-body text-sm tracking-[0.3em] uppercase text-wine mb-4">
                Join Us
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-foreground">
                Event Details
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Ceremony */}
              <div className="bg-cream p-8 md:p-12 text-center shadow-soft">
                <h3 className="font-display text-2xl text-foreground mb-6">The Ceremony</h3>
                <div className="space-y-4 text-muted-foreground">
                  <div className="flex items-center justify-center gap-3">
                    <Calendar className="w-5 h-5 text-wine" />
                    <span className="font-body">Sunday, June 15, 2025</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <Clock className="w-5 h-5 text-wine" />
                    <span className="font-body">4:00 PM</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <MapPin className="w-5 h-5 text-wine" />
                    <span className="font-body">Rose Garden Chapel</span>
                  </div>
                  <p className="font-body text-sm pt-4">
                    123 Garden Lane<br />
                    Napa Valley, California 94558
                  </p>
                </div>
              </div>

              {/* Reception */}
              <div className="bg-cream p-8 md:p-12 text-center shadow-soft">
                <h3 className="font-display text-2xl text-foreground mb-6">The Reception</h3>
                <div className="space-y-4 text-muted-foreground">
                  <div className="flex items-center justify-center gap-3">
                    <Calendar className="w-5 h-5 text-gold" />
                    <span className="font-body">Sunday, June 15, 2025</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <Clock className="w-5 h-5 text-gold" />
                    <span className="font-body">6:00 PM - 11:00 PM</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <MapPin className="w-5 h-5 text-gold" />
                    <span className="font-body">Vineyard Estate</span>
                  </div>
                  <p className="font-body text-sm pt-4">
                    456 Winery Road<br />
                    Napa Valley, California 94558
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="font-body text-muted-foreground mb-4">
                Dress Code: <span className="text-foreground">Cocktail Attire</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="py-24 md:py-32 bg-wine-light">
        <div className="container mx-auto px-6">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-12">
              <p className="font-body text-sm tracking-[0.3em] uppercase text-wine mb-4">
                Will You Join Us?
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
                RSVP
              </h2>
              <p className="text-muted-foreground font-body">
                Kindly respond by June 30, 2026
              </p>
            </div>

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
      </section>

      {/* Gift Section */}
      <section id="gift" className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <Gift className="w-12 h-12 text-gold mx-auto mb-6" />
            <p className="font-body text-sm tracking-[0.3em] uppercase text-wine mb-4">
              Your Presence Is Our Present
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-8">
              Gift Registry
            </h2>
            <p className="text-muted-foreground font-body text-lg leading-relaxed mb-12">
              Your presence at our wedding is the greatest gift of all. However, 
              if you wish to honor us with a gift, a contribution to our honeymoon 
              fund would be greatly appreciated.
            </p>

            <a
              href="https://www.paypal.com/your-paypal-link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button variant="gold" size="xl">
                <Mail className="w-5 h-5 mr-2" />
                Send Gift via PayPal
              </Button>
            </a>

            <p className="text-muted-foreground font-body text-sm mt-8">
              Click above to contribute to our honeymoon fund
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-cream border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Amelia & Michael
          </h2>
          <p className="font-display text-xl text-gold italic mb-8">
            June 15, 2025
          </p>
          <Heart className="w-6 h-6 text-wine mx-auto" />
          <p className="text-muted-foreground font-body text-sm mt-8">
            We can't wait to celebrate with you
          </p>
        </div>
      </footer>
    </div>
  );
};

export default WeddingHome;
