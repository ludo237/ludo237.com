<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Language;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Language>
 */
final class LanguageFactory extends Factory
{
    protected $model = Language::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement(['English', 'Spanish', 'French', 'German', 'Italian']),
            'experience' => $this->faker->randomElement([
                'beginner',
                'intermediate',
                'fluent',
                'native',
            ]),
        ];
    }
}
