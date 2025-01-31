import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

export default function TransactionCalendar({ transactions, viewType = 'month' }) {
    const events = transactions.map(transaction => ({
        title: `${transaction.type === 'income' ? '+' : '-'}$${Math.abs(transaction.amount)} - ${transaction.description}`,
        date: transaction.transaction_date,
        backgroundColor: transaction.type === 'income' ? '#10B981' : '#EF4444',
        borderColor: transaction.type === 'income' ? '#059669' : '#DC2626',
        classNames: ['cursor-pointer'],
        extendedProps: {
            category: transaction.category
        }
    }));

    const viewConfigs = {
        week: {
            initialView: 'timeGridWeek',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'timeGridWeek,listWeek'
            }
        },
        month: {
            initialView: 'dayGridMonth',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,listMonth'
            }
        },
        year: {
            initialView: 'dayGridYear',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridYear,listYear'
            }
        }
    };

    return (
        <div className="rounded-lg bg-slate-900 p-4 shadow-sm dark:bg-dark dark:text-white">
            <style>{`
                .fc-col-header {
                    background-color: #1f2937 !important;
                }

                .fc-daygrid-day-number {
                    color: white !important;
                }

                .fc-theme-standard .fc-list-day-cushion {
                    background-color: #1f2937 !important;
                }

                .fc .fc-list-event:hover td {
                    background-color: #374151 !important;
                }

                .fc-theme-standard .fc-list {
                    border-color: #374151 !important;
                }

                .fc-theme-standard td,
                .fc-theme-standard th,
                .fc-theme-standard .fc-scrollgrid {
                    border-color: #374151 !important;
                }
            `}</style>

            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
                {...viewConfigs[viewType]}
                events={events}
                height="auto"
                contentHeight="auto"
            />
        </div>
    );
}
