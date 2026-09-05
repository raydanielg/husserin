<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ConsolidationDetail extends Model
{
    protected $fillable = [
        'enquiry_id',
        'cargo_details',
        'supplier_info',
        'origin',
        'destination',
        'shipment_status',
    ];

    public function enquiry(): BelongsTo
    {
        return $this->belongsTo(Enquiry::class);
    }
}
