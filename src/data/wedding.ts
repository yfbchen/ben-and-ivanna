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
    date: "2004",
    text: "We first met at age 8 at our parents' mutual friend's wedding.",
    image: images.timelineKiddos,
    alt: "When we first met",
    imageAbove: true,
  },
  {
    date: "2010",
    text: "In 8th grade, Ben officially said hello by complimenting Ivanna's t-shirt in math class.",
    image: images.timelineEighthGrade,
    alt: "Eighth grade math class",
    imageAbove: false,
  },
  {
    date: "2010–2014",
    text: "Our friendship grew throughout high school. From late-night study sessions, prom dates, and even performing together as senior year dance partners.",
    image: images.timelineProm,
    alt: "High school years",
    imageAbove: true,
  },
  {
    date: "10.11.14",
    text: 'In college, Ben finally asked Ivanna out. Ivanna said, "sure."',
    image: images.timelineDating,
    alt: "Started dating",
    imageAbove: false,
  },
  {
    date: "2023",
    text: "We moved to New York to start our next chapter together.",
    image: images.timelineNyc,
    alt: "New York",
    imageAbove: true,
  },
  {
    date: "4.3.25",
    text: "We got engaged 💍",
    image: images.timelineEngagement,
    alt: "Engagement",
    imageAbove: false,
  },
];
