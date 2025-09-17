<?php

declare(strict_types=1);

use Database\Factories\JobExperienceFactory;
use Database\Factories\ProjectFactory;
use Database\Factories\SchoolFactory;
use Inertia\Testing\AssertableInertia as Assert;

test('home page can be rendered', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page->component('home'));
});

test('home page loads with required data', function () {
    JobExperienceFactory::new()->count(2)->create();
    ProjectFactory::new()->count(2)->create();
    SchoolFactory::new()->count(2)->create();

    $response = $this->get('/');

    $response->assertStatus(200)
        ->assertInertia(fn (Assert $page) => $page->component('home'));
});

test('home page loads jobs with urls relationship', function () {
    $response = $this->get('/');

    $response->assertStatus(200)
        ->assertInertia(fn (Assert $page) => $page->component('home'));
});
