<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Document extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title', 'content', 'file_path', 'author_id', 'downloads', 'is_public', 'category_id', 'tags'
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    public function getTagNamesAttribute()
    {
        // Dohvata nazive tagova i vraća ih kao niz
        return $this->tags()->pluck('name')->toArray();
    }

    public function setTagsAttribute($value)
    {
        if (is_array($value)) {
            $this->attributes['tags'] = implode(',', $value);
        } else {
            $this->attributes['tags'] = $value;
        }
    }

    public function getTagsAttribute($value)
    {
        return explode(',', $value);
    }
}
