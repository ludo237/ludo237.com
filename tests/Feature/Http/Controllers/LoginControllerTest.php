<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Hash;

test('login screen can be rendered', function () {
    $response = $this->get('/login');

    $response->assertOk();
});

test('users can authenticate using the login screen', function () {
    $user = UserFactory::new()->create([
        'email' => 'test@example.com',
        'password' => Hash::make('password'),
    ]);

    $response = $this->post('/login', [
        'email' => 'test@example.com',
        'password' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect('/dashboard');
});

test('users can not authenticate with invalid password', function () {
    $user = UserFactory::new()->create([
        'email' => 'test@example.com',
        'password' => Hash::make('password'),
    ]);

    $this->post('/login', [
        'email' => 'test@example.com',
        'password' => 'wrong-password',
    ]);

    $this->assertGuest();
});

test('authenticated users can logout', function () {
    $user = UserFactory::new()->create();

    $response = $this->actingAs($user)->delete('/logout');

    $this->assertGuest();
    $response->assertRedirect('/');
});
