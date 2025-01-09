'use client';

import { cva } from 'class-variance-authority';
import Link from 'next/link';
import {
  ComponentPropsWithoutRef,
  ElementRef,
  FC,
  forwardRef,
  useEffect,
  useState,
} from 'react';
import { getProjects } from '~/actions';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '~/components/ui/navigation-menu';
import { cn } from '~/lib/utils';

const projectItemVariant = cva(
  'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
);

const ProjectItem = forwardRef<
  ElementRef<'a'>,
  ComponentPropsWithoutRef<'a'> & { project: Project }
>(({ className, project, ...props }, ref) => {
  if (project.external) {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(projectItemVariant(), className)}
            {...props}
          >
            <div className='text-sm font-medium leading-none text-sky-500'>
              {project.name}
            </div>
            <p className='text-muted-foreground line-clamp-2 text-sm leading-snug'>
              {project.description}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }

  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={project.url}
          ref={ref}
          className={cn(projectItemVariant(), className)}
          {...props}
        >
          <div className='text-sm font-medium leading-none text-sky-500'>
            {project.name}
          </div>
          <p className='text-muted-foreground line-clamp-2 text-sm leading-snug'>
            {project.description}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});

const Navbar: FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const promise = async () => setProjects(await getProjects());

    promise();
  }, []);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href='/' legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href='/cv' legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Jobs
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href='/blog' legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Blog
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
              {projects.map((p) => (
                <ProjectItem key={p.name} project={p} />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export { Navbar };
