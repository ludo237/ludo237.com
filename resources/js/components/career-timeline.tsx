import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { addItemsToTimeline, mapTimelineIcon } from '@/lib/utils';
import type { TimelineItem, TimelineLink } from '@/types';
import { JobExperience, School } from '@/types/model';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { Briefcase, GraduationCap } from 'lucide-react';
import type { FC } from 'react';

const getTimelineItemIcon = (type: TimelineItem['type']) => {
    switch (type) {
        case 'job':
            return Briefcase;
        case 'school':
            return GraduationCap;
        default:
            return Briefcase;
    }
};

const getTimelineItemBadge = (type: TimelineItem['type']) => {
    switch (type) {
        case 'job':
            return { text: 'Work', variant: 'default' as const };
        case 'school':
            return { text: 'Education', variant: 'secondary' as const };
        default:
            return { text: 'Experience', variant: 'default' as const };
    }
};

const TimelineLink: FC<{ link: TimelineLink }> = ({ link }) => {
    const Icon = mapTimelineIcon(link.type);

    return (
        <a href={link.href} key={link.title} target="_blank" rel="noreferrer">
            <Badge variant="outline" title={link.title} className="flex items-center space-x-1.5">
                <Icon className="size-3" />
                <span>{link.title}</span>
            </Badge>
        </a>
    );
};

const TimelineItem: FC<{ item: TimelineItem }> = ({ item }) => {
    const TypeIcon = getTimelineItemIcon(item.type);
    const badge = getTimelineItemBadge(item.type);

    return (
        <li className="relative ml-10 py-3">
            <div className="absolute top-3 -left-16 flex items-center justify-center rounded-full bg-foreground">
                <Avatar className="m-auto size-12 border-2 border-primary">
                    <AvatarImage src={item.image} alt={item.name} />
                    <AvatarFallback>
                        <TypeIcon className="size-6" />
                    </AvatarFallback>
                </Avatar>
            </div>
            <div className="flex flex-col space-y-1.5">
                <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg leading-none font-semibold text-primary">{item.name}</h2>
                        <Badge variant={badge.variant} className="text-xs">
                            {badge.text}
                        </Badge>
                    </div>
                    <time className="text-xs text-muted-foreground">
                        {format(new Date(item.startDate), 'MMMM yyyy')} - {item.endDate ? format(new Date(item.endDate), 'MMMM yyyy') : 'present'}
                    </time>
                    <p className="text-xs text-muted-foreground">{item.location}</p>
                </div>
                {item.role && <span className="text-sm text-secondary">{item.role.title}</span>}

                <p className="leading-snug tracking-wide text-muted-foreground">{item.role ? item.role.description : item.description}</p>
            </div>
            {item.links && item.links.length > 0 && (
                <div className="flex flex-row flex-wrap gap-1.5 py-3">
                    {item.links?.map((link) => (
                        <TimelineLink key={link.title} link={link} />
                    ))}
                </div>
            )}
        </li>
    );
};

export default function CareerTimeline({ jobs, schools }: { jobs: JobExperience[]; schools: School[] }) {
    const timelineItems = addItemsToTimeline(jobs, schools);

    return (
        <section id="career">
            <Card>
                <CardHeader>
                    <CardTitle className="text-primary">My Career</CardTitle>
                    <CardDescription className="text-muted-foreground">
                        A chronological timeline of my professional career and educational background.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="mb-4 ml-4 divide-y divide-dashed border-l py-3">
                        {timelineItems.map((item) => (
                            <TimelineItem key={item.id} item={item} />
                        ))}
                    </ul>
                </CardContent>
                <CardFooter>
                    <span className="mr-0.5">Want a more comprehensive view?</span>
                    <Link href="/cv" className="font-semibold text-primary hover:underline">
                        View my full CV
                    </Link>
                </CardFooter>
            </Card>
        </section>
    );
}
