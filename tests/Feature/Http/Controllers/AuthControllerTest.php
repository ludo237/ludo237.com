<?php

declare(strict_types=1);

use Database\Factories\UserFactory;

test('login page can be rendered', function () {
    $response = $this->get('/login');

    $response->assertStatus(200)
        ->assertInertia(fn ($page) => $page
            ->component('auth/login')
        );
});

test('user can login with valid credentials', function () {
    $user = UserFactory::new()->create([
        'email' => 'test@example.com',
        'password' => bcrypt('password'),
    ]);

    $response = $this->post('/login', [
        'email' => 'test@example.com',
        'password' => 'password',
    ]);

    $response->assertRedirect('/dashboard');
    $this->assertAuthenticatedAs($user);
});

test('user cannot login with invalid credentials', function () {
    $response = $this->post('/login', [
        'email' => 'test@example.com',
        'password' => 'wrong-password',
    ]);

    $response->assertRedirect();
    $response->assertSessionHasErrors('email');
    $this->assertGuest();
});

test('dashboard requires authentication', function () {
    $response = $this->get('/dashboard');

    $response->assertRedirect('/login');
});

test('authenticated user can access dashboard', function () {
    $user = UserFactory::new()->create();

    $response = $this->actingAs($user)->get('/dashboard');

    $response->assertStatus(200)
        ->assertInertia(fn ($page) => $page
            ->component('dashboard')
            ->has('user')
            ->where('user.id', $user->id)
        );
});

test('user can logout', function () {
    $user = UserFactory::new()->create();

    $response = $this->actingAs($user)->delete('/logout');

    $response->assertRedirect('/');
    $this->assertGuest();
});
