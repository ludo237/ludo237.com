import { Post, User } from '@/types/model';
import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface ErrorCode {
    [key: string]: unknown; // This allows for additional properties...
}
export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedProps {
    name: string;
    auth: Auth;
    ziggy: Config & { location: string };
    firstPost: Post;
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
    role: Role;
    links: readonly TimelineLink[];
    startDate: string;
    endDate: string | null;
}

export interface TimelineLink {
    type: 'website' | 'github' | 'gitlab' | 'twitter';
    title: string;
    href: string;
}
