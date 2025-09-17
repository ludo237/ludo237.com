<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Post extends Model
{
    use HasFactory, HasUlids;

    protected $table = 'posts';

    protected $guarded = ['id'];

    protected static function booted(): void
    {
        static::creating(function (Post $post) {
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
