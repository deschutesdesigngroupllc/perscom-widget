import React from 'react'
import { countries } from '../assets/js/countries'
import { FileInput, Select, Textarea, TextInput, ToggleSwitch } from 'flowbite-react'

/**
 * Returns the component for the PERSCOM field object
 *
 * @param field
 * @param fieldObject
 * @returns {JSX.Element}
 */
export function componentForField(field, fieldObject) {
  switch (field.type) {
    case 'boolean':
      return (
        <ToggleSwitch
          id={field.key}
          type={field.type}
          placeholder={field.placeholder}
          required={field.required}
          readOnly={field.readonly}
          fieldstate={fieldObject.fieldState}
          formstate={fieldObject.formState}
          onChange={(state) => console.log(state)}
        />
      )
    case 'country':
      return (
        <Select
          id={field.key}
          type={field.type}
          placeholder={field.placeholder}
          required={field.required}
          readOnly={field.readonly}
          helperText={<React.Fragment>{field.help}</React.Fragment>}
          fieldstate={fieldObject.fieldState}
          formstate={fieldObject.formState}
        >
          {countries.map((country) => {
            return (
              <option key={country.code} name={country.code}>
                {country.name}
              </option>
            )
          })}
        </Select>
      )
    case 'file':
      return (
        <FileInput
          id={field.key}
          type={field.type}
          placeholder={field.placeholder}
          required={field.required}
          readOnly={field.readonly}
          fieldstate={fieldObject.fieldState}
          formstate={fieldObject.formState}
        />
      )
    case 'code':
    case 'textarea':
      return (
        <Textarea
          id={field.key}
          type={field.type}
          placeholder={field.placeholder}
          required={field.required}
          readOnly={field.readonly}
          helperText={<React.Fragment>{field.help}</React.Fragment>}
          fieldstate={fieldObject.fieldState}
          formstate={fieldObject.formState}
          rows={4}
        />
      )
    case 'select':
      return (
        <Select
          id={field.key}
          type={field.type}
          placeholder={field.placeholder}
          required={field.required}
          readOnly={field.readonly}
          helperText={<React.Fragment>{field.help}</React.Fragment>}
          fieldstate={fieldObject.fieldState}
          formstate={fieldObject.formState}
        >
          {!!field.options &&
            !!field.options.length &&
            field.options.map((value, key) => {
              return (
                <option key={key} name={key}>
                  {value}
                </option>
              )
            })}
        </Select>
      )
    case 'timezone':
      var timezones = Intl.supportedValuesOf('timeZone')

      return (
        <Select
          id={field.key}
          type={field.type}
          placeholder={field.placeholder}
          required={field.required}
          readOnly={field.readonly}
          helperText={<React.Fragment>{field.help}</React.Fragment>}
          fieldstate={fieldObject.fieldState}
          formstate={fieldObject.formState}
        >
          {timezones.map((timezone) => {
            return (
              <option key={timezone} name={timezone}>
                {timezone}
              </option>
            )
          })}
        </Select>
      )
    default:
      return (
        <TextInput
          id={field.key}
          type={field.type}
          placeholder={field.placeholder}
          required={field.required}
          readOnly={field.readonly}
          helperText={<React.Fragment>{field.help}</React.Fragment>}
          fieldstate={fieldObject.fieldState}
          formstate={fieldObject.formState}
        />
      )
  }
}
