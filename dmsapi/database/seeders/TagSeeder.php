<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tags = [
            ['name' => 'Programiranje', 'color' => 'blue', 'slug' => 'programiranje'],
            ['name' => 'Web Development', 'color' => 'green', 'slug' => 'web-development'],
            ['name' => 'Mrežna Sigurnost', 'color' => 'red', 'slug' => 'mreznasecurity'],
            ['name' => 'Cloud Computing', 'color' => 'purple', 'slug' => 'cloud-computing'],
            ['name' => 'Baze Podataka', 'color' => 'orange', 'slug' => 'baze-podataka'],
        ];

        foreach ($tags as $tag) {
            Tag::create($tag);
        }
    }
}
