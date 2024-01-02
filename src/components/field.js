import { FileInput, Select, Textarea, TextInput, ToggleSwitch } from 'flowbite-react';
import get from 'lodash/get';
import { useState } from 'react';
import { Countries } from '../resources/countries';

export function Field({ field }) {
  const [toggleValues, setToggleValues] = useState({});

  const handleToggle = (key, value) => {
    setToggleValues({ ...toggleValues, [key]: value });
  };

  switch (field.type) {
    case 'boolean':
      return (
        <ToggleSwitch
          key={field.key}
          checked={get(toggleValues, field.key, false)}
          id={field.key}
          name={field.key}
          required={field.required}
          readOnly={field.readonly}
          onChange={(checked) => handleToggle(field.key, checked)}
        />
      );
    case 'color':
      return (
        <TextInput
          key={field.key}
          id={field.key}
          name={field.key}
          type="color"
          placeholder={field.placeholder}
          required={field.required}
          readOnly={field.readonly}
          helperText={field.help}
        />
      );
    case 'country':
      return (
        <Select
          key={field.key}
          id={field.key}
          name={field.key}
          required={field.required}
          readOnly={field.readonly}
          helperText={field.help}
        >
          <option disabled={true} value="">
            Choose an option
          </option>
          {!!Countries.length &&
            Countries.map((country) => {
              return (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              );
            })}
        </Select>
      );
    case 'date':
      return (
        <TextInput
          key={field.key}
          id={field.key}
          name={field.key}
          type="date"
          placeholder={field.placeholder}
          required={field.required}
          readOnly={field.readonly}
          helperText={field.help}
        />
      );
    case 'datetime-local':
      return (
        <TextInput
          key={field.key}
          id={field.key}
          name={field.key}
          type="datetime-local"
          placeholder={field.placeholder}
          required={field.required}
          readOnly={field.readonly}
          helperText={field.help}
        />
      );
    case 'email':
      return (
        <TextInput
          key={field.key}
          id={field.key}
          name={field.key}
          type="email"
          placeholder={field.placeholder}
          required={field.required}
          readOnly={field.readonly}
          helperText={field.help}
        />
      );
    case 'file':
      return (
        <FileInput
          key={field.key}
          id={field.key}
          name={field.key}
          placeholder={field.placeholder}
          required={field.required}
          readOnly={field.readonly}
        />
      );
    case 'number':
      return (
        <TextInput
          key={field.key}
          id={field.key}
          name={field.key}
          type="number"
          placeholder={field.placeholder}
          required={field.required}
          readOnly={field.readonly}
          helperText={field.help}
        />
      );
    case 'password':
      return (
        <TextInput
          key={field.key}
          id={field.key}
          name={field.key}
          type="password"
          autoComplete="current-password"
          placeholder={field.placeholder}
          required={field.required}
          readOnly={field.readonly}
          helperText={field.help}
        />
      );
    case 'code':
    case 'textarea':
      return (
        <Textarea
          key={field.key}
          id={field.key}
          name={field.key}
          placeholder={field.placeholder}
          required={field.required}
          readOnly={field.readonly}
          helperText={field.help}
          rows={4}
        />
      );
    case 'select': {
      const options = Object.entries(field.options).map(([key, value]) => ({
        key: key,
        value: value
      }));

      return (
        <Select
          key={field.key}
          id={field.key}
          name={field.key}
          placeholder={field.placeholder}
          required={field.required}
          readOnly={field.readonly}
          helperText={field.help}
        >
          <option disabled={true} value="">
            Choose an option
          </option>
          {!!options &&
            !!options.length &&
            options.map((option) => {
              return (
                <option key={option.key} name={option.key}>
                  {option.value}
                </option>
              );
            })}
        </Select>
      );
    }
    case 'timezone':
      const timezones = Intl.supportedValuesOf('timeZone');

      return (
        <Select
          key={field.key}
          id={field.key}
          name={field.key}
          placeholder={field.placeholder}
          required={field.required}
          readOnly={field.readonly}
          helperText={field.help}
        >
          <option disabled={true} value="">
            Choose an option
          </option>
          {!!timezones.length &&
            timezones.map((timezone) => {
              return (
                <option key={timezone} value={timezone}>
                  {timezone}
                </option>
              );
            })}
        </Select>
      );
    default:
      return (
        <TextInput
          key={field.key}
          id={field.key}
          name={field.key}
          placeholder={field.placeholder}
          required={field.required}
          readOnly={field.readonly}
          helperText={field.help}
        />
      );
  }
}
