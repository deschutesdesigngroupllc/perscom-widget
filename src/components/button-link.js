'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export function ButtonLink(props) {
  const params = useSearchParams();

  return (
    <Link
      href={{ pathname: props.href, search: params?.toString() }}
      type="button"
      className="group relative flex items-center justify-center rounded-lg border border-gray-200 bg-white p-0.5 text-center font-medium text-gray-950 hover:bg-gray-50 focus:z-10 focus:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 dark:border-gray-600 dark:bg-transparent dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    >
      <span className="flex items-center rounded-md px-4 py-2 text-xs transition-all duration-200">
        {props.children}
      </span>
    </Link>
  );
}
