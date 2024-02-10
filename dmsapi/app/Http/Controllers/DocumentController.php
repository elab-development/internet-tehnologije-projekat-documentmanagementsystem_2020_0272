<?php

namespace App\Http\Controllers;

use App\Http\Resources\DocumentResource;
use App\Models\Category;
use App\Models\Document;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class DocumentController extends Controller
{
    public function index()
    {
        $documents = Document::all();
        return DocumentResource::collection($documents);
    }

    public function show($id)
    {
        $document = Document::findOrFail($id);
        return response()->json($document);
    }

 

    public function store(Request $request)
    {
        
        $validator = Validator::make($request->all(), [
            'title' => 'required|max:255',
            'content' => 'required',
            'author_id' => 'required|exists:users,id',
            'category_name' => 'required|max:255',  
            'tags' => 'required|array',
            'tags.*' => 'distinct|exists:tags,id',
            'file' => 'required|file',
            'downloads' => 'required|numeric',
        ]);
      
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        DB::beginTransaction();
        try {
            $requestData = $validator->validated();
        
            // Proveravamo da li kategorija već postoji
            $category = Category::firstOrCreate(['name' => $requestData['category_name']]);
        
            // Obrada uploada fajla
            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $filePath = $file->store('documents', 'public');
                $requestData['file_path'] = $filePath;
            }
            
            $requestData['category_id'] = $category->id; // Postavljamo ID kategorije u zahtevu
        
            // Kreiramo dokument
            $document = Document::create($requestData);
            DB::commit();
        } catch (\Exception $e) {
            // Ukoliko se desi bilo koja greška, rollback transakcije
            DB::rollback();

            return response()->json($document, 201);
        }
    }
    

    public function update(Request $request, $id)
    {
        $document = Document::findOrFail($id);
    
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|max:255',
            'content' => 'sometimes|required',
            'author_id' => 'sometimes|required|exists:users,id',
            'category_id' => 'sometimes|required|exists:categories,id',
            'tags' => 'sometimes|required|array',
            'tags.*' => 'distinct|exists:tags,id',
            'file' => 'sometimes|file',
            'is_public' => 'sometimes|boolean',
            'downloads' => 'sometimes|numeric',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        $documentData = $validator->validated();
    
        // Obrada uploada fajla
        if ($request->hasFile('file')) {
            // Pre nego što sačuvamo novi fajl, trebalo bi da obrisemo stari
            Storage::delete($document->file_path);
    
            $file = $request->file('file');
            $filePath = $file->store('documents', 'public'); // Sačuvaj fajl i vrati putanju
            $documentData['file_path'] = $filePath;
        }
    
        // Konvertovanje niza tagova u string pre snimanja, ako su tagovi prosleđeni
        if (isset($documentData['tags'])) {
            $documentData['tags'] = implode(',', $request->tags);
        }
    
        $document->update($documentData);
    
        return response()->json(new DocumentResource($document));
    }
    
    public function destroy($id)  //posto nas model koristi softDeletes, onda metoda destroy mora da bude implementirana na malo drugaciji nacin
    {
        $document = Document::withTrashed()->findOrFail($id);
    
        if ($document->trashed()) {
            //  dokument je već obrisan  
            return response()->json(['message' => 'Document has already been deleted.'], 404);
        } else {
            $document->delete();
            return response()->json(null, 204);
        }
    }
    public function search(Request $request)  //dopunjena metoda tako da cita fajl i radi pretragu i po sadrzaju fajla
    {
        // Počinjemo sa kreiranjem osnovnog upita
        $query = Document::query();
    
        // Filtriramo po naslovu ako je prosleđen kao parametar
        if ($request->has('title')) {
            $query->where('title', 'like', '%' . $request->title . '%');
        }
    
        // Filtriramo po sadržaju ako je prosleđen kao parametar
        if ($request->has('content')) {
            // Pretraga po sadržaju fajla
            $content = $request->content;
            $documentsWithContent = [];
            
            // Pretražujemo sve dokumente
            $allDocuments = $query->get();
            foreach ($allDocuments as $document) {
                // Učitavamo sadržaj fajla
                $fileContent = file_get_contents($document->file_path);
                // Ako sadrži traženi tekst, dodajemo ga u rezultate
                if (strpos($fileContent, $content) !== false) {
                    $documentsWithContent[] = $document;
                }
            }
    
            // Vraćamo dokumente koji odgovaraju kriterijumima pretrage
            return response()->json($documentsWithContent);
        }
    
        // Filtriramo po autoru ako je prosleđen kao parametar
        if ($request->has('author_id')) {
            $query->where('author_id', $request->author_id);
        }
    
        // Filtriramo po kategoriji ako je prosleđen kao parametar
        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }
    
        // Filtriramo po tagovima ako su prosleđeni kao parametar
        if ($request->has('tags')) {
            $tags = $request->tags;
            $query->whereHas('tags', function ($query) use ($tags) {
                $query->whereIn('id', $tags);
            });
        }
    
        // Filtriramo po dostupnosti ako je prosleđen kao parametar
        if ($request->has('is_public')) {
            $query->where('is_public', $request->is_public);
        }
    
        // Dobijamo filtrirane dokumente
        $documents = $query->get();
    
        // Vraćamo dokumente kao JSON odgovor
        return response()->json($documents);
    }
    




    public function download($id)
    {
        $document = Document::findOrFail($id);
        $filePath = storage_path('app/public/' . $document->file_path);
    
        if (!file_exists($filePath)) {
            return response()->json(['message' => 'File not found.'], 404);
        }
    
        $fileName = basename($filePath);
        $fileExtension = pathinfo($filePath, PATHINFO_EXTENSION);
    
        // Određivanje MIME tipa na osnovu ekstenzije fajla
        $mimeType = $this->getMimeType($fileExtension);
    
        // Preuzimanje fajla sa ispravnim MIME tipom
        return response()->download($filePath, $fileName, [
            'Content-Type' => $mimeType,
            'Content-Disposition' => 'attachment; filename="' . $fileName . '"'
        ]);
        
    }
    
    // Pomoćna funkcija za dobijanje MIME tipa
    private function getMimeType($extension)
    {
        $mimeTypes = [
            'pdf' => 'application/pdf',
            'jpg' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'png' => 'image/png',
            'txt' => 'text/plain',
            
        ];
    
        return $mimeTypes[$extension] ?? 'application/octet-stream';  
    }
    public function statistics()
    {
        // Ukupan broj fajlova
        $totalDocuments = Document::count();
        
        // Ukupan broj korisnika
        $totalUsers = User::count();
        
       
        
        $statistics['total_documents'] = $totalDocuments;
        $statistics['total_users'] = $totalUsers;
       
        
        $statistics2 = [];
        
        // Iteriramo kroz sve kategorije
        foreach (Category::all() as $category) {
            // Brojimo koliko fajlova pripada trenutnoj kategoriji
            $documentCount = Document::where('category_id', $category->id)->count();
        
            // Dodajemo broj fajlova u statistiku za trenutnu kategoriju sa njenim nazivom
            $statistics2[] = [
                'category_id' => $category->id,
                'category_name' => $category->name,
                'document_count' => $documentCount,
            ];
        }
    
        // Spajamo oba niza u jedan
        $combinedStatistics = array_merge($statistics, ['custom_statistics' => $statistics2]);
    
        // Konvertujemo niz u JSON format i vraćamo ga
        return response()->json($combinedStatistics);
    }
    
    
    


}
