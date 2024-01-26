<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\TagController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('/documents/search', [DocumentController::class, 'search']);  //GET /api/documents/search?title=izveštaj&category_id=3&tags[]=1&tags[]=5&is_public=1

Route::apiResource('documents', DocumentController::class);
Route::apiResource('comments', CommentController::class);
Route::apiResource('tags', TagController::class);
Route::apiResource('categories', CategoryController::class);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
