export const taxonomy = {
  News: [
    "Nasional",
    "Internasional",
    "Ekonomi",
  ],

  Lifestyle: [
    "Kesehatan",
    "Parasayu",
    "Travel",
    "Fashion",
    "Kuliner",
  ],

  Entertainment: [
    "Film",
    "Musik",
    "Hot Issue",
    "Pop Art",
  ],

  Technology: [
    "Gadgets",
    "Apps",
    "AI",
  ],

  Sports: [],

  Explore: [
    "Horoscope",
    "Intimacy",
    "Relationship",
    "Horror",
  ],
} as const;

export type Category = keyof typeof taxonomy;