<?php

declare(strict_types=1);

namespace App\Http\Requests\Contracts;

interface HasDto
{
    public function dto(): object;
}
