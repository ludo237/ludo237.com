<?php

declare(strict_types=1);

use Database\Factories\UserFactory;

test('guest cannot access dashboard', function () {
    $response = $this->get('/dashboard');

    $response->assertRedirect('/login');
});

test('authenticated user can access dashboard', function () {
    $user = UserFactory::new()->create();

    $response = $this->actingAs($user)->get('/dashboard');

    $response->assertOk();
});
