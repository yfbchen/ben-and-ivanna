import { images } from "@/config/images";

export type Guest = {
  id: string;
  party_id: string;
  firstname: string;
  lastname: string;
  email: string | null;
  phone: string | null;
  attending: string | null;
  dietary_restrictions: string | null;
  message: string | null;
  updated_at: string;
};

export type PartyResponse = {
  attending: string;
  email: string;
  phone: string;
  dietaryRestrictions: string;
  message: string;
};

export const ourStoryEvents = [
  {
    date: "2010",
    text: "\"I like your t-shirt\" - Ben's first compliment to Ivanna. That began our friendship.",
    image: images.heroHorizontal,
    alt: "When we met",
    imageAbove: true,
  },
  {
    date: "2013",
    text: "Ben asked Ivanna to be his prom date...and swept her off her feet!",
    image: images.heroVertical,
    alt: "Asked to prom",
    imageAbove: false,
  },
  {
    date: "2014",
    text: "Our \"first dance\" together, as Waldo finds his Walda. Still only best friends :)",
    image: images.heroHorizontal,
    alt: "Waldo and Walda",
    imageAbove: true,
  },
  {
    date: "10.11.2014",
    text: "We started dating <3! Ben asked Ivanna out after taking her out on a very very long stroll at night.",
    image: images.heroVertical,
    alt: "dating",
    imageAbove: false,
  },
  {
    date: "2023",
    text: "We move in together at NYC and start the next chapter of our lives!",
    image: images.heroVertical,
    alt: "move in",
    imageAbove: true,
  },
  {
    date: "04.03.2025",
    text: "WE'RE ENGAGED!",
    image: images.heroHorizontal,
    alt: "Engagement",
    imageAbove: false,
  },
];
