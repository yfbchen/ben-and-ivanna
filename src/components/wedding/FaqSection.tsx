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
      "We’re still finalizing attire details—this is placeholder copy you can replace with cocktail, formal, or theme notes plus examples of what to wear.",
  },
  {
    value: "what-to-expect",
    title: "What should I expect?",
    answer:
      "Placeholder: share ceremony length, indoor/outdoor plan, reception flow, and anything guests should know about timing or weather backup.",
  },
  {
    value: "parking",
    title: "Where can I park?",
    answer:
      "Placeholder: add venue lot info, valet, nearby garages, shuttle pickup points, or a link to a map. We’ll update this before invitations go out.",
  },
  {
    value: "plus-ones",
    title: "Can I bring a plus-one?",
    answer:
      "Placeholder: spell out how plus-ones are named on the invite, any age or capacity limits, and who to contact if a guest needs a clarification.",
  },
] as const;

export function FaqSection() {
  return (
    <section
      id="faq"
      className="py-16 md:py-24 border-y border-wine/15"
    >
      <div className="container mx-auto w-full px-6 md:px-10 lg:px-14">
        <div className="mb-8 md:mb-10 text-center md:text-left">
          <p className="font-wedding-section-heading text-xs md:text-sm tracking-brand uppercase text-wedding-heading mb-4">
            For guests
          </p>
          <h2 className="font-wedding-section-heading text-3xl md:text-5xl tracking-brand text-wedding-heading mb-3">
            Frequently asked questions
          </h2>
          <p className="font-body text-base md:text-lg tracking-brand text-wedding-body max-w-2xl mx-auto md:mx-0">
            Quick answers to common questions—swap in your real details anytime.
          </p>
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
