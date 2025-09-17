<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Support\Facades\Password;

test('guest can access reset password form with valid token', function () {
    $user = User::factory()->create([
        'email' => 'test@example.com',
    ]);

    $token = Password::createToken($user);

    $response = $this->get("/reset-password/{$token}?email=test@example.com");

    $response->assertOk();
});

test('authenticated user is redirected from reset password form', function () {
    $user = User::factory()->create();
    $token = Password::createToken($user);

    $response = $this->actingAs($user)->get("/reset-password/{$token}?email={$user->email}");

    $response->assertRedirect('/dashboard');
});

test('can reset password with valid token and data', function () {
    $user = User::factory()->create([
        'email' => 'test@example.com',
    ]);

    $token = Password::createToken($user);

    $response = $this->post('/reset-password', [
        'token' => $token,
        'email' => 'test@example.com',
        'password' => 'new-password',
        'password_confirmation' => 'new-password',
    ]);

    $response->assertRedirect('/login');
    $response->assertSessionHas('status');
});

test('password reset fails with invalid token', function () {
    $user = User::factory()->create([
        'email' => 'test@example.com',
    ]);

    $response = $this->post('/reset-password', [
        'token' => 'invalid-token',
        'email' => 'test@example.com',
        'password' => 'new-password',
        'password_confirmation' => 'new-password',
    ]);

    $response->assertSessionHasErrors();
});

test('password reset fails with mismatched passwords', function () {
    $user = User::factory()->create([
        'email' => 'test@example.com',
    ]);

    $token = Password::createToken($user);

    $response = $this->post('/reset-password', [
        'token' => $token,
        'email' => 'test@example.com',
        'password' => 'new-password',
        'password_confirmation' => 'different-password',
    ]);

    $response->assertSessionHasErrors('password');
});

test('password reset requires all fields', function () {
    $response = $this->post('/reset-password', []);

    $response->assertSessionHasErrors(['token', 'email', 'password']);
});
