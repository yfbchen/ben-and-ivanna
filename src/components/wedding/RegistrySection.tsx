import {
  weddingBodyCopyClassName,
  weddingSectionClassName,
  weddingSectionContainerClassName,
  weddingSectionTitleMarginClassName,
} from "@/config/weddingSectionLayout";

export function RegistrySection() {
  const paypalUrl = "https://paypal.me/your-profile";
  const venmoUrl = "https://venmo.com/your-profile";

  return (
    <section
      id="gift"
      className={`${weddingSectionClassName} flex items-center justify-center`}
    >
      <div className={weddingSectionContainerClassName}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-wedding-body max-w-2xl mx-auto">
            <h2
              className={`font-wedding-section-heading text-3xl md:text-5xl tracking-brand text-wedding-heading ${weddingSectionTitleMarginClassName}`}
            >
              Registry
            </h2>
            <p className={weddingBodyCopyClassName}>
              Your presence at our wedding means everything to us. If you&apos;d
              like to help us celebrate, we&apos;d be so grateful for a
              contribution to our honeymoon and the adventures ahead. A card box
              will be available at the wedding as well.
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
