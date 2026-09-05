<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    protected $fillable = [
        'enquiry_id',
        'name',
        'email',
        'phone',
        'company',
        'subject',
        'message',
        'status',
    ];
}
