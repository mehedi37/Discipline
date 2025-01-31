import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function FinancialChart({ transactions }) {
    // Get the first transaction's date to determine month and year
    const firstTransaction = transactions[0];
    const currentDate = firstTransaction
        ? new Date(firstTransaction.transaction_date)
        : new Date();

    const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDate();

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const monthName = monthNames[currentDate.getMonth()];
    const year = currentDate.getFullYear();

    // Group transactions by day
    const dailyData = transactions.reduce((acc, transaction) => {
        const date = new Date(transaction.transaction_date);
        const day = date.getDate();

        if (!acc[day]) {
            acc[day] = { income: 0, expense: 0 };
        }

        const amount = Math.abs(parseFloat(transaction.amount));
        if (transaction.type === 'income') {
            acc[day].income += amount;
        } else {
            acc[day].expense += amount;
        }

        return acc;
    }, {});

    const labels = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const data = {
        labels,
        datasets: [
            {
                label: 'Income',
                data: labels.map(day => dailyData[day]?.income || 0),
                backgroundColor: 'rgb(34, 197, 94)',
                borderColor: 'rgb(21, 128, 61)',
                borderWidth: 1
            },
            {
                label: 'Expenses',
                data: labels.map(day => dailyData[day]?.expense || 0),
                backgroundColor: 'rgb(239, 68, 68)',
                borderColor: 'rgb(220, 38, 38)',
                borderWidth: 1
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#9CA3AF'
                }
            },
            title: {
                display: true,
                text: `Daily Income vs Expenses - ${monthName} ${year}`,
                color: '#9CA3AF'
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.dataset.label;
                        const value = context.parsed.y;
                        return `${label}: $${value.toFixed(2)}`;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: `${monthName}`,
                    color: '#9CA3AF'
                },
                ticks: {
                    color: '#9CA3AF'
                },
                grid: {
                    color: '#374151'
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Amount ($)',
                    color: '#9CA3AF'
                },
                ticks: {
                    color: '#9CA3AF',
                    callback: (value) => `$${value}`
                },
                grid: {
                    color: '#374151'
                }
            }
        }
    };

    return (
        <div className="w-full p-4">
            <Bar options={options} data={data} />
        </div>
    );
}
