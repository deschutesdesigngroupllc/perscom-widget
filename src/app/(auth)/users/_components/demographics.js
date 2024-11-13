'use client';

import { Card } from '@/components/card';
import { Status } from '@/components/status';
import { DateHelper } from '@/lib/date';
import { useSearchParams } from 'next/navigation';

export function Demographics({ user }) {
  const { name, created_at, updated_at, last_seen_at, online } = user;

  const searchParams = useSearchParams();
  const timezone = searchParams.get('timezone') ?? 'UTC';

  const createdAt = new DateHelper(created_at, timezone);
  const updatedAt = new DateHelper(updated_at, timezone);
  const lastSeenAt = new DateHelper(last_seen_at, timezone);

  return (
    <Card className="w-full justify-start p-4 sm:p-6 md:w-2/3">
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-bold tracking-tight text-gray-950 dark:text-white">
          Demographics
        </h5>
        {online ? (
          <Status text={'Online'} color={'#16a34a'} />
        ) : (
          <Status text={'Offline'} color={'#0284c7'} />
        )}
      </div>
      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          <li className="py-2">
            <p className="truncate text-xs font-semibold text-gray-950 dark:text-white">Name</p>
            <p className="truncate text-xs text-gray-700 dark:text-gray-400">{name}</p>
          </li>
          <li className="py-2">
            <p className="truncate text-xs font-semibold text-gray-950 dark:text-white">
              Joined At
            </p>
            <p className="truncate text-xs text-gray-700 dark:text-gray-400">
              {createdAt.toHtml()}
            </p>
          </li>
          <li className="py-2">
            <p className="truncate text-xs font-semibold text-gray-950 dark:text-white">
              Last Updated At
            </p>
            <p className="truncate text-xs text-gray-700 dark:text-gray-400">
              {updatedAt.toHtml()}
            </p>
          </li>
          <li className="py-2">
            <p className="truncate text-xs font-semibold text-gray-950 dark:text-white">
              Last Online At
            </p>
            <p className="truncate text-xs text-gray-700 dark:text-gray-400">
              {lastSeenAt.toHtml()}
            </p>
          </li>
        </ul>
      </div>
    </Card>
  );
}
