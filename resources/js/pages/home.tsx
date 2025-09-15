import CareerTimeline from '@/components/career-timeline';
import Header from '@/components/header';
import ProjectsGrid from '@/components/projects';
import SeoHead from '@/components/seo-head';
import { JobExperience, Project, School } from '@/types/model';

interface HomeProps {
    jobs: JobExperience[];
    projects: Project[];
    schools: School[];
}

export default function Home({ jobs, projects, schools }: HomeProps) {
    return (
        <>
            <SeoHead />

            <main className="flex min-h-[100dvh] flex-col space-y-9 py-9">
                <div className="max-w-2xl space-y-6 px-4 md:mx-auto md:px-0 lg:max-w-3xl xl:max-w-5xl">
                    <Header />
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <CareerTimeline jobs={jobs} schools={schools} />
                        <ProjectsGrid projects={projects} />
                    </div>
                </div>
            </main>
        </>
    );
}
