<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


// U routes/web.php
Route::get('/reset-password/{token}', function ($token) {
    return <<<HTML
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Password</title>
    </head>
    <body>
        <form method="POST" action="/api/reset-password">
            <input type="hidden" name="token" value="{$token}">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            <label for="password">New Password:</label>
            <input type="password" id="password" name="password" required>
            <label for="password_confirmation">Confirm New Password:</label>
            <input type="password" id="password_confirmation" name="password_confirmation" required>
            <button type="submit">Reset Password</button>
        </form>
    </body>
    </html>
    HTML;
})->name('password.reset');

