<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class JobExperience extends Model
{
    use HasUlids;

    protected $table = 'job_experiences';

    protected $casts = [
        'skills' => 'array',
    ];

    public function urls(): MorphMany
    {
        return $this->morphMany(Url::class, 'owner');
    }
}
