import { Post, User } from '@/types/model';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface SharedPageProps {
    csrf_token: string;
    auth: Auth;
    ziggy: Config & { location: string };
    firstPost: Post;
    meta: {
        title: string;
        description: string;
        og: {
            title: string;
            description: string;
            type: string;
            url: string;
            image: string;
        };
        twitter: {
            card: string;
            title: string;
            description: string;
            image: string;
            alt: string;
        };
    };
    [key: string]: unknown;
}

export interface Role {
    title: string;
    description: string;
}

export interface TimelineItem {
    id: string;
    name: string;
    description: string;
    image: string;
    location: string;
    role?: Role;
    links: readonly TimelineLink[];
    startDate: string;
    endDate: string | null;
    type: 'job' | 'school';
}

export interface TimelineLink {
    type: 'website' | 'github' | 'gitlab' | 'twitter';
    title: string;
    href: string;
}

export interface EloquentResource<T> extends Response {
    data: T;
    meta: MetaResource;
}

export interface MetaLinkResource {
    url: string | null;
    label: string;
    active: boolean;
}

export interface MetaResource {
    current_page: number;
    from: number | null;
    last_page: number;
    links: MetaLinkResource[];
    path: string;
    per_page: number;
    to: number | null;
    total: number;
}
