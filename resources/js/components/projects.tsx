import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Project, Url } from '@/types/model';
import { Link } from '@inertiajs/react';
import { ExternalLink } from 'lucide-react';

const ProjectUrl = ({ url }: { url: Url }) => {
    return (
        <>
            {url.type === 'website' && (
                <a href={url.href} target="_blank" rel="noreferrer" className="flex items-center space-x-1.5 group-hover/project:underline">
                    <ExternalLink className="size-3 dark:text-sky-600" />
                    <h2 className="text-lg leading-none font-semibold text-sky-500 dark:text-sky-600">{url.name}</h2>
                </a>
            )}

            {url.type === 'internal' && (
                <Link href={url.href} className="flex items-center space-x-1.5 group-hover/project:underline">
                    <h2 className="text-lg leading-none font-semibold text-sky-500 dark:text-sky-600">{url.name}</h2>
                </Link>
            )}
        </>
    );
};

const ProjectUrls = ({ urls }: { urls: Url[] }) => {
    return (
        <div className="grow space-y-0.5">
            {urls.map((url) => (
                <ProjectUrl url={url} />
            ))}
        </div>
    );
};
export default function ProjectsGrid({ projects }: { projects: Project[] }) {
    return (
        <section id="projects">
            <Card>
                <CardHeader>
                    <CardTitle>My Projects</CardTitle>
                    <CardDescription>
                        i have worked on a variety of projects, from simple websites to complex web applications. Here are a few of my favorites.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {projects.map((p) => (
                        <div className="group/project flex flex-col py-1.5" key={p.id}>
                            <ProjectUrls urls={p.urls} />
                            <p className="text-sm text-slate-700 dark:text-slate-400">{p.description}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </section>
    );
}

export { ProjectsGrid };
