import { images } from "@/config/images";

export function HisProposalSection() {
  return (
    <section
      id="his-proposal"
      className="w-full flex items-center justify-center py-16 md:py-24"
    >
      <div className="container mx-auto px-6 md:px-10 lg:px-14">
        <div className="max-w-5xl mx-auto grid gap-12 md:gap-16 md:grid-cols-2 items-center justify-items-center">
          <div className="order-2 md:order-1 max-w-xl w-full text-center md:text-left">
            <h2 className="font-wedding-section-heading text-3xl md:text-3xl tracking-brand uppercase text-wedding-heading mb-6">
              His Proposal
            </h2>
            <div className="space-y-4 font-wedding-content text-base md:text-lg tracking-brand text-wedding-body leading-relaxed">
              <p>
                Ben planned a trip to Tokyo with Ivanna during cherry blossom
                season, just like many of the other adventures they'd taken
                together. To her, it was simply another trip. What she didn't
                know was that Ben had been quietly planning a surprise the
                entire time.
              </p>
              <p>
                With the help of a few close friends, he secretly filmed a video
                of himself playing guitar and singing Nothing by Bruno Major. He
                booked a private theater, filled it with candles and flowers,
                and told Ivanna they were going to watch a movie.
              </p>
              <p>
                But the moment she walked into the theater, she had a feeling
                something was going on. As the video played, there were tears, a
                lot of laughter, and plenty of emotions. When it ended, Ben got
                down on one knee and asked Ivanna to marry him. She said....
                YES! 🌸💍
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2 w-full flex justify-center">
            <img
              src={images.heroHorizontal}
              alt="Proposal placeholder"
              className="aspect-[4/5] w-full max-w-sm object-cover rounded-xl border border-gold/40"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
