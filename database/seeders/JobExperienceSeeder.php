<?php

declare(strict_types=1);

namespace Database\Seeders;

use Database\Factories\JobExperienceFactory;
use Database\Factories\UrlFactory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Date;

class JobExperienceSeeder extends Seeder
{
    public function run(): void
    {
        $job = JobExperienceFactory::new()
            ->create([
                'avatar' => 'https://6go.it/wp-content/uploads/2024/04/cropped-6go-favicon-180x180.png',
                'company' => '6GO S.r.l.',
                'company_description' => 'Competenza e passione, per darti la migliore consulenza informatica possibile, online e offline.',
                'location' => 'Milan - Italy',
                'role' => 'Full Stack Developer',
                'role_description' => 'In this brave new world, it is critical to have at least one person with at least a functional understanding of each of the composite parts who is also capable of connecting various tiers and working with each expert so that a feature can actually be delivered. In a way, these tier-connecting, bridge-building software architects — who are likely experts in only one or a couple of tiers — are less full stack developer and much more full stack integratorIn this brave new world, it is critical to have at least one person with at least a functional understanding of each of the composite parts who is also capable of connecting various tiers and working with each expert so that a feature can actually be delivered. In a way, these tier-connecting, bridge-building software architects — who are likely experts in only one or a couple of tiers — are less full stack developer and much more full stack integrator',
                'skills' => [
                    'php',
                    'javascript',
                ],
                'started_at' => Date::create(2010, 7, 01),
                'ended_at' => Date::create(2018, 6, 01),
            ]);

        UrlFactory::new()
            ->for($job, 'owner')
            ->create([
                'name' => 'Official website',
                'href' => 'https://6go.it',
                'type' => 'website',
            ]);

        $job = JobExperienceFactory::new()
            ->create([
                'avatar' => 'https://6go.it/wp-content/uploads/2024/04/cropped-6go-favicon-180x180.png',
                'company' => '6GO S.r.l.',
                'company_description' => 'Competenza e passione, per darti la migliore consulenza informatica possibile, online e offline.',
                'location' => 'Milan - Remote',
                'role' => 'Chief Technology Officer',
                'role_description' => 'Came back to this company with only one goal in mind: take everything I learned and apply it to scale the company back-end API to reach new customers around the workd while orchestrating diverse teams of developers in a remote and asynchronous environment',
                'skills' => [
                    'php',
                    'laravel',
                    'SaaS',
                    'IaaS',
                    'PaaS',
                    'CI/CD',
                    'devops',
                    'react',
                    'typescript',
                    'NextJs',
                    'team building',
                    'management',
                    'investor relationships',
                ],
                'started_at' => Date::create(2018, 7, 01),
                'ended_at' => null,
            ]);

        UrlFactory::new()
            ->for($job, 'owner')
            ->create([
                'name' => 'Official website',
                'href' => 'https://6go.it',
                'type' => 'website',
            ]);

        $job = JobExperienceFactory::new()
            ->create([
                'avatar' => 'https://s1.immobiliare.it/assets/20250722101659/img/static-pages/media/icona-immobiliare-negativo.png',
                'company' => 'Immobiliare',
                'company_description' => "Immobiliare.it is Italy's largest property portal with over 1.2 million listings and more than 50 million monthly visits to the website and mobile app. The portal was launched in 2007 with the goal of offering the best platform to publish and search for property listings. Currently more than 20,000 real estate agents and developers use our services.",
                'location' => 'Milan - Remote',
                'role' => 'Senior Software Engineer',
                'role_description' => 'Primary objective: the complete refactor of the lead system, we did an incredible job by boosting leads up to 100k leads/day, then we completely rewrote the microservices behind it in order to offer a more granular approach while separating concerns',
                'skills' => [
                    'symfony at scale',
                    'micro services',
                    'linux',
                    'google meet',
                ],
                'started_at' => Date::create(2023, 04, 01),
                'ended_at' => Date::create(2025, 06, 21),
            ]);

        UrlFactory::new()
            ->for($job, 'owner')
            ->create([
                'name' => 'Official website',
                'href' => 'https://immobiliare.it',
                'type' => 'website',
            ]);
    }
}
