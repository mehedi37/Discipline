import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TransactionList from '@/Components/TransactionList';
import TransactionSummary from '@/Components/TransactionSummary';
import TimeNavigation from '@/Components/TimeNavigation';
import TransactionCalendar from '@/Components/TransactionCalendar';
import ExportButton from '@/Components/ExportButton';

export default function Monthly({ transactions }) {
    console.log(transactions);
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Monthly Transactions
                    </h2>
                    <ExportButton transactions={transactions} period="monthly" />
                </div>
            }
        >
            <Head title="Monthly Transactions" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <TimeNavigation />

                    <div className="mt-6">
                        <TransactionSummary transactions={transactions} />
                    </div>

                    <div className="mt-6">
                    <TransactionCalendar transactions={transactions} viewType="month" />
                    </div>
                    <TransactionList transactions={transactions}/>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
