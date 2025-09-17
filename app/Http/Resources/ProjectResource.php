<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Project */
class ProjectResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->getKey(),
            'name' => $this->getAttribute('name'),
            'description' => $this->getAttribute('description'),
            'createdAt' => $this->getAttribute('created_at'),
            'updatedAt' => $this->getAttribute('updated_at'),
            'urls' => $this->whenLoaded('urls'),
        ];
    }
}
