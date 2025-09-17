<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Inertia\Inertia;

abstract class Controller
{
    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    protected function mergeSeoValues(array $data): array
    {
        return array_merge(
            Inertia::getShared()['meta'],
            $data,
        );
    }
}
