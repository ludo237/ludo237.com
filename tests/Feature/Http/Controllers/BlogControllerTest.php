<?php

declare(strict_types=1);

use Database\Factories\PostFactory;
use Inertia\Testing\AssertableInertia as Assert;

test('blog index page can be rendered', function () {
    $response = $this->get('/blog');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page->component('blog/index'));
});

test('blog index loads published posts ordered by date', function () {
    $oldPost = PostFactory::new()->published()->create([
        'title' => 'Old Post',
        'published_at' => now()->subDays(2),
    ]);
    $newPost = PostFactory::new()->published()->create([
        'title' => 'New Post',
        'published_at' => now()->subDay(),
    ]);
    PostFactory::new()->draft()->create(['title' => 'Draft Post']);

    $response = $this->get('/blog');

    $response->assertStatus(200)
        ->assertInertia(fn (Assert $page) => $page
            ->component('blog/index')
            ->has('posts')
        );
});

test('blog show page can be rendered with valid slug', function () {
    $post = PostFactory::new()->create();

    $response = $this->get("/blog/{$post->getAttributeValue('slug')}");

    $response->assertStatus(200)
        ->assertInertia(fn (Assert $page) => $page->component('blog/show')
        );
});

test('blog show page returns 404 for invalid slug', function () {
    $response = $this->get('/blog/non-existent-post');

    $response->assertStatus(404);
});
