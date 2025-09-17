<?php

declare(strict_types=1);

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(UserSeeder::class);
        $this->call(LanguageSeeder::class);
        $this->call(SchoolSeeder::class);
        $this->call(JobExperienceSeeder::class);
        $this->call(ProjectSeeder::class);
        $this->call(PostSeeder::class);
    }
}
