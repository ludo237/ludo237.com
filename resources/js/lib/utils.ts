import { TimelineItem, TimelineLink } from '@/types';
import { JobExperience, School } from '@/types/model';
import { type ClassValue, clsx } from 'clsx';
import DOMPurify from 'dompurify';
import { Github, Gitlab, Globe, LinkIcon, LucideProps, Twitter } from 'lucide-react';
import { marked } from 'marked';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

// Configure marked for better security and features
marked.setOptions({
    breaks: true, // Convert line breaks to <br>
    gfm: true, // GitHub Flavored Markdown
});

export const parseMarkdown = (markdown: string): string => {
    try {
        // Handle empty or invalid input
        if (!markdown) {
            return '<p>No content available.</p>';
        }

        // Parse markdown to HTML
        const rawHtml = marked.parse(markdown) as string;

        // Sanitize the HTML to prevent XSS attacks
        return DOMPurify.sanitize(rawHtml, {
            ALLOWED_TAGS: [
                'h1',
                'h2',
                'h3',
                'h4',
                'h5',
                'h6',
                'p',
                'br',
                'strong',
                'em',
                'u',
                's',
                'del',
                'ins',
                'ul',
                'ol',
                'li',
                'blockquote',
                'pre',
                'code',
                'a',
                'img',
                'table',
                'thead',
                'tbody',
                'tr',
                'th',
                'td',
                'hr',
            ],
            ALLOWED_ATTR: ['href', 'title', 'target', 'rel', 'src', 'alt', 'width', 'height', 'class'],
            ALLOW_DATA_ATTR: false,
        });
    } catch (error) {
        console.error('Error parsing markdown:', error);
        // Return escaped content as fallback
        return `<p>${markdown.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>`;
    }
};

export const readingTime = (content: string): number => {
    //Matches words See https://regex101.com/r/q2Kqjg/6
    const words = content.match(/\w+/g)?.length || 0;
    return Math.ceil(words / 237);
};

export const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const addItemsToTimeline = (items: (JobExperience | School)[]): TimelineItem[] => {
    const timeline: TimelineItem[] = [];
    for (const item of items) {
        const defaultObject: Partial<TimelineItem> = {
            id: item.id,
            image: item.avatar,
            location: item.location,
            links: item.urls.map((u) => {
                return {
                    type: u.type,
                    title: u.name,
                    href: u.href,
                } as TimelineLink;
            }),
            startDate: item.started_at,
            endDate: item.ended_at,
        };

        if (Object.hasOwn(item, 'company')) {
            const jItem = item as JobExperience;
            defaultObject.name = jItem.company;
            defaultObject.role = {
                title: jItem.role,
                description: jItem.role_description,
            };
            defaultObject.description = jItem.company_description;
        } else {
            const sItem = item as School;
            defaultObject.name = sItem.name;
            defaultObject.description = sItem.description;
        }

        timeline.push(defaultObject as TimelineItem);
    }

    return timeline;
};

export const mapTimelineIcon = (
    type: 'website' | 'github' | 'gitlab' | 'twitter',
): ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>> => {
    if (type === 'website') {
        return Globe;
    }

    if (type === 'github') {
        return Github;
    }

    if (type === 'gitlab') {
        return Gitlab;
    }

    if (type === 'twitter') {
        return Twitter;
    }

    return LinkIcon;
};
