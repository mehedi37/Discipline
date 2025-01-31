import { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TransactionForm from '@/Components/TransactionForm';
import TransactionList from '@/Components/TransactionList';
import TransactionSummary from '@/Components/TransactionSummary';
import LoadingState from '@/Components/LoadingState';

export default function Index({ transactions }) {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <AuthenticatedLayout
        >
            <Head title="Add Transaction" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="overflow-hidden rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                Add New Transaction
                            </h3>
                            <TransactionForm setIsLoading={setIsLoading} />
                        </div>

                        <div className="overflow-hidden rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                Today's Summary
                            </h3>
                            <TransactionSummary transactions={transactions} />
                        </div>
                    </div>

                    {isLoading ? (
                        <LoadingState />
                    ) : (
                        <div className="mt-6">
                            <h3 className="mb-4 text-lg font-medium text-gray-900">
                                Recent Transactions
                            </h3>
                            <TransactionList transactions={transactions.slice(0, 5)} />
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
