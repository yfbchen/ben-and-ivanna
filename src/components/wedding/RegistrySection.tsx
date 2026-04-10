export function RegistrySection() {
  const paypalUrl = "https://paypal.me/your-profile";
  const venmoUrl = "https://venmo.com/your-profile";

  return (
    <section
      id="gift"
      className="w-full flex items-center justify-center py-16 md:py-24"
    >
      <div className="container mx-auto px-6 md:px-10 lg:px-14">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-wedding-body max-w-2xl mx-auto">
            <h2 className="font-wedding-section-heading text-3xl md:text-5xl tracking-brand mb-6 text-wedding-heading">
              Registry
            </h2>
            <p className="font-wedding-content text-base md:text-lg tracking-brand text-wedding-body leading-relaxed">
              Your presence at our wedding is the greatest gift we could ask for.
              If you&apos;d like to give us a gift, we&apos;ve set up a few
              registries at the stores below. Thank you so much for your love
              and support!
            </p>
          </div>

          <div className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <a
              href={paypalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 min-w-[230px] items-center justify-center rounded-full bg-[#FFC439] px-7 font-wedding-button text-[17px] font-semibold text-[#003087] shadow-md transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC439] focus-visible:ring-offset-2 focus-visible:ring-offset-wedding-main-surface"
            >
              <span className="font-bold tracking-brand">PayPal</span>
            </a>

            <a
              href={venmoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 min-w-[230px] items-center justify-center rounded-full bg-[#008CFF] px-7 font-wedding-button text-[17px] font-semibold text-white shadow-md transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008CFF] focus-visible:ring-offset-2 focus-visible:ring-offset-wedding-main-surface"
            >
              <span className="font-bold tracking-brand">Venmo</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
