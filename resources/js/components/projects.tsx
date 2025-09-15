import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Project, Url } from '@/types/model';
import { Link } from '@inertiajs/react';
import { ExternalLink } from 'lucide-react';

const ProjectUrl = ({ url }: { url: Url }) => {
    return (
        <>
            {url.type === 'website' && (
                <a href={url.href} target="_blank" rel="noreferrer" className="flex items-center space-x-1.5 hover:underline">
                    <ExternalLink className="size-3" />
                    <h2 className="leading-none font-semibold">{url.name}</h2>
                </a>
            )}

            {url.type === 'internal' && (
                <Link href={url.href} className="flex items-center space-x-1.5 hover:underline">
                    <h2 className="leading-none font-semibold">{url.name}</h2>
                </Link>
            )}
        </>
    );
};

const ProjectUrls = ({ urls }: { urls: Url[] }) => {
    return (
        <div className="grow space-y-0.5">
            {urls.map((url) => (
                <ProjectUrl url={url} key={url.id} />
            ))}
        </div>
    );
};
export default function ProjectsGrid({ projects }: { projects: Project[] }) {
    return (
        <section id="projects">
            <Card>
                <CardHeader>
                    <CardTitle className="text-primary">My Projects</CardTitle>
                    <CardDescription className="text-muted-foreground">
                        I have worked on a variety of projects, from simple websites to complex web applications. Here are a few of my favorites.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible>
                        {projects.map((p) => (
                            <AccordionItem value={p.id} key={p.id}>
                                <AccordionTrigger className="font-bold">{p.name}</AccordionTrigger>
                                <AccordionContent>
                                    <div className="pb-3 leading-snug tracking-wider">{p.description}</div>
                                    <ProjectUrls urls={p.urls} />
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </section>
    );
}

export { ProjectsGrid };
