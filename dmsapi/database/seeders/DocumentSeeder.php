<?php

namespace Database\Seeders;

use App\Models\Document;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DocumentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Document::create([
            'title' => 'Naslov dokumenta 1',
            'content' => 'Sadržaj dokumenta 1.',
            'file_path' => 'putanja1',
            'author_id' => 1,
            'downloads' => 0,
            'is_public' => true,
            'category_id' => 1,  
            'tags' => [1, 2, 3],  
        ]);

        Document::create([
            'title' => 'Naslov dokumenta 2',
            'content' => 'Sadržaj dokumenta 2.',
            'file_path' => 'putanja2',
            'author_id' => 2,
            'downloads' => 0,
            'is_public' => true,
            'category_id' => 2,  
            'tags' => [4, 5, 6],  
        ]);

        Document::create([
            'title' => 'Naslov dokumenta 3',
            'content' => 'Sadržaj dokumenta 3.',
            'file_path' => 'putanja3',
            'author_id' => 3,
            'downloads' => 0,
            'is_public' => true,
            'category_id' => 3,  
            'tags' => [7, 8, 9],  
        ]);
    }
}
