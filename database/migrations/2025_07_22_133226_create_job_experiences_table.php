<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('job_experiences', function (Blueprint $table): void {
            $table->ulid('id');
            $table->string('avatar');
            $table->string('company')->index();
            $table->longText('company_description');
            $table->string('location');
            $table->string('role');
            $table->longText('role_description');
            $table->json('skills');
            $table->date('started_at');
            $table->date('ended_at')->nullable()->default(null);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};
