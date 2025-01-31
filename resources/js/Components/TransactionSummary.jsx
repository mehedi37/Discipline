export default function TransactionSummary({ transactions }) {
    const summary = transactions.reduce((acc, transaction) => {
        const amount = parseFloat(transaction.amount);
        if (transaction.type === 'income') {
            acc.income += amount;
        } else {
            acc.expense += Math.abs(amount);
        }
        acc.balance += amount;
        return acc;
    }, { income: 0, expense: 0, balance: 0 });

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-green-100 p-4 dark:bg-green-500/20">
                <h4 className="text-sm font-medium text-green-800 dark:text-green-200">Income</h4>
                <p className="mt-2 text-2xl font-semibold text-green-900 dark:text-green-100">
                    ${summary.income.toFixed(2)}
                </p>
            </div>
            <div className="rounded-lg bg-red-100 p-4 dark:bg-red-500/20">
                <h4 className="text-sm font-medium text-red-800 dark:text-red-200">Expense</h4>
                <p className="mt-2 text-2xl font-semibold text-red-900 dark:text-red-100">
                    ${summary.expense.toFixed(2)}
                </p>
            </div>
            <div className="rounded-lg bg-blue-100 p-4 dark:bg-blue-500/20">
                <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">Balance</h4>
                <p className="mt-2 text-2xl font-semibold text-blue-900 dark:text-blue-100">
                    ${summary.balance.toFixed(2)}
                </p>
            </div>
        </div>
    );
}
