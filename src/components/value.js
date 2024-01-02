import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Countries } from '../resources/countries';
import { formatDate } from '../utils/helpers';

export function Value({ field, value }) {
  switch (field.type) {
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
    case 'date':
      return value ? <time dateTime={value}>{formatDate(value)}</time> : '';
    case 'datetime-local':
      return value ? <time dateTime={value}>{formatDate(value)}</time> : '';
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
