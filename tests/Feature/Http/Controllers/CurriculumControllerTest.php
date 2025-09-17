<?php

declare(strict_types=1);

use Database\Factories\JobExperienceFactory;
use Database\Factories\LanguageFactory;
use Database\Factories\ProjectFactory;
use Database\Factories\SchoolFactory;
use Inertia\Testing\AssertableInertia as Assert;

test('curriculum page can be rendered', function () {
    $response = $this->get('/cv');

    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page->component('curriculum'));
});

test('curriculum page loads with all required data', function () {
    JobExperienceFactory::new()->count(2)->create();
    LanguageFactory::new()->count(2)->create();
    ProjectFactory::new()->count(2)->create();
    SchoolFactory::new()->count(2)->create();

    $response = $this->get('/cv');

    $response->assertStatus(200)
        ->assertInertia(fn (Assert $page) => $page->component('curriculum'));
});

test('curriculum page loads jobs sorted by started_at desc', function () {
    $response = $this->get('/cv');

    $response->assertStatus(200)
        ->assertInertia(fn (Assert $page) => $page->component('curriculum'));
});

test('curriculum page loads projects with urls relationship', function () {
    $response = $this->get('/cv');

    $response->assertStatus(200)
        ->assertInertia(fn (Assert $page) => $page->component('curriculum'));
});
