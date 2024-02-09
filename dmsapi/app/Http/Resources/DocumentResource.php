<?php

namespace App\Http\Resources;

use App\Models\Tag;
use Illuminate\Http\Resources\Json\JsonResource;

class DocumentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    
    public function toArray($request)
    {
        $tagNames = Tag::whereIn('id', $this->tags)->pluck('name')->toArray();
        return [
            'id' => $this->id,
            'title' => $this->title,
            'content' => $this->content,
            'file_path' => $this->file_path,
            'author' => $this->author,
            'downloads' => $this->downloads,
            'is_public' => $this->is_public,
            'category' => $this->category,
            
            'tags' => $tagNames, 
            
        ];
    }
}
