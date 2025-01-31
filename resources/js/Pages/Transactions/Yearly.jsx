import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TransactionList from '@/Components/TransactionList';
import TransactionSummary from '@/Components/TransactionSummary';
import TimeNavigation from '@/Components/TimeNavigation';
import TransactionCalendar from '@/Components/TransactionCalendar';
import ExportButton from '@/Components/ExportButton';

export default function Yearly({ transactions }) {
    return (
        <AuthenticatedLayout
            header={
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Yearly Transactions
                </h2>
                <ExportButton transactions={transactions} period="yearly" />
            </div>
            }
        >
            <Head title="Yearly Transactions" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <TimeNavigation />

                    <div className="mt-6">
                        <TransactionSummary transactions={transactions} />
                    </div>

                    <div className="mt-6">
                    <TransactionCalendar transactions={transactions} viewType="year" />
                    </div>
                        <TransactionList transactions={transactions}/>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
