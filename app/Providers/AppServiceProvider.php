<?php

namespace App\Providers;

use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        if ($this->app->environment(['production', 'prod'])) {
            URL::forceScheme('https');
        }

        Date::use(CarbonImmutable::class);
    }

    public function boot(): void {}
}
