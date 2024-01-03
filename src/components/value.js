'use client';

import dayjs from 'dayjs';
import timezonePlugin from 'dayjs/plugin/timezone';
import utcPlugin from 'dayjs/plugin/utc';
import { useSearchParams } from 'next/navigation';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Countries } from '../resources/countries';

export function Value({ field, value }) {
  const searchParams = useSearchParams();

  dayjs.extend(utcPlugin);
  dayjs.extend(timezonePlugin);
  dayjs.tz.setDefault(searchParams.get('timezone') ?? 'UTC');

  switch (String(field.type).toLowerCase()) {
    case 'boolean':
      return value ? 'Yes' : 'No';
    case 'code':
      return (
        <SyntaxHighlighter
          codeTagProps={{
            style: {
              textShadow: 'none'
            }
          }}
          customStyle={{
            textShadow: 'none'
          }}
          className="rounded !bg-gray-50 !font-sans !text-sm !text-gray-500 ring-1 ring-gray-200 dark:!bg-gray-700 dark:!text-gray-300 dark:ring-gray-900"
          showLineNumbers={true}
        >
          {value}
        </SyntaxHighlighter>
      );
    case 'color':
      return <input type="color" value={value} readOnly={true} disabled={true} />;
    case 'country':
      const country = Countries.find((country) => country.code === value);
      return country?.name ?? '';
    case 'date': {
      const date = value ? dayjs(value).tz(searchParams.get('timezone') ?? 'UTC') : null;

      return date ? (
        <time dateTime={date.format('YYYY-MM-DD')}>{date.format('dddd, MMM D, YYYY')}</time>
      ) : (
        ''
      );
    }
    case 'datetime-local': {
      const date = value ? dayjs(value).tz(searchParams.get('timezone') ?? 'UTC') : null;

      return date ? (
        <time dateTime={date.format('YYYY-MM-DD HH:mm:ss')}>
          {date.format('dddd, MMM D, YYYY hh:mm A')}
        </time>
      ) : (
        ''
      );
    }
    case 'email':
      return (
        <a className="underline" href={`mailto:${value}`}>
          {value}
        </a>
      );
    case 'password':
      return '******';
    default:
      return value;
  }
}
