<?php

declare(strict_types=1);

use Database\Factories\JobExperienceFactory;
use Database\Factories\UserFactory;

test('guest cannot access job experiences index', function () {
    $response = $this->get('/job-experiences');

    $response->assertRedirect('/login');
});

test('authenticated user can access job experiences index', function () {
    $user = UserFactory::new()->create();

    $response = $this->actingAs($user)->get('/job-experiences');

    $response->assertOk();
});

test('authenticated user can create job experience', function () {
    $user = UserFactory::new()->create();

    $response = $this->actingAs($user)->post('/job-experiences', [
        'company' => 'Tech Company',
        'companyDescription' => 'A great tech company.',
        'location' => 'Remote',
        'role' => 'Software Engineer',
        'roleDescription' => 'Developing awesome software.',
        'skills' => ['PHP', 'Laravel', 'React'],
        'startedAt' => '2023-01-01',
        'endedAt' => '2023-12-31',
        'avatar' => 'https://example.com/logo.png',
    ]);

    $response->assertRedirect('/job-experiences');
    $this->assertDatabaseHas('job_experiences', [
        'company' => 'Tech Company',
        'role' => 'Software Engineer',
        'location' => 'Remote',
        'company_description' => 'A great tech company.',
        'role_description' => 'Developing awesome software.',
        'started_at' => '2023-01-01',
        'ended_at' => '2023-12-31',
    ]);
});

test('authenticated user can update job experience', function () {
    $user = UserFactory::new()->create();
    $jobExperience = JobExperienceFactory::new()->create([
        'company' => 'Original Company',
        'role' => 'Original Role',
    ]);

    $response = $this->actingAs($user)->put("/job-experiences/{$jobExperience->getKey()}", [
        'company' => 'Updated Company',
        'companyDescription' => 'Updated description.',
        'location' => 'New Location',
        'role' => 'Updated Role',
        'roleDescription' => 'Updated role description.',
        'skills' => ['Vue', 'Node.js'],
        'startedAt' => '2024-01-01',
        'endedAt' => '2024-12-31',
        'avatar' => 'https://example.com/new-logo.png',
    ]);

    $response->assertRedirect('/job-experiences');
    $this->assertDatabaseHas('job_experiences', [
        'id' => $jobExperience->getKey(),
        'company' => 'Updated Company',
        'role' => 'Updated Role',
        'company_description' => 'Updated description.',
        'role_description' => 'Updated role description.',
        'started_at' => '2024-01-01',
        'ended_at' => '2024-12-31',
    ]);
});

test('authenticated user can delete job experience', function () {
    $user = UserFactory::new()->create();
    $jobExperience = JobExperienceFactory::new()->create();

    $response = $this->actingAs($user)->delete("/job-experiences/{$jobExperience->getKey()}");

    $response->assertRedirect('/job-experiences');
    $this->assertDatabaseMissing('job_experiences', [
        'id' => $jobExperience->getKey(),
    ]);
});

test('job experience resource includes urls when loaded', function () {
    $user = UserFactory::new()->create();
    $jobExperience = JobExperienceFactory::new()->create([
        'company' => 'Tech Corp',
        'role' => 'Developer',
    ]);

    $jobExperience->urls()->createMany([
        [
            'name' => 'Company Website',
            'href' => 'https://techcorp.com',
            'type' => 'website',
        ],
        [
            'name' => 'GitHub Repository',
            'href' => 'https://github.com/techcorp/project',
            'type' => 'internal',
        ],
    ]);

    $this->actingAs($user)
        ->get("/job-experiences/{$jobExperience->getKey()}")
        ->assertOk();
});
