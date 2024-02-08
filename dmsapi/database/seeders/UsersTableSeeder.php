<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         $usersData = [
            [
                'name' => 'Pera',
                'email' => 'pera@example.com',
                'password' => bcrypt('password'),
                'date_of_birth' => '1990-01-15',
                'bio' => 'Ovo je Pera.',
            ],
            [
                'name' => 'Mika',
                'email' => 'mika@example.com',
                'password' => bcrypt('password'),
                'date_of_birth' => '1985-05-20',
                'bio' => 'Ovo je Mika.',
            ],
            [
                'name' => 'Zika',
                'email' => 'zika@example.com',
                'password' => bcrypt('password'),
                'date_of_birth' => '1995-09-10',
                'bio' => 'Ovo je Zika.',
                'role' => 'admin',
            ],
        ];

        foreach ($usersData as $userData) {
            User::create($userData);
        }
    }
}
