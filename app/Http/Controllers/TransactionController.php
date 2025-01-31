<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

class TransactionController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Transactions/Index', [
            'transactions' => Transaction::where('user_id', auth()->id())
                ->orderBy('transaction_date', 'desc')
                ->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric',
            'description' => 'required|string|max:255',
            'category' => 'nullable|string|max:50',
            'type' => 'required|in:income,expense',
            'transaction_date' => 'required|date',
        ]);

        $validated['user_id'] = auth()->id();

        // Convert amount to negative if it's an expense
        if ($validated['type'] === 'expense') {
            $validated['amount'] = -abs($validated['amount']);
        }

        Transaction::create($validated);

        return redirect()->back()->with('success', 'Transaction added successfully');
    }

    public function destroy(Transaction $transaction)
    {
        if ($transaction->user_id !== auth()->id()) {
            abort(403);
        }

        $transaction->delete();

        return redirect()->back()->with('success', 'Transaction deleted successfully');
    }

    public function daily(Request $request): Response
    {
        $date = $request->input('date') ? Carbon::parse($request->input('date')) : today();

        $transactions = Transaction::where('user_id', auth()->id())
            ->whereDate('transaction_date', $date)
            ->orderBy('transaction_date', 'desc')
            ->get();

        return Inertia::render('Transactions/Daily', [
            'transactions' => $transactions
        ]);
    }

    public function weekly(): Response
    {
        $transactions = Transaction::where('user_id', auth()->id())
            ->whereBetween('transaction_date', [now()->startOfWeek(), now()->endOfWeek()])
            ->orderBy('transaction_date', 'desc')
            ->get();

        return Inertia::render('Transactions/Weekly', [
            'transactions' => $transactions
        ]);
    }

    public function monthly(): Response
    {
        $transactions = Transaction::where('user_id', auth()->id())
            ->whereMonth('transaction_date', now()->month)
            ->orderBy('transaction_date', 'desc')
            ->get();

        return Inertia::render('Transactions/Monthly', [
            'transactions' => $transactions
        ]);
    }

    public function yearly(): Response
    {
        $transactions = Transaction::where('user_id', auth()->id())
            ->whereYear('transaction_date', now()->year)
            ->orderBy('transaction_date', 'desc')
            ->get();

        return Inertia::render('Transactions/Yearly', [
            'transactions' => $transactions
        ]);
    }
}
