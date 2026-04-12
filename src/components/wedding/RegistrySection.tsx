import {
  weddingBodyCopyClassName,
  weddingNavLinkButtonTypographyClassName,
  weddingSectionClassName,
  weddingSectionContainerClassName,
  weddingSectionTitleMarginClassName,
} from "@/config/weddingSectionLayout";

export function RegistrySection() {
  const paypalUrl = "https://paypal.me/yfbchen";
  const venmoUrl = "https://account.venmo.com/u/benjamms";

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
              className={`inline-flex h-12 min-w-[230px] items-center justify-center rounded-full border-2 border-[var(--theme-accent)] bg-transparent px-7 ${weddingNavLinkButtonTypographyClassName} text-wedding-heading shadow-soft transition duration-200 hover:scale-[1.02] hover:bg-[var(--theme-accent)] hover:text-[var(--wedding-palette-white-background)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-wedding-main-surface`}
            >
              PayPal
            </a>

            <a
              href={venmoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex h-12 min-w-[230px] items-center justify-center rounded-full border-2 border-[var(--theme-accent)] bg-transparent px-7 ${weddingNavLinkButtonTypographyClassName} text-wedding-heading shadow-soft transition duration-200 hover:scale-[1.02] hover:bg-[var(--theme-accent)] hover:text-[var(--wedding-palette-white-background)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-wedding-main-surface`}
            >
              Venmo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
