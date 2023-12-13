import { formatDate } from '../utils/helpers';
import { Countries } from '../resources/countries';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

export function Value({ field, value }) {
  switch (field.type) {
    case 'boolean':
      return value ? 'Yes' : 'No';
    case 'code':
      return <SyntaxHighlighter showLineNumbers={true}>{value}</SyntaxHighlighter>;
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
