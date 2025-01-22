interface BaseModel {
  readonly id: number;
}

interface Role {
  title: string;
  description: string;
}

interface Job extends BaseModel {
  image: string;
  company: {
    name: string;
    shortName: string;
  };
  description: string;
  location: string;
  role: Role;
  skills: string[];
  links: TimelineLink[];
  startedAt: string;
  endedAt?: string;
}

interface Education extends BaseModel {
  name: string;
  description: string;
  image: string;
  location: string;
  links: readonly TimelineLink[];
  startedAt: string;
  endedAt?: string;
}

interface Language extends BaseModel {
  name: string;
  description: string;
  experience: string;
}

interface Project extends BaseModel {
  url: string;
  name: string;
  description: string;
  external: boolean;
}

interface Post extends BaseModel {
  slug: string;
  title: string;
  summary: string;
  cover: string;
  content: string;
  date: Date;
  tags: string[];
}

type SudokuBoard = number[][];

interface Email {
  id: string;
  subject: string;
  from: string;
  body: string;
  attachments: string[];
  date: string;
}

interface TimelineItem {
  id: string;
  name: string;
  description: string;
  image: string;
  location: string;
  role: Role;
  links: readonly TimelineLink[];
  startDate: string;
  endDate?: string;
}

interface TimelineLink {
  type: 'website' | 'github' | 'gitlab' | 'twitter';
  title: string;
  href: string;
}
