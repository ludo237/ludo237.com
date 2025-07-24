import CareerTimeline from '@/components/career-timeline';
import Header from '@/components/header';
import ProjectsGrid from '@/components/projects';
import { JobExperience, Project, School } from '@/types/model';
import { Head } from '@inertiajs/react';

interface HomeProps {
    jobs: JobExperience[];
    projects: Project[];
    schools: School[];
}

export default function Home({ jobs, projects, schools }: HomeProps) {
    return (
        <>
            <Head title="Home" />

            <main className="flex min-h-[100dvh] flex-col space-y-9 py-9">
                <Header />
                <div className="grid grid-cols-1 px-48 md:grid-cols-2 md:gap-x-32">
                    <CareerTimeline jobs={jobs} schools={schools} />
                    <ProjectsGrid projects={projects} />
                </div>
            </main>
        </>
    );
}
