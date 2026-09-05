<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rfq extends Model
{
    protected $fillable = [
        'enquiry_id',
        'company',
        'contact_person',
        'email',
        'phone',
        'country',
        'item_or_spec',
        'category',
        'quantity',
        'unit',
        'destination',
        'required_date',
        'message',
        'status',
    ];
}
