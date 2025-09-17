import CareerTimeline from '@/components/career-timeline';
import Header from '@/components/header';
import SeoHead from '@/components/seo-head';
import { EloquentResource } from '@/types';
import { JobExperience, School } from '@/types/model';

interface HomeProps {
    jobs: EloquentResource<JobExperience[]>;
    schools: EloquentResource<School[]>;
}

export default function Home({ jobs, schools }: HomeProps) {
    return (
        <>
            <SeoHead />

            <main className="mx-auto min-h-[100dvh] max-w-3xl px-6 py-12 md:px-0">
                <Header />

                <CareerTimeline jobs={jobs.data} schools={schools.data} />
            </main>
        </>
    );
}
