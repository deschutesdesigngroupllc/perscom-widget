'use client';

import { DateHelper } from '@/lib/date';
import { Countries } from '@/resources/countries';
import { useSearchParams } from 'next/navigation';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

export function Value({ field, value }) {
  const searchParams = useSearchParams();
  const timezone = searchParams.get('timezone') ?? 'UTC';

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
      if (!value) {
        return '';
      }

      const date = new DateHelper(value, timezone);

      return date.toHtml();
    }
    case 'datetime-local': {
      if (!value) {
        return '';
      }

      const date = new DateHelper(value, timezone);

      return date.toHtml('YYYY-MM-DD HH:mm:ss', 'dddd, MMM D, YYYY hh:mm A');
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
