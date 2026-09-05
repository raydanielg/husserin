<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vendors', function (Blueprint $table) {
            $table->id();
            $table->string('enquiry_id')->unique();
            $table->string('company_name');
            $table->string('country');
            $table->string('contact_person');
            $table->string('email');
            $table->string('phone');
            $table->string('website')->nullable();
            $table->text('address')->nullable();
            $table->string('category');
            $table->text('brands')->nullable();
            $table->text('certifications')->nullable();
            $table->text('message')->nullable();
            $table->string('status')->default('pending');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vendors');
    }
};
