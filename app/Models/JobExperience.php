<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class JobExperience extends Model
{
    use HasUlids;

    protected $table = 'job_experiences';

    protected $guarded = ['id'];

    protected $casts = [
        'skills' => 'array',
    ];

    /**
     * @return MorphMany<Url, $this>
     */
    public function urls(): MorphMany
    {
        return $this->morphMany(Url::class, 'owner');
    }
}
