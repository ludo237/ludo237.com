<?php

declare(strict_types=1);

namespace App\Http\DataTransferObjects;

final readonly class PostDto
{
    public function __construct(
        public string $title,
        public string $excerpt,
        public string $content,
        public string $cover,
        public ?string $publishedAt = null,
        public ?string $slug = null,
    ) {}

    /**
     * @return array{
     *     title: string,
     *     excerpt: string,
     *     content: string,
     *     cover: string,
     *     published_at: string|null,
     *     slug: string|null
     * }
     */
    public function toArray(): array
    {
        return [
            'title' => $this->title,
            'excerpt' => $this->excerpt,
            'content' => $this->content,
            'cover' => $this->cover,
            'published_at' => $this->publishedAt,
            'slug' => $this->slug,
        ];
    }
}
