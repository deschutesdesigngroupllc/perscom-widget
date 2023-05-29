import React from 'react'
import { countries } from '../assets/js/countries'
import { FileInput, Select, Textarea, TextInput, ToggleSwitch } from 'flowbite-react'
import PropTypes from 'prop-types'

export const Field = React.forwardRef(({ field, fieldObject }, ref) => {
  const { onChange, value } = field

  switch (fieldObject.type) {
    case 'boolean':
      return (
        <ToggleSwitch
          checked={value}
          ref={ref}
          id={fieldObject.key}
          type={fieldObject.type}
          placeholder={fieldObject.placeholder}
          required={fieldObject.required}
          readOnly={fieldObject.readonly}
          value={value}
          onChange={onChange}
        />
      )
    case 'country':
      return (
        <Select
          ref={ref}
          id={fieldObject.key}
          type={fieldObject.type}
          placeholder={fieldObject.placeholder}
          required={fieldObject.required}
          readOnly={fieldObject.readonly}
          helperText={<React.Fragment>{fieldObject.help}</React.Fragment>}
          {...field}
        >
          <option disabled={true} value=''>
            Choose an option
          </option>
          {countries.map((country) => {
            return (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            )
          })}
        </Select>
      )
    case 'file':
      return (
        <FileInput
          ref={ref}
          id={fieldObject.key}
          type={fieldObject.type}
          placeholder={fieldObject.placeholder}
          required={fieldObject.required}
          readOnly={fieldObject.readonly}
          {...field}
        />
      )
    case 'code':
    case 'textarea':
      return (
        <Textarea
          ref={ref}
          id={fieldObject.key}
          type={fieldObject.type}
          placeholder={fieldObject.placeholder}
          readOnly={fieldObject.readonly}
          helperText={<React.Fragment>{fieldObject.help}</React.Fragment>}
          rows={4}
          {...field}
        />
      )
    case 'select':
      return (
        <Select
          ref={ref}
          id={fieldObject.key}
          type={fieldObject.type}
          placeholder={fieldObject.placeholder}
          required={fieldObject.required}
          readOnly={fieldObject.readonly}
          helperText={<React.Fragment>{fieldObject.help}</React.Fragment>}
          {...field}
        >
          <option disabled={true} value=''>
            Choose an option
          </option>
          {!!fieldObject.options &&
            !!fieldObject.options.length &&
            fieldObject.options.map((value, key) => {
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
          ref={ref}
          id={fieldObject.key}
          type={fieldObject.type}
          placeholder={fieldObject.placeholder}
          required={fieldObject.required}
          readOnly={fieldObject.readonly}
          helperText={<React.Fragment>{fieldObject.help}</React.Fragment>}
          {...field}
        >
          <option disabled={true} value=''>
            Choose an option
          </option>
          {timezones.map((timezone) => {
            return (
              <option key={timezone} value={timezone}>
                {timezone}
              </option>
            )
          })}
        </Select>
      )
    default:
      return (
        <TextInput
          ref={ref}
          id={fieldObject.key}
          type={fieldObject.type}
          placeholder={fieldObject.placeholder}
          required={fieldObject.required}
          readOnly={fieldObject.readonly}
          helperText={<React.Fragment>{fieldObject.help}</React.Fragment>}
          {...field}
        />
      )
  }
})

Field.displayName = 'Field'

Field.propTypes = {
  field: PropTypes.object,
  fieldObject: PropTypes.object
}
