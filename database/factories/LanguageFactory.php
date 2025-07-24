<?php

namespace Database\Factories;

use App\Models\Language;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Language>
 */
class LanguageFactory extends Factory
{
    protected $model = Language::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->languageCode(),
            'experience' => $this->faker->randomElement([
                'beginner',
                'intermediate',
                'fluent',
                'native',
            ]),
        ];
    }
}
