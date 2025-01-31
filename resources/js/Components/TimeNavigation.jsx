import { Link } from '@inertiajs/react';

export default function TimeNavigation() {
    const navItems = [
        { name: 'Daily', route: 'transactions.daily' },
        { name: 'Weekly', route: 'transactions.weekly' },
        { name: 'Monthly', route: 'transactions.monthly' },
        { name: 'Yearly', route: 'transactions.yearly' },
    ];

    return (
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={route(item.route)}
                        className={`${
                            route().current(item.route)
                                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                        } whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium`}
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>
        </div>
    );
}
