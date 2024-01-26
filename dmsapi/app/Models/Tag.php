<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'color',  //razlicite oznake cemo prikazivati razlicitim bojama na frontu
        'slug' ,   //jedinstveni identifikator oznake koji se može koristiti u URL-ovima
    ];

    public function documents()
    {
        return $this->belongsToMany(Document::class);
    }

}
