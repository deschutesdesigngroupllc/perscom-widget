'use client';

import dayjs from 'dayjs';
import timezonePlugin from 'dayjs/plugin/timezone';
import utcPlugin from 'dayjs/plugin/utc';
import { useSearchParams } from 'next/navigation';
import { Card } from '../../../../components/card';
import { Status } from '../../../../components/status';

export function Demographics({ user }) {
  const { name, created_at, updated_at, last_seen_at, online } = user;

  const searchParams = useSearchParams();

  dayjs.extend(utcPlugin);
  dayjs.extend(timezonePlugin);
  dayjs.tz.setDefault(searchParams.get('timezone') ?? 'UTC');

  const createdAt = dayjs(created_at).tz(searchParams.get('timezone') ?? 'UTC');
  const updatedAt = dayjs(updated_at).tz(searchParams.get('timezone') ?? 'UTC');
  const lastSeenAt = dayjs(last_seen_at).tz(searchParams.get('timezone') ?? 'UTC');

  return (
    <Card className="w-full justify-start p-6 md:w-2/3">
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
              <time dateTime={createdAt.format('YYYY-MM-DD')}>
                {createdAt.format('dddd, MMM D, YYYY')}
              </time>
            </p>
          </li>
          <li className="py-2">
            <p className="truncate text-xs font-semibold text-gray-950 dark:text-white">
              Last Updated At
            </p>
            <p className="truncate text-xs text-gray-700 dark:text-gray-400">
              <time dateTime={updatedAt.format('YYYY-MM-DD')}>
                {updatedAt.format('dddd, MMM D, YYYY')}
              </time>
            </p>
          </li>
          <li className="py-2">
            <p className="truncate text-xs font-semibold text-gray-950 dark:text-white">
              Last Online At
            </p>
            <p className="truncate text-xs text-gray-700 dark:text-gray-400">
              <time dateTime={lastSeenAt.format('YYYY-MM-DD')}>
                {lastSeenAt.format('dddd, MMM D, YYYY')}
              </time>
            </p>
          </li>
        </ul>
      </div>
    </Card>
  );
}
