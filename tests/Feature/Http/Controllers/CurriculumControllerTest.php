<?php

use App\Models\JobExperience;
use App\Models\Language;
use App\Models\Project;
use App\Models\School;

test('curriculum page can be rendered', function () {
    $response = $this->get('/cv');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page->component('curriculum'));
});

test('curriculum page loads with all required data', function () {
    // Create test data
    $job = JobExperience::factory()->create();
    $language = Language::factory()->create();
    $project = Project::factory()->create();
    $school = School::factory()->create();

    $response = $this->get('/cv');

    $response->assertStatus(200)
        ->assertInertia(fn ($page) => $page
            ->component('curriculum')
            ->has('jobs')
            ->has('languages')
            ->has('projects')
            ->has('schools')
            ->where('jobs.0.id', $job->id)
            ->where('languages.0.id', $language->id)
            ->where('projects.0.id', $project->id)
            ->where('schools.0.id', $school->id)
        );
});

test('curriculum page loads jobs sorted by started_at desc', function () {
    $oldJob = JobExperience::factory()->create(['started_at' => '2020-01-01']);
    $newJob = JobExperience::factory()->create(['started_at' => '2023-01-01']);

    $response = $this->get('/cv');

    $response->assertStatus(200)
        ->assertInertia(fn ($page) => $page
            ->component('curriculum')
            ->where('jobs.0.id', $newJob->id)
            ->where('jobs.1.id', $oldJob->id)
        );
});

test('curriculum page loads projects with urls relationship', function () {
    $project = Project::factory()->create();
    $project->urls()->create([
        'label' => 'GitHub',
        'url' => 'https://github.com/user/repo',
    ]);

    $response = $this->get('/cv');

    $response->assertStatus(200)
        ->assertInertia(fn ($page) => $page
            ->component('curriculum')
            ->has('projects.0.urls', 1)
            ->where('projects.0.urls.0.label', 'GitHub')
        );
});
