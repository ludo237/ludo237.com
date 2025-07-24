import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { addItemsToTimeline, mapTimelineIcon } from '@/lib/utils';
import type { TimelineItem, TimelineLink } from '@/types';
import { JobExperience, School } from '@/types/model';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import type { FC } from 'react';

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
    return (
        <li className="relative ml-10 py-3">
            <div className="absolute top-3 -left-16 flex items-center justify-center rounded-full bg-white">
                <Avatar className="m-auto size-12 border">
                    <AvatarImage src={item.image} alt={item.name} />
                    <AvatarFallback>
                        {item.name[0]}
                        {item.name[1]}
                    </AvatarFallback>
                </Avatar>
            </div>
            <div className="flex flex-1 flex-col justify-start gap-1.5">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg leading-none font-semibold text-sky-500 dark:text-sky-600">{item.name}</h2>
                    <time className="text-xs text-slate-500 dark:text-slate-400">
                        {format(item.startDate, 'MMMM yyyy')} - {item.endDate ? format(item.endDate, 'MMMM yyyy') : 'present'}
                    </time>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{item.location}</p>
                {item.role && <span className="text-sm text-sky-700 dark:text-sky-300">{item.role.title}</span>}

                <span className="prose text-sm text-slate-700 dark:text-slate-300 dark:prose-invert">
                    {item.role ? item.role.description : item.description}
                </span>
            </div>
            {item.links && item.links.length > 0 && (
                <div className="flex flex-row flex-wrap items-start gap-3 py-1.5">
                    {item.links?.map((link) => (
                        <TimelineLink key={link.title} link={link} />
                    ))}
                </div>
            )}
        </li>
    );
};

export default function CareerTimeline({ jobs, schools }: { jobs: JobExperience[]; schools: School[] }) {
    const timelineItems = addItemsToTimeline([...jobs, ...schools]);

    return (
        <section id="career">
            <Card>
                <CardHeader>
                    <CardTitle>My Career</CardTitle>
                    <CardDescription>Have a look at my career timeline, you will find educations and jobs I have done.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="mb-4 ml-4 divide-y divide-dashed border-l py-3">
                        {timelineItems.map((item) => (
                            <TimelineItem key={item.id} item={item} />
                        ))}
                    </ul>
                </CardContent>
                <CardFooter>
                    <span className="mr-0.5 dark:text-slate-400">Do you need a more comprehensive look?</span>
                    <Link href="/cv" className="font-semibold text-sky-500 dark:text-sky-600">
                        Get my CV
                    </Link>
                </CardFooter>
            </Card>
        </section>
    );
}
