<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('schools', function (Blueprint $table) {
            $table->ulid('id');
            $table->string('name')->unique();
            $table->string('avatar');
            $table->longText('description');
            $table->string('location');
            $table->date('started_at');
            $table->date('ended_at');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('schools');
    }
};
