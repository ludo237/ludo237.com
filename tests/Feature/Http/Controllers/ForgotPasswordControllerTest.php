<?php

declare(strict_types=1);

use App\Models\User;

test('guest can access forgot password form', function () {
    $response = $this->get('/forgot-password');

    $response->assertOk();
});

test('authenticated user is redirected from forgot password form', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/forgot-password');

    $response->assertRedirect('/dashboard');
});

test('can request password reset with valid email', function () {
    $user = User::factory()->create([
        'email' => 'test@example.com',
    ]);

    $response = $this->post('/forgot-password', [
        'email' => 'test@example.com',
    ]);

    $response->assertRedirect();
    $response->assertSessionHas('status');
});

test('password reset fails with invalid email', function () {
    $response = $this->post('/forgot-password', [
        'email' => 'invalid@example.com',
    ]);

    $response->assertSessionHasErrors('email');
});

test('password reset requires email field', function () {
    $response = $this->post('/forgot-password', []);

    $response->assertSessionHasErrors('email');
});

test('password reset requires valid email format', function () {
    $response = $this->post('/forgot-password', [
        'email' => 'invalid-email',
    ]);

    $response->assertSessionHasErrors('email');
});
