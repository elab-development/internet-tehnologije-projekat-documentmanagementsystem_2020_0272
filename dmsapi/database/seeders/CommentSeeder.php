<?php

namespace Database\Seeders;

use App\Models\Comment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Comment::create([
            'content' => 'Prvi komentar za dokument 1.',
            'document_id' => 1,
            'user_id' => 1,
        ]);

        Comment::create([
            'content' => 'Drugi komentar za dokument 1.',
            'document_id' => 1,
            'user_id' => 2,
        ]);

        Comment::create([
            'content' => 'Treći komentar za dokument 1.',
            'document_id' => 1,
            'user_id' => 3,
        ]);
    }
}
