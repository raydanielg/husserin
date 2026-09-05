<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Add role to users table
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('STAFF')->after('password');
            $table->boolean('is_active')->default(true)->after('role');
        });

        // Central enquiries table
        Schema::create('enquiries', function (Blueprint $table) {
            $table->id();
            $table->string('reference_number')->unique();
            $table->enum('type', ['RFQ', 'TENDER', 'CONSOLIDATION', 'VENDOR']);
            $table->string('company_name');
            $table->string('contact_person');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('country')->nullable();
            $table->string('status')->default('NEW');
            $table->enum('priority', ['LOW', 'NORMAL', 'HIGH', 'URGENT'])->default('NORMAL');
            $table->foreignId('assigned_to')->nullable()->constrained('users')->nullOnDelete();
            $table->text('description')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamp('closed_at')->nullable();
            $table->timestamps();

            $table->index(['type', 'status']);
            $table->index('assigned_to');
        });

        // Enquiry notes (internal)
        Schema::create('enquiry_notes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('enquiry_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->text('note');
            $table->timestamps();
        });

        // Enquiry status history
        Schema::create('enquiry_status_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('enquiry_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('from_status');
            $table->string('to_status');
            $table->text('comment')->nullable();
            $table->timestamps();
        });

        // Attachments (private documents)
        Schema::create('attachments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('enquiry_id')->nullable()->constrained()->cascadeOnDelete();
            $table->morphs('attachable');
            $table->string('category')->default('general');
            $table->string('filename');
            $table->string('original_name');
            $table->string('mime_type');
            $table->unsignedBigInteger('size');
            $table->string('disk')->default('private');
            $table->foreignId('uploaded_by')->constrained('users')->cascadeOnDelete();
            $table->timestamps();
        });

        // Tender details
        Schema::create('tender_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('enquiry_id')->constrained()->cascadeOnDelete();
            $table->string('tender_reference')->nullable();
            $table->string('organization')->nullable();
            $table->text('scope')->nullable();
            $table->string('category')->nullable();
            $table->string('destination')->nullable();
            $table->date('closing_date')->nullable();
            $table->string('outcome')->nullable();
            $table->timestamps();
        });

        // Consolidation details
        Schema::create('consolidation_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('enquiry_id')->constrained()->cascadeOnDelete();
            $table->text('cargo_details')->nullable();
            $table->text('supplier_info')->nullable();
            $table->string('origin')->nullable();
            $table->string('destination')->nullable();
            $table->string('shipment_status')->nullable();
            $table->timestamps();
        });

        // Audit logs
        Schema::create('audit_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('action');
            $table->string('module')->nullable();
            $table->string('reference_number')->nullable();
            $table->text('description')->nullable();
            $table->json('old_values')->nullable();
            $table->json('new_values')->nullable();
            $table->string('ip_address')->nullable();
            $table->timestamps();

            $table->index('user_id');
            $table->index('module');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('audit_logs');
        Schema::dropIfExists('consolidation_details');
        Schema::dropIfExists('tender_details');
        Schema::dropIfExists('attachments');
        Schema::dropIfExists('enquiry_status_histories');
        Schema::dropIfExists('enquiry_notes');
        Schema::dropIfExists('enquiries');
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'is_active']);
        });
    }
};
