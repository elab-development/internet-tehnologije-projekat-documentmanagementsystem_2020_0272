<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class DocumentController extends Controller
{
    public function index()
    {
        $documents = Document::all();
        return response()->json($documents);
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
            'category_id' => 'required|exists:categories,id', 
            'tags' => 'required|array',      //Ovo pravilo zahteva da polje 'tags' bude prisutno u zahtevu (ne smije biti prazno ili null) i da bude niz (array).
            'tags.*' => 'distinct|exists:tags,id',  //Ovo pravilo se primenjuje na svaki element niza 'tags'.  //distinct' proverava da svaki tag u nizu bude jedinstven, tj. da se ne ponavlja više puta.
            'file' => 'required|file', // Pravilo za validaciju uploadovanog fajla
            'is_public' => 'required|boolean',
            'downloads' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $documentData = $validator->validated();

        // Obrada uploada fajla
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $filePath = $file->store('documents', 'public'); // Sačuvaj fajl i vrati putanju
            $documentData['file_path'] = $filePath;
        }

        // Kreiraj dokument i postavi kategoriju
        $document = Document::create($documentData);

        // Kako su tagovi predstavljeni kao niz, treba ih konvertovati u string pre snimanja
       // $document->tags()->sync($request->tags);   //Ova linija koda se koristi za uspostavljanje veze many-to-many između Document i Tag. Metoda sync prima niz ID-ova tagova i ažurira odgovarajuću pivot tabelu, uklanjajući sve postojeće veze i dodajući nove. S obzirom na vašu strukturu, ovo je ispravno za rad sa tagovima.
        return response()->json($document, 201);
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
    
        return response()->json($document);
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
    
}
