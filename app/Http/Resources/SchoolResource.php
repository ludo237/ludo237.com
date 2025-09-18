<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\School;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin School */
final class SchoolResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->getKey(),
            'name' => $this->getAttribute('name'),
            'avatar' => $this->getAttribute('avatar'),
            'description' => $this->getAttribute('description'),
            'location' => $this->getAttribute('location'),
            'startedAt' => $this->getAttribute('started_at'),
            'endedAt' => $this->getAttribute('ended_at'),
            'createdAt' => $this->getAttribute('created_at'),
            'updatedAt' => $this->getAttribute('updated_at'),
            'urls' => $this->whenLoaded('urls'),
        ];
    }
}
