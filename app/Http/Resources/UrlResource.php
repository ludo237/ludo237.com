<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Url;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Url */
final class UrlResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->getKey(),
            'name' => $this->getAttribute('name'),
            'href' => $this->getAttribute('href'),
            'type' => $this->getAttribute('type'),
            'createdAt' => $this->getAttribute('created_at'),
            'updatedAt' => $this->getAttribute('updated_at'),
        ];
    }
}
