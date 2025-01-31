import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function TransactionForm({ setIsLoading }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        amount: '',
        description: '',
        category: '',
        type: 'expense',
        transaction_date: new Date().toISOString().split('T')[0]
    });

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        post(route('transactions.store'), {
            onSuccess: () => {
                reset();
                setIsLoading(false);
            },
            onError: () => {
                setIsLoading(false);
            }
        });
    };

    return (
        <form onSubmit={submit} className="mt-6 space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <InputLabel htmlFor="type" value="Type" />
                    <select
                        id="type"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                        value={data.type}
                        onChange={e => setData('type', e.target.value)}
                    >
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>
                    <InputError message={errors.type} />
                </div>

                <div>
                    <InputLabel htmlFor="amount" value="Amount" />
                    <TextInput
                        id="amount"
                        type="number"
                        step="0.01"
                        className="mt-1 block w-full"
                        value={data.amount}
                        onChange={e => setData('amount', e.target.value)}
                        required
                    />
                    <InputError message={errors.amount} />
                </div>

                <div>
                    <InputLabel htmlFor="category" value="Category" />
                    <TextInput
                        id="category"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.category}
                        onChange={e => setData('category', e.target.value)}
                    />
                    <InputError message={errors.category} />
                </div>

                <div>
                    <InputLabel htmlFor="transaction_date" value="Date" />
                    <TextInput
                        id="transaction_date"
                        type="date"
                        className="mt-1 block w-full"
                        value={data.transaction_date}
                        onChange={e => setData('transaction_date', e.target.value)}
                        required
                    />
                    <InputError message={errors.transaction_date} />
                </div>
            </div>

            <div>
                <InputLabel htmlFor="description" value="Description" />
                <textarea
                    id="description"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    value={data.description}
                    onChange={e => setData('description', e.target.value)}
                    required
                />
                <InputError message={errors.description} />
            </div>

            <PrimaryButton disabled={processing}>Add Transaction</PrimaryButton>
        </form>
    );
}
