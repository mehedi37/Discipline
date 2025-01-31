<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Models\Transaction;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard',[
        'transactions' => Transaction::latest()->get()
    ]);
    })->name('dashboard');

    Route::get('/', function () {
        return redirect()->route('dashboard');
    });

    // Transaction routes
    Route::get('/transactions', [TransactionController::class, 'index'])->name('transactions.index');
    Route::post('/transactions', [TransactionController::class, 'store'])->name('transactions.store');
    Route::delete('/transactions/{transaction}', [TransactionController::class, 'destroy'])->name('transactions.destroy');

    // History views
    Route::get('/history/daily', [TransactionController::class, 'daily'])->name('transactions.daily');
    Route::get('/history/weekly', [TransactionController::class, 'weekly'])->name('transactions.weekly');
    Route::get('/history/monthly', [TransactionController::class, 'monthly'])->name('transactions.monthly');
    Route::get('/history/yearly', [TransactionController::class, 'yearly'])->name('transactions.yearly');

    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
