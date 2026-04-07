export function RegistrySection() {
  const paypalUrl = "https://paypal.me/your-profile";
  const venmoUrl = "https://venmo.com/your-profile";

  return (
    <section
      id="gift"
      className="min-h-[650px] bg-forest flex items-center justify-center py-12 md:py-16"
    >
      <div className="container mx-auto px-8 md:px-12 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-ivory max-w-2xl mx-auto">
            <p className="font-body text-xs md:text-sm tracking-[0.3em] uppercase text-gold mb-6">
              Registry
            </p>
            <h2 className="font-display text-3xl md:text-5xl mb-6">
              Gift Registry
            </h2>
            <p className="font-body text-base md:text-lg text-ivory/90 leading-relaxed">
              Your presence at our wedding is the greatest gift. If you would
              like to celebrate with us further, we would be so grateful for a
              contribution to our honeymoon fund and future adventures
              together.
            </p>
          </div>

          <div className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <a
              href={paypalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 min-w-[230px] items-center justify-center rounded-full bg-[#FFC439] px-7 text-[17px] font-semibold text-[#003087] shadow-md transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC439] focus-visible:ring-offset-2 focus-visible:ring-offset-forest"
            >
              <span className="font-bold tracking-tight">PayPal</span>
            </a>

            <a
              href={venmoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 min-w-[230px] items-center justify-center rounded-full bg-[#008CFF] px-7 text-[17px] font-semibold text-white shadow-md transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008CFF] focus-visible:ring-offset-2 focus-visible:ring-offset-forest"
            >
              <span className="font-bold tracking-tight">Venmo</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
