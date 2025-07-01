import {ExternalLink} from 'lucide-react';
import Link from 'next/link';
import {getProjects} from '~/actions/cv';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';

const ProjectsGrid = async () => {
  const projects = await getProjects();

  return (
    <section id='projects'>
      <Card>
        <CardHeader>
          <CardTitle>My Projects</CardTitle>
          <CardDescription>
            i have worked on a variety of projects, from simple websites to complex
            web applications. Here are a few of my favorites.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {projects.map((p) => (
            <div className='group/post flex items-center py-1.5' key={p.id}>
              <div className='grow space-y-0.5'>
                {p.external && (
                  <a
                    href={p.url}
                    target='_blank'
                    rel='noreferrer'
                    className='flex items-center space-x-1.5 group-hover/post:underline'
                  >
                    <ExternalLink className='size-3 dark:text-sky-600' />
                    <h2 className='text-lg leading-none font-semibold text-sky-500 dark:text-sky-600'>
                      {p.name}
                    </h2>
                  </a>
                )}

                {!p.external && (
                  <Link
                    href={p.url}
                    className='flex items-center space-x-1.5 group-hover/post:underline'
                  >
                    <h2 className='text-lg leading-none font-semibold text-sky-500 dark:text-sky-600'>
                      {p.name}
                    </h2>
                  </Link>
                )}
                <p className='text-sm text-slate-700 dark:text-slate-400'>
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
};

export {ProjectsGrid};
