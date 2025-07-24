<?php

namespace Database\Factories;

use App\Models\JobExperience;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<JobExperience>
 */
class JobExperienceFactory extends Factory
{
    protected $model = JobExperience::class;

    public function definition(): array
    {
        return [
            'avatar' => $this->faker->imageUrl(),
            'company' => $this->faker->company(),
            'company_description' => $this->faker->paragraph(),
            'location' => $this->faker->city(),
            'role' => $this->faker->word(),
            'role_description' => $this->faker->paragraph(),
            'started_at' => $this->faker->date(),
            'ended_at' => $this->faker->date(),
        ];
    }
}
