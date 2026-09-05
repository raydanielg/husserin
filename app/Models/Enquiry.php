<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Enquiry extends Model
{
    protected $fillable = [
        'reference_number',
        'type',
        'company_name',
        'contact_person',
        'email',
        'phone',
        'country',
        'status',
        'priority',
        'assigned_to',
        'description',
        'metadata',
        'closed_at',
    ];

    protected $casts = [
        'metadata' => 'array',
        'closed_at' => 'datetime',
    ];

    public function assignedTo(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function notes(): HasMany
    {
        return $this->hasMany(EnquiryNote::class);
    }

    public function statusHistories(): HasMany
    {
        return $this->hasMany(EnquiryStatusHistory::class);
    }

    public function attachments(): MorphMany
    {
        return $this->morphMany(Attachment::class, 'attachable');
    }

    public function tenderDetail()
    {
        return $this->hasOne(TenderDetail::class);
    }

    public function consolidationDetail()
    {
        return $this->hasOne(ConsolidationDetail::class);
    }
}
