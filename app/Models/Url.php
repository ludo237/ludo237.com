<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Url extends Model
{
    use HasUlids;

    public function owner(): MorphTo
    {
        return $this->morphTo();
    }
}
