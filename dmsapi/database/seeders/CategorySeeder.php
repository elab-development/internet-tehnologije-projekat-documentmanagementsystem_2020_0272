<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            ['name' => 'Web Development'],
            ['name' => 'Network Security'],
            ['name' => 'Data Science'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
