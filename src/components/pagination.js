'use client';

import { Pagination as FlowbitePagination } from 'flowbite-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function Pagination({ meta }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const onPageChange = (page) => {
    const current = new URLSearchParams(searchParams);
    current.set('page', page);

    router.push(`${pathname}?${current.toString()}`);
  };

  return (
    <>
      {meta.current_page && meta?.last_page && meta?.last_page > 1 && (
        <FlowbitePagination
          theme={{
            base: 'dark:bg-gray-700 bg-gray-50 rounded-b-md',
            pages: {
              base: 'inline-flex items-center justify-center -space-x-px w-full',
              previous: {
                base: 'ml-0 py-3 px-3 leading-tight text-gray-500 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              },
              next: {
                base: 'py-3 px-3 leading-tight text-gray-500 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              },
              selector: {
                base: 'w-12 py-3 leading-tight text-gray-500 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              }
            }
          }}
          showIcons
          currentPage={meta.current_page}
          onPageChange={onPageChange}
          totalPages={meta.last_page}
        />
      )}
    </>
  );
}
