export type Author = {
  id: string;
  name: string;
  slug: string;
  position: string;
  avatar: string;
  bio: string;
  status: "active" | "inactive";
};

export const authors: Author[] = [
  {
    id: "1",
    name: "William Ciputra",
    slug: "william-ciputra",
    position: "Founder & Editor in Chief",
    avatar: "",
    bio: "",
    status: "active",
  },

  {
    id: "2",
    name: "Sinta Apriliana",
    slug: "sinta-apriliana",
    position: "Managing Editor",
    avatar: "",
    bio: "",
    status: "active",
  },
];