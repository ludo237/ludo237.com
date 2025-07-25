<?php

use App\Models\JobExperience;
use App\Models\Project;
use App\Models\School;
use Database\Factories\JobExperienceFactory;
use Database\Factories\ProjectFactory;
use Database\Factories\SchoolFactory;

test('home page can be rendered', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page->component('home'));
});

test('home page loads with required data', function () {
    // Clear existing data
    JobExperience::query()->delete();
    Project::query()->delete();
    School::query()->delete();

    JobExperienceFactory::new()->count(2)->create();
    ProjectFactory::new()->count(2)->create();
    SchoolFactory::new()->count(2)->create();

    $response = $this->get('/');

    $response->assertStatus(200)
        ->assertInertia(fn ($page) => $page
            ->component('home')
            ->has('jobs', 2)
            ->has('projects', 2)
            ->has('schools', 2)
        );
});

test('home page loads jobs with urls relationship', function () {
    // Clear existing data
    JobExperience::query()->delete();

    $job = JobExperienceFactory::new()->create();
    $job->urls()->create([
        'name' => 'Company Website',
        'href' => 'https://example.com',
        'type' => 'website',
    ]);

    $response = $this->get('/');

    $response->assertStatus(200)
        ->assertInertia(fn ($page) => $page
            ->component('home')
            ->has('jobs.0.urls', 1)
            ->has('jobs.0')
        );
});
