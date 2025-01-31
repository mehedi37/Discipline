import { Scatter } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    TimeScale,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
    LinearScale,
    PointElement,
    TimeScale,
    Title,
    Tooltip,
    Legend
);

export default function ScatterChart({ transactions }) {
    const scatterData = transactions.map(transaction => ({
        x: new Date(transaction.transaction_date).getTime(),
        y: transaction.type === 'income' ?
            parseFloat(transaction.amount) :
            -Math.abs(parseFloat(transaction.amount))
    }));

    const data = {
        datasets: [{
            label: 'Transactions',
            data: scatterData,
            backgroundColor: (context) => {
                const value = context.raw?.y || 0;
                return value >= 0 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)';
            },
            pointRadius: 6
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const point = context.raw;
                        const date = new Date(point.x).toLocaleDateString();
                        return `${date}: $${Math.abs(point.y).toFixed(2)} (${point.y >= 0 ? 'Income' : 'Expense'})`;
                    }
                }
            }
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    displayFormats: {
                        day: 'MMM d'
                    }
                },
                title: {
                    display: true,
                    text: 'Date'
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Amount ($)'
                },
                ticks: {
                    callback: (value) => `$${Math.abs(value)}`
                }
            }
        }
    };

    return (
        <div className="w-full p-4 dark:bg-gray-800">
            <Scatter options={options} data={data} />
        </div>
    );
}
