import { ExternalLink } from 'lucide-react';
import { FC } from 'react';
import { getProjects } from '~/actions';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/Card';

const ProjectsCard: FC = async () => {
  const proejcts = await getProjects();

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-sky-500'>Projects</CardTitle>
        <CardDescription>My most notable projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-3'>
          {proejcts.map((p, index) => (
            <div className='group/post flex items-center py-1.5' key={index}>
              <div className='grow space-y-0.5'>
                {p.external && (
                  <a
                    href={p.url}
                    target='_blank'
                    rel='nofollow'
                    className='flex items-center space-x-1.5 font-medium leading-none text-sky-500 group-hover/post:underline'
                  >
                    <ExternalLink className='size-3' />
                    <p>{p.name}</p>
                  </a>
                )}
                <p className='text-sm text-zinc-600 dark:text-zinc-200'>
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export { ProjectsCard };
