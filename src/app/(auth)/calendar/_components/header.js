'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

export function Header({ currentMonth, previousMonth, goToToday, nextMonth }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-600 lg:flex-none">
      <div className="text-xs font-bold uppercase text-gray-950 dark:text-white">
        <time dateTime={currentMonth.format('YYYY-MM')}>{currentMonth.format('MMMM YYYY')}</time>
      </div>
      <div className="flex items-center">
        <div className="relative flex items-center rounded-md bg-white shadow-sm dark:bg-gray-800 md:items-stretch">
          <button
            type="button"
            className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative dark:border-gray-900 dark:text-gray-400 dark:hover:text-gray-500 md:w-9 md:pr-0 md:hover:bg-gray-50 md:dark:hover:bg-gray-900"
            onClick={() => previousMonth()}
          >
            <span className="sr-only">Previous month</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-950 hover:bg-gray-50 focus:relative dark:border-gray-900 dark:text-white dark:hover:bg-gray-900 md:block"
            onClick={() => goToToday()}
          >
            Today
          </button>
          <span className="relative -mx-px h-5 w-px bg-gray-300 dark:bg-[#090901] md:hidden" />
          <button
            type="button"
            className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative dark:border-gray-900 dark:text-gray-400 dark:hover:text-gray-500 md:w-9 md:pl-0 md:hover:bg-gray-50 md:dark:hover:bg-gray-900"
            onClick={() => nextMonth()}
          >
            <span className="sr-only">Next month</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
