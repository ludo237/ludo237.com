<?php

use App\Models\JobExperience;
use App\Models\Project;
use App\Models\School;

test('home page can be rendered', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page->component('home'));
});

test('home page loads with required data', function () {
    // Create test data
    $job = JobExperience::factory()->create();
    $project = Project::factory()->create();
    $school = School::factory()->create();

    $response = $this->get('/');

    $response->assertStatus(200)
        ->assertInertia(fn ($page) => $page
            ->component('home')
            ->has('jobs')
            ->has('projects')
            ->has('schools')
            ->where('jobs.0.id', $job->id)
            ->where('projects.0.id', $project->id)
            ->where('schools.0.id', $school->id)
        );
});

test('home page loads jobs with urls relationship', function () {
    $job = JobExperience::factory()->create();
    $job->urls()->create([
        'label' => 'Company Website',
        'url' => 'https://example.com',
    ]);

    $response = $this->get('/');

    $response->assertStatus(200)
        ->assertInertia(fn ($page) => $page
            ->component('home')
            ->has('jobs.0.urls', 1)
            ->where('jobs.0.urls.0.label', 'Company Website')
        );
});
