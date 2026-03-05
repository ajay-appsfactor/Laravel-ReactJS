<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/home', [HomeController::class, 'index'])->name('home');

Route::get('/users', [UserController::class, 'index'])->name('users.index');  //Read All  Users
Route::post('/users', [UserController::class, 'store']);  //Create User
Route::put('/users/{id}/update',[UserController::class,'update'])->name('users.update');  //Update User
Route::delete('/users/delete/{id}',[UserController::class, 'destroy'] ); //Delete User
Route::get('/users/{id}/edit', [UserController::class, 'edit']); // Single User
Route::get('users/create', [UserController::class, 'create'])->name('users.create'); // Create a User


// Route::resource('users', UserController::class);

// Route::group(['namespace' => 'App\Http\Controllers'], function(){
//     Route::get('users', 'UsersController@index')->name('users');
// });

require __DIR__.'/auth.php';
