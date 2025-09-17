<?php

declare(strict_types=1);

namespace Database\Seeders;

use Database\Factories\LanguageFactory;
use Illuminate\Database\Seeder;

class LanguageSeeder extends Seeder
{
    public function run(): void
    {
        LanguageFactory::new()
            ->create([
                'name' => 'italian',
                'experience' => 'native',
            ]);

        LanguageFactory::new()
            ->create([
                'name' => 'english',
                'experience' => 'fluent',
            ]);

        LanguageFactory::new()
            ->create([
                'name' => 'spanish',
                'experience' => 'beginner',
            ]);
    }
}
