interface Model {
    id: string;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface User extends Model {
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
}

export interface Url extends Model {
    name: string;
    href: string;
    type: 'website' | 'internal';
}

export interface JobExperience extends Model {
    avatar: string;
    company: string;
    company_description: string;
    location: string;
    role: string;
    role_description: string;
    skills: string[];
    started_at: string;
    ended_at: string | null;
    urls: Url[];
}

export interface School extends Model {
    name: string;
    avatar: string;
    description: string;
    location: string;
    started_at: string;
    ended_at: string;
    urls: Url[];
}

export interface Project extends Model {
    name: string;
    description: string;
    urls: Url[];
}

export interface Post extends Model {
    title: string;
    slug: string;
    cover: string;
    excerpt: string;
    content: string;
}

export interface Language extends Model {
    name: string;
    experience: 'beginner' | 'intermediate' | 'fluent' | 'native';
}
