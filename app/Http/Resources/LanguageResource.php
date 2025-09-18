<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Language;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Language */
final class LanguageResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->getKey(),
            'name' => $this->getAttribute('name'),
            'experience' => $this->getAttribute('experience'),
            'createdAt' => $this->getAttribute('created_at'),
            'updatedAt' => $this->getAttribute('updated_at'),
        ];
    }
}
