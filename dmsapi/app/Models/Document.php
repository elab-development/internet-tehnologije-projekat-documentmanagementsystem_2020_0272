<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Document extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = [
        'title',
        'content', 
        'file_path', 
        'author_id',
        'downloads' ,
        'is_public',
        'category_id',
        'tags'
       
    ];
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function categories()
    {
        return $this->belongsTo(Category::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }
    public function setTagsAttribute($value)// Konvertujemo niz tagova u string i cuvamo kao string u bazu
    {
        
        $this->attributes['tags'] = implode(',', $value);
    }

    public function getTagsAttribute($value)// Uzimamo string tagova iz baze i pretvaramo ga u niz
    {
        
        return explode(',', $value);
    }
}