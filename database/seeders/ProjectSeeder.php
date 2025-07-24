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
                'name' => 'Delayed Artistic Guppy',
                'description' => 'Package that generates slugify words like Gfycat or Twitch Clips.',
            ]);

        UrlFactory::new()
            ->for($project, 'owner')
            ->create([
                'name' => 'Delayed Artistic Guppy',
                'href' => 'https://gitlab.com/ludo237/delayed-artistic-guppy',
                'type' => 'website',
            ]);

        $project = ProjectFactory::new()
            ->create([
                'name' => 'Laravel Rules',
                'description' => "A set of custom Laravel rules that I've developed over the years I find them useful",
            ]);

        UrlFactory::new()
            ->for($project, 'owner')
            ->create([
                'name' => 'Laravel Rules',
                'href' => 'https://gitlab.com/ludo237/laravel-rules',
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

        $project = ProjectFactory::new()
            ->create([
                'name' => 'Sudoku Classic',
                'description' => 'Simple sudoku board that reflects the classic game, which i like a lot',
            ]);

        UrlFactory::new()
            ->for($project, 'owner')
            ->create([
                'name' => 'Sudoku',
                'href' => '/projects/sudoku',
                'type' => 'internal',
            ]);
    }
}
