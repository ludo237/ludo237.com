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

export const addItemsToTimeline = (jobs: JobExperience[] = [], schools: School[] = []): TimelineItem[] => {
    const timeline: TimelineItem[] = [];

    for (const job of jobs) {
        timeline.push({
            id: job.id,
            name: job.company,
            description: job.companyDescription,
            image: job.avatar,
            location: job.location,
            role: {
                title: job.role,
                description: job.roleDescription,
            },
            links:
                job.urls?.map((u) => ({
                    type: u.type as TimelineLink['type'],
                    title: u.name,
                    href: u.href,
                })) || [],
            startDate: job.startedAt,
            endDate: job.endedAt,
            type: 'job',
        });
    }

    for (const school of schools) {
        timeline.push({
            id: school.id,
            name: school.name,
            description: school.description,
            image: school.avatar,
            location: school.location,
            links:
                school.urls?.map((u) => ({
                    type: u.type as TimelineLink['type'],
                    title: u.name,
                    href: u.href,
                })) || [],
            startDate: school.startedAt,
            endDate: school.endedAt,
            type: 'school',
        });
    }

    // Smart chronological sorting
    return timeline.sort((a, b) => {
        const aStartDate = new Date(a.startDate).getTime();
        const aEndDate = a.endDate ? new Date(a.endDate).getTime() : null;
        const bStartDate = new Date(b.startDate).getTime();
        const bEndDate = b.endDate ? new Date(b.endDate).getTime() : null;
        const now = new Date().getTime();
        const twoYearsAgo = now - 2 * 365 * 24 * 60 * 60 * 1000;

        // Priority 1: Current/ongoing items (no end date)
        if (!aEndDate && bEndDate) return -1;
        if (aEndDate && !bEndDate) return 1;
        if (!aEndDate && !bEndDate) {
            // Both ongoing, sort by start date (newest first)
            return bStartDate - aStartDate;
        }

        // Priority 2: Recently ended items (within 2 years)
        const aRecentlyEnded = aEndDate && aEndDate > twoYearsAgo;
        const bRecentlyEnded = bEndDate && bEndDate > twoYearsAgo;

        if (aRecentlyEnded && !bRecentlyEnded) return -1;
        if (!aRecentlyEnded && bRecentlyEnded) return 1;
        if (aRecentlyEnded && bRecentlyEnded) {
            // Both recently ended, sort by end date (newest first)
            return bEndDate! - aEndDate!;
        }

        // Priority 3: Historical items, sort by start date (newest first)
        return bStartDate - aStartDate;
    });
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
