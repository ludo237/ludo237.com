<?php

namespace Database\Seeders;

use Database\Factories\ProjectFactory;
use Database\Factories\UrlFactory;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $project = ProjectFactory::new()
            ->create([
                'name' => 'WS Socials',
                'description' => 'Turn house hunting into a community adventure',
            ]);

        UrlFactory::new()
            ->for($project, 'owner')
            ->create([
                'name' => 'WS Socials Website',
                'href' => 'https://ws-socials.ludo237.com/',
                'type' => 'website',
            ]);

        UrlFactory::new()
            ->for($project, 'owner')
            ->create([
                'name' => 'Source Code',
                'href' => 'https://gitlab.com/ws-socials',
                'type' => 'website',
            ]);

        UrlFactory::new()
            ->for($project, 'owner')
            ->create([
                'name' => 'Chrome Extension',
                'href' => 'https://chromewebstore.google.com/detail/nkefdpiahfaigkbmkbmmdgopfjkglcon',
                'type' => 'website',
            ]);

        $project = ProjectFactory::new()
            ->create([
                'name' => 'Omarchy',
                'description' => 'Opinionated Arch/Hyprland Setup',
            ]);

        UrlFactory::new()
            ->for($project, 'owner')
            ->create([
                'name' => 'Omarchy',
                'href' => 'https://github.com/basecamp/omarchy',
                'type' => 'website',
            ]);

        $project = ProjectFactory::new()
            ->create([
                'name' => 'Eloquent Traits',
                'description' => 'Useful set of Eloquent traits. The Eloquent ORM included with Laravel provides a beautiful, simple ActiveRecord implementation for working with your database. Each database table has a corresponding Model, which is used to interact with that table.',
            ]);

        UrlFactory::new()
            ->for($project, 'owner')
            ->create([
                'name' => 'Laravel Eloquent Traits',
                'href' => 'https://gitlab.com/ludo237/laravel-eloquent-traits',
                'type' => 'website',
            ]);

        $project = ProjectFactory::new()
            ->create([
                'name' => 'Laravel',
                'description' => 'Contributed to bug fixing and documentation',
            ]);

        UrlFactory::new()
            ->for($project, 'owner')
            ->create([
                'name' => 'Laravel Framework',
                'href' => 'https://github.com/laravel/framework',
                'type' => 'website',
            ]);

        $project = ProjectFactory::new()
            ->create([
                'name' => 'VueJs',
                'description' => 'Contributed to the codebase and translation initially to v0.x',
            ]);

        UrlFactory::new()
            ->for($project, 'owner')
            ->create([
                'name' => 'VueJs',
                'href' => 'https://github.com/vuejs/vue',
                'type' => 'website',
            ]);

        $project = ProjectFactory::new()
            ->create([
                'name' => 'Digie',
                'description' => 'Digie is digital signage as a service for businesses all around the world',
            ]);

        UrlFactory::new()
            ->for($project, 'owner')
            ->create([
                'name' => 'Digie',
                'href' => 'https://digie.it',
                'type' => 'website',
            ]);

        $project = ProjectFactory::new()
            ->create([
                'name' => 'IdeaQR',
                'description' => 'IdeaQR is the most used QR Code as a service in Italy',
            ]);

        UrlFactory::new()
            ->for($project, 'owner')
            ->create([
                'name' => 'IdeaQR',
                'href' => 'https://ideaqr.com',
                'type' => 'website',
            ]);
    }
}
