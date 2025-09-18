<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Url;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Url>
 */
final class UrlFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->sentence(2),
            'href' => $this->faker->url(),
            'type' => $this->faker->randomElement(['website', 'internal']),
        ];
    }
}
