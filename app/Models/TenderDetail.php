<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TenderDetail extends Model
{
    protected $fillable = [
        'enquiry_id',
        'tender_reference',
        'organization',
        'scope',
        'category',
        'destination',
        'closing_date',
        'outcome',
    ];

    protected $casts = [
        'closing_date' => 'date',
    ];

    public function enquiry(): BelongsTo
    {
        return $this->belongsTo(Enquiry::class);
    }
}
