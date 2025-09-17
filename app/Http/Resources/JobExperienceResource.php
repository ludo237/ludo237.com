<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\JobExperience;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin JobExperience */
class JobExperienceResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->getKey(),
            'avatar' => $this->getAttribute('avatar'),
            'company' => $this->getAttribute('company'),
            'companyDescription' => $this->getAttribute('company_description'),
            'location' => $this->getAttribute('location'),
            'role' => $this->getAttribute('role'),
            'roleDescription' => $this->getAttribute('role_description'),
            'skills' => $this->getAttribute('skills'),
            'startedAt' => $this->getAttribute('started_at'),
            'endedAt' => $this->getAttribute('ended_at'),
            'createdAt' => $this->getAttribute('created_at'),
            'updatedAt' => $this->getAttribute('updated_at'),

            'urls' => UrlResource::collection($this->whenLoaded('urls')),
        ];
    }
}
