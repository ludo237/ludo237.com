<?php

declare(strict_types=1);

use Database\Factories\UserFactory;
use Illuminate\Support\Sleep;

pest()
    ->extend(Tests\TestCase::class)
    ->use(Illuminate\Foundation\Testing\RefreshDatabase::class)
    ->beforeEach(function () {
        Str::createRandomStringsNormally();
        Str::createUlidsNormally();
        Http::preventStrayRequests();
        Sleep::fake();

        UserFactory::dontExpandRelationshipsByDefault();

        $this->freezeTime();
    })
    ->in('Browser', 'Feature', 'Unit');
