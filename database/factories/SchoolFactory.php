<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\School;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<School>
 */
class SchoolFactory extends Factory
{
    protected $model = School::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->company(),
            'avatar' => $this->faker->imageUrl(),
            'description' => $this->faker->paragraph(),
            'location' => $this->faker->city(),
            'started_at' => $this->faker->date(),
            'ended_at' => $this->faker->date(),
        ];
    }
}
