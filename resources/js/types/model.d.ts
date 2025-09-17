interface Model {
    id: string;
    createdAt: string;
    updatedAt: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface User extends Model {
    name: string;
    email: string;
    avatar?: string;
    emailVerifiedAt: string | null;
}

export interface Url extends Model {
    name: string;
    href: string;
    type: 'website' | 'internal';
}

export interface JobExperience extends Model {
    avatar: string;
    company: string;
    companyDescription: string;
    location: string;
    role: string;
    roleDescription: string;
    skills: string[];
    startedAt: string;
    endedAt: string | null;
    urls?: Url[];
}

export interface School extends Model {
    name: string;
    avatar: string;
    description: string;
    location: string;
    startedAt: string;
    endedAt: string;
    urls: Url[];
}

export interface Project extends Model {
    name: string;
    description: string;
    urls?: Url[];
}

export interface Post extends Model {
    title: string;
    slug: string;
    cover: string;
    excerpt: string;
    content: string;
    publishedAt: string | null;
}

export interface Language extends Model {
    name: string;
    experience: 'beginner' | 'intermediate' | 'fluent' | 'native';
}
