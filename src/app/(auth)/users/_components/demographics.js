'use client';

import dayjs from 'dayjs';
import timezonePlugin from 'dayjs/plugin/timezone';
import utcPlugin from 'dayjs/plugin/utc';
import { useSearchParams } from 'next/navigation';
import { Card } from '../../../../components/card';

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
        <h5 className="text-xl font-bold tracking-tight">Demographics</h5>
        {online ? (
          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-600">
            Online
          </span>
        ) : (
          <span className="inline-flex rounded-full bg-sky-100 px-2 text-xs font-semibold leading-5 text-sky-600">
            Offline
          </span>
        )}
      </div>
      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          <li className="py-2">
            <p className="truncate text-sm font-semibold">Name</p>
            <p className="truncate text-sm">{name}</p>
          </li>
          <li className="py-2">
            <p className="truncate text-sm font-semibold">Joined At</p>
            <p className="truncate text-sm">
              <time dateTime={createdAt.format('YYYY-MM-DD')}>
                {createdAt.format('dddd, MMM D, YYYY')}
              </time>
            </p>
          </li>
          <li className="py-2">
            <p className="truncate text-sm font-semibold">Last Updated At</p>
            <p className="truncate text-sm">
              <time dateTime={updatedAt.format('YYYY-MM-DD')}>
                {updatedAt.format('dddd, MMM D, YYYY')}
              </time>
            </p>
          </li>
          <li className="py-2">
            <p className="truncate text-sm font-semibold">Last Online At</p>
            <p className="truncate text-sm">
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
