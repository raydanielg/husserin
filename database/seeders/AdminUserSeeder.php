<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@husserin.com'],
            [
                'name' => 'Super Admin',
                'password' => bcrypt('Husserin@2026'),
                'role' => 'SUPER_ADMIN',
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );

        User::updateOrCreate(
            ['email' => 'staff@husserin.com'],
            [
                'name' => 'Procurement Officer',
                'password' => bcrypt('Staff@2026'),
                'role' => 'STAFF',
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );
    }
}
