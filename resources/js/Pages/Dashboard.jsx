import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TransactionSummary from '@/Components/TransactionSummary';
import TransactionCalendar from '@/Components/TransactionCalendar';
import TransactionList from '@/Components/TransactionList';
import FinancialChart from '@/Components/FinancialChart';
import ScatterChart from '@/Components/ScatterChart';

export default function Dashboard({ transactions }) {
    const hasTransactions = transactions && transactions.length > 0;

    return (
        <AuthenticatedLayout
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    {!hasTransactions ? (
                        <div className="overflow-hidden bg-white p-6 text-center shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                No transactions yet
                            </h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">
                                Start by adding your first transaction to see your financial summary.
                            </p>
                            <a
                                href={route('transactions.index')}
                                className="mt-4 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                            >
                                Add Transaction
                            </a>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                                <div className="p-6">
                                    <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">
                                        Financial Summary
                                    </h3>
                                    <TransactionSummary transactions={transactions} />
                                </div>
                            </div>

                            {/* <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                                <div className="p-6">
                                    <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">
                                        Transaction Distribution
                                    </h3>
                                    <ScatterChart transactions={transactions} />
                                </div>
                            </div> */}

                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                                <div className="p-6">
                                    <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">
                                        Financial Overview
                                    </h3>
                                    <FinancialChart transactions={transactions} />
                                </div>
                            </div>


                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                                <div className="p-6">
                                    <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">
                                        Recent Transactions
                                    </h3>
                                    <TransactionList transactions={transactions.slice(0, 5)} />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
