import React, { Fragment } from 'react';
import get from 'lodash/get';
import { Countries } from '../resources/countries';
import { Datepicker, FileInput, Select, Textarea, TextInput, ToggleSwitch } from 'flowbite-react';

export function Field(props) {
  const { field, formValues, setFormValues } = props;

  const handleChange = (e) => {
    console.log(e.target.id, e.target.value);
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  switch (field.type) {
    case 'boolean':
      return (
        <ToggleSwitch
          key={field.key}
          checked={get(formValues, field.key, false)}
          id={field.key}
          required={field.required}
          readOnly={field.readonly}
          value={get(formValues, field.key, false)}
          onChange={(value) => setFormValues({ ...formValues, [field.key]: value })}
        />
      );
    case 'color':
      return (
        <TextInput
          key={field.key}
          id={field.key}
          type="color"
          placeholder={field.placeholder}
          required={field.required}
          readOnly={field.readonly}
          helperText={<Fragment>{field.help}</Fragment>}
          value={get(formValues, field.key, '')}
          onChange={handleChange}
        />
      );
    case 'country':
      return (
        <Select
          key={field.key}
          id={field.key}
          required={field.required}
          readOnly={field.readonly}
          helperText={<Fragment>{field.help}</Fragment>}
          value={get(formValues, field.key, '')}
          onChange={handleChange}
        >
          <option disabled={true} value="">
            Choose an option
          </option>
          {Countries.map((country) => {
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
          type="date"
          placeholder={field.placeholder}
          required={field.required}
          readOnly={field.readonly}
          helperText={<Fragment>{field.help}</Fragment>}
          value={get(formValues, field.key, '')}
          onChange={handleChange}
        />
      );
    case 'datetime-local':
      return (
        <TextInput
          key={field.key}
          id={field.key}
          type="datetime-local"
          placeholder={field.placeholder}
          required={field.required}
          readOnly={field.readonly}
          helperText={<Fragment>{field.help}</Fragment>}
          value={get(formValues, field.key, '')}
          onChange={handleChange}
        />
      );
    case 'email':
      return (
        <TextInput
          key={field.key}
          id={field.key}
          type="email"
          placeholder={field.placeholder}
          required={field.required}
          readOnly={field.readonly}
          helperText={<Fragment>{field.help}</Fragment>}
          value={get(formValues, field.key, '')}
          onChange={handleChange}
        />
      );
    case 'file':
      return (
        <FileInput
          key={field.key}
          id={field.key}
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
          type="number"
          placeholder={field.placeholder}
          required={field.required}
          readOnly={field.readonly}
          helperText={<Fragment>{field.help}</Fragment>}
          value={get(formValues, field.key, '')}
          onChange={handleChange}
        />
      );
    case 'password':
      return (
        <TextInput
          key={field.key}
          id={field.key}
          type="password"
          placeholder={field.placeholder}
          required={field.required}
          readOnly={field.readonly}
          helperText={<Fragment>{field.help}</Fragment>}
          value={get(formValues, field.key, '')}
          onChange={handleChange}
        />
      );
    case 'code':
    case 'textarea':
      return (
        <Textarea
          key={field.key}
          id={field.key}
          placeholder={field.placeholder}
          required={field.required}
          readOnly={field.readonly}
          helperText={<Fragment>{field.help}</Fragment>}
          value={get(formValues, field.key, '')}
          rows={4}
          onChange={handleChange}
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
          placeholder={field.placeholder}
          required={field.required}
          readOnly={field.readonly}
          helperText={<Fragment>{field.help}</Fragment>}
          value={get(formValues, field.key, '')}
          onChange={handleChange}
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
          placeholder={field.placeholder}
          required={field.required}
          readOnly={field.readonly}
          helperText={<Fragment>{field.help}</Fragment>}
          value={get(formValues, field.key, '')}
          onSelect={handleChange}
        >
          <option disabled={true} value="">
            Choose an option
          </option>
          {timezones.map((timezone) => {
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
          placeholder={field.placeholder}
          required={field.required}
          readOnly={field.readonly}
          helperText={<Fragment>{field.help}</Fragment>}
          value={get(formValues, field.key, '')}
          onChange={handleChange}
        />
      );
  }
}
