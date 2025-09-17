<?php

declare(strict_types=1);

use App\Models\JobExperience;
use App\Models\Language;
use App\Models\Project;
use App\Models\School;
use Database\Factories\JobExperienceFactory;
use Database\Factories\LanguageFactory;
use Database\Factories\ProjectFactory;
use Database\Factories\SchoolFactory;

test('curriculum page can be rendered', function () {
    $response = $this->get('/cv');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page->component('curriculum'));
});

test('curriculum page loads with all required data', function () {
    // Clear existing data
    JobExperience::query()->delete();
    Language::query()->delete();
    Project::query()->delete();
    School::query()->delete();

    JobExperienceFactory::new()->count(2)->create();
    LanguageFactory::new()->count(2)->create();
    ProjectFactory::new()->count(2)->create();
    SchoolFactory::new()->count(2)->create();

    $response = $this->get('/cv');

    $response->assertStatus(200)
        ->assertInertia(fn ($page) => $page
            ->component('curriculum')
            ->has('jobs', 2)
            ->has('languages', 2)
            ->has('projects', 2)
            ->has('schools', 2)
        );
});

test('curriculum page loads jobs sorted by started_at desc', function () {
    // Clear existing data
    JobExperience::query()->delete();

    $oldJob = JobExperienceFactory::new()->create(['started_at' => '2020-01-01']);
    $newJob = JobExperienceFactory::new()->create(['started_at' => '2023-01-01']);

    $response = $this->get('/cv');

    $response->assertStatus(200)
        ->assertInertia(fn ($page) => $page
            ->component('curriculum')
            ->where('jobs.0.id', $newJob->id)
            ->where('jobs.1.id', $oldJob->id)
        );
});

test('curriculum page loads projects with urls relationship', function () {
    // Clear existing data
    Project::query()->delete();

    $project = ProjectFactory::new()->create();
    $url = $project->urls()->create([
        'name' => 'GitHub',
        'href' => 'https://github.com/user/repo',
        'type' => 'website',
    ]);

    $response = $this->get('/cv');

    $response->assertStatus(200)
        ->assertInertia(fn ($page) => $page
            ->component('curriculum')
            ->has('projects.0.urls', 1)
            ->has('projects.0')
        );
});
