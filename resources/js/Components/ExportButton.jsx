export default function ExportButton({ transactions, period }) {
    const exportTransactions = () => {
        const csvContent = "data:text/csv;charset=utf-8,"
            + "Date,Category,Description,Amount,Type\n"
            + transactions.map(t => [
                t.transaction_date,
                t.category || '',
                t.description,
                Math.abs(t.amount),
                t.type
            ].join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${period}_transactions.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button
            onClick={exportTransactions}
            className="rounded-md bg-green-500 px-4 py-2 text-sm text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
        >
            Export CSV
        </button>
    );
}
