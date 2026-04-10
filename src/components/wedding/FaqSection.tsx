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
      "Semi-formal attire. No white, please. We’ll add more detail here before the wedding.",
  },
  {
    value: "plus-ones",
    title: "Can I bring a plus one?",
    answer:
      "Your invitation will name everyone in your party. If you have a question about guests, reach out to us anytime.",
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
      className="py-16 md:py-24 border-b border-wine/15"
    >
      <div className="container mx-auto w-full px-6 md:px-10 lg:px-14">
        <div className="mb-8 md:mb-10 text-center">
          <h2 className="font-wedding-section-heading text-3xl md:text-5xl tracking-brand text-wedding-heading mb-3">
            FAQ
          </h2>
        </div>

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
              <AccordionContent className="font-wedding-content text-wedding-body text-base leading-relaxed tracking-brand pr-8 md:pr-10">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
