<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Post>
 */
final class PostFactory extends Factory
{
    protected $model = Post::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(),
            'slug' => $this->faker->unique()->slug(),
            'excerpt' => $this->faker->paragraph(),
            'cover' => $this->faker->imageUrl(),
            'content' => $this->faker->paragraphs(5, true),
        ];
    }

    public function published(): static
    {
        return $this->state(fn (array $attributes): array => [
            'published_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ]);
    }

    public function draft(): static
    {
        return $this->state(fn (array $attributes): array => [
            'published_at' => null,
        ]);
    }
}
