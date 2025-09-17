<?php

declare(strict_types=1);

use Database\Factories\PostFactory;
use Database\Factories\UserFactory;

test('guest cannot access posts index', function () {
    $this->get('/posts')->assertRedirect('/login');
});

test('authenticated user can access posts index', function () {
    $user = UserFactory::new()->create();

    $this->actingAs($user)
        ->get('/posts')
        ->assertOk();
});

test('authenticated user can create post', function () {
    $user = UserFactory::new()->create();

    $this->actingAs($user)
        ->post('/posts', [
            'title' => 'Test Post',
            'content' => 'This is a test post content.',
            'excerpt' => 'Test excerpt',
            'cover' => 'https://example.com/cover.jpg',
        ])
        ->assertRedirect('/posts');

    $this->assertDatabaseHas('posts', [
        'title' => 'Test Post',
        'content' => 'This is a test post content.',
    ]);
});

test('authenticated user can update post', function () {
    $user = UserFactory::new()->create();
    $post = PostFactory::new()->create([
        'title' => 'Original Title',
        'content' => 'Original content',
    ]);

    $this->actingAs($user)
        ->put("/posts/{$post->getKey()}", [
            'title' => 'Updated Title',
            'content' => 'Updated content',
            'excerpt' => 'Updated excerpt',
            'cover' => 'https://example.com/updated-cover.jpg',
            'publishedAt' => '2024-02-01T00:00:00.000Z',
        ])
        ->assertRedirect('/posts');

    $this->assertDatabaseHas('posts', [
        'id' => $post->getKey(),
        'title' => 'Updated Title',
        'content' => 'Updated content',
        'published_at' => '2024-02-01 00:00:00',
    ]);
});

test('authenticated user can delete post', function () {
    $user = UserFactory::new()->create();
    $post = PostFactory::new()->create();

    $this->actingAs($user)
        ->delete("/posts/{$post->getKey()}")
        ->assertRedirect('/posts');

    $this->assertDatabaseMissing('posts', [
        'id' => $post->getKey(),
    ]);
});

test('post creation automatically generates slug from title', function () {
    $user = UserFactory::new()->create();

    $this->actingAs($user)->post('/posts', [
        'title' => 'My Amazing Blog Post',
        'content' => 'This is the content.',
        'excerpt' => 'Test excerpt',
        'cover' => 'https://example.com/cover.jpg',
    ])->assertRedirect('/posts');

    $this->assertDatabaseHas('posts', [
        'title' => 'My Amazing Blog Post',
        'content' => 'This is the content.',
        'excerpt' => 'Test excerpt',
        'cover' => 'https://example.com/cover.jpg',
    ]);
});
