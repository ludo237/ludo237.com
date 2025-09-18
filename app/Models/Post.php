<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

final class Post extends Model
{
    use HasUlids;

    protected $table = 'posts';

    protected $guarded = ['id'];

    protected static function booted(): void
    {
        self::creating(function (Post $post): void {
            $post->slug = Str::slug($post->getAttributeValue('title')).'-'.Str::random(5);
        });
    }

    protected function casts(): array
    {
        return [
            'published_at' => 'datetime',
        ];
    }
}
