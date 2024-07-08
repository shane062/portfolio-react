// types.ts
export interface Project {
    title: string;
    description: string;
    card_bg: string;
    avatar: string;
    avatar_fb: string;
    tech_badge: string[];
    images: string[];
    about: string;
    website: string;
    available: boolean
  }

export interface Experience {
  time: string,
  company: string,
  title: string,
  content: string,
  image: string,
  tech_badge: string[],
}
  