<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vendor extends Model
{
    protected $fillable = [
        'enquiry_id',
        'company_name',
        'country',
        'contact_person',
        'email',
        'phone',
        'website',
        'address',
        'category',
        'brands',
        'certifications',
        'message',
        'status',
    ];
}
