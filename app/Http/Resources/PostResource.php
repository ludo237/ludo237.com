<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Post */
final class PostResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->getKey(),
            'title' => $this->getAttribute('title'),
            'slug' => $this->getAttribute('slug'),
            'excerpt' => $this->getAttribute('excerpt'),
            'content' => $this->getAttribute('content'),
            'cover' => $this->getAttribute('cover'),
            'publishedAt' => $this->getAttribute('published_at'),
            'createdAt' => $this->getAttribute('created_at'),
            'updatedAt' => $this->getAttribute('updated_at'),
        ];
    }
}
