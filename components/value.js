import { formatDate } from '../utils/helpers';
import { Countries } from '../resources/countries';

export function Value({ field, value }) {
  switch (field.type) {
    case 'boolean':
      return value ? 'Yes' : 'No';
    case 'code':
      return <code>{value}</code>;
    case 'country':
      const country = Countries.find((country) => country.code === value);
      return country.name ?? '';
    case 'date':
      return formatDate(value);
    case 'datetime-local':
      return formatDate(value);
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
