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
    value: "dress-code",
    title: "What is the dress code?",
    answer:
      "Formal attire with a tropical garden flair. Ladies, feel free to wear vibrant colors—just avoid white and green to not clash with bride and bridal party shine. Gentlemen, please avoid brown to complement the groom’s suit.",
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
      "We’ll share parking, shuttles, and nearby options closer to the date. Check back here for updates.",
  },
] as const;

export function FaqSection() {
  return (
    <section
      id="faq"
      className={`${weddingSectionClassName} border-b border-wine/15`}
    >
      <div className={weddingSectionContainerClassName}>
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
              <AccordionTrigger className="font-wedding-content text-left text-base md:text-lg tracking-brand text-wedding-body hover:no-underline hover:text-wedding-heading py-5 md:py-6 pr-2 [&[data-state=open]]:text-wedding-heading">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className={`${weddingBodyCopyClassName} pr-8 md:pr-10`}>
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
