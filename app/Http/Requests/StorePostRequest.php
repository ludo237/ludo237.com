<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Http\DataTransferObjects\PostDto;
use App\Http\Requests\Contracts\HasDto;
use Illuminate\Foundation\Http\FormRequest;

final class StorePostRequest extends FormRequest implements HasDto
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, array<string>>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'excerpt' => ['nullable', 'string', 'max:500'],
            'content' => ['required', 'string'],
            'cover' => ['nullable', 'string', 'max:255'],
            'publishedAt' => ['nullable', 'date'],
        ];
    }

    public function dto(): PostDto
    {
        return new PostDto(
            title: $this->input('title'),
            excerpt: $this->input('excerpt'),
            content: $this->input('content'),
            cover: $this->input('cover'),
            publishedAt: $this->input('publishedAt'),
        );
    }
}
