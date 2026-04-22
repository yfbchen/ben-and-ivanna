import {
  weddingBodyCopyClassName,
  weddingSectionClassName,
  weddingSectionContainerClassName,
  weddingSectionTitleMarginClassName,
} from "@/config/weddingSectionLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    value: "general-information",
    title: "General Information",
    answer:
      "Our wedding day is at Gufo, an Italian restaurant at 660 Cambridge St., Cambridge, MA. You can start showing up at 5:00 PM. The ceremony begins at 5:30 PM, with cocktail hour at 6:00 PM. Reception will start around 7:00 PM. Please plan to be out by 11:30 PM.",
  },
  {
    value: "dress-code",
    title: "What is the dress code?",
    answer:
      "Formal attire with a tropical garden flair. Ladies, feel free to wear vibrant colors—just avoid white and green to not clash with bride and bridal party. Gentlemen, please avoid brown to complement the groom’s suit.",
  },
  {
    value: "plus-ones",
    title: "Can I bring a plus one?",
    answer:
      "Due to our intimate restaurant-style wedding and limited space, we are only able to invite the guests named on the invitation. We truly appreciate your understanding.",
  },
  {
    value: "parking",
    title: "How do I find parking?",
    answer:
      "Gufo does not have designated parking. Street parking on the main road nearby is metered; depending on the block, it becomes free after 6 PM or 8 PM. Metered spots directly outside the restaurant are free after 6 PM.\n\nThe closest large garage option is One Kendall Square Garage, about a 10-minute walk (up to $50 for a full day). A smaller, more affordable lot is at 490 Columbia Street Parking Lot, about an 11-minute walk—availability is very limited and must be booked online.\n\nYou may find lower rates for both by reserving in advance through apps like SpotHero.",
  },
] as const;

export function FaqSection() {
  return (
    <section
      id="faq"
      className={`${weddingSectionClassName} border-b border-wine/15`}
    >
      <div className={weddingSectionContainerClassName}>
        <div className="mx-auto w-full max-w-none px-0 md:max-w-5xl md:px-2.5">
          <h2
            className={`font-wedding-section-heading text-3xl md:text-5xl tracking-brand text-wedding-heading text-center ${weddingSectionTitleMarginClassName}`}
          >
            FAQ
          </h2>

          <Accordion
            type="single"
            collapsible
            className="w-full border-t border-b border-wine/20"
          >
            {faqItems.map((item) => (
              <AccordionItem
                key={item.value}
                value={item.value}
                className="border-wine/15 last:border-b-0"
              >
                <AccordionTrigger className="font-wedding-nav-link font-semibold text-left text-base md:text-lg leading-none tracking-brand text-wedding-body hover:no-underline hover:text-wedding-heading py-5 md:py-6 pr-2 [&[data-state=open]]:text-wedding-heading">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent
                  className={`${weddingBodyCopyClassName} whitespace-pre-line pr-8 md:pr-10`}
                >
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
