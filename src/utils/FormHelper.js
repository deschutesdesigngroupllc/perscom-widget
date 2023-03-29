import React from 'react'
import { countries } from '../assets/js/countries'

/**
 * Returns the DOM element type for a given field
 *
 * @param field
 * @returns {string}
 */
export function domElementForField(field) {
  switch (field.type) {
    case 'code':
      return 'textarea'
    case 'country':
      return 'select'
    case 'select':
      return 'select'
    case 'textarea':
      return 'textarea'
    case 'timezone':
      return 'select'
    default:
      return 'input'
  }
}

/**
 * Returns the input type for a given field
 *
 * @param field
 * @returns {string}
 */
export function inputTypeForField(field) {
  switch (field.type) {
    case 'boolean':
      return 'checkbox'
    case 'datetime':
      return 'datetime-local'
    default:
      return field.type
  }
}

/**
 * Returns a list of CSS classes for the field
 *
 * @param field
 * @returns {string}
 */
export function classListForField(field) {
  switch (field.type) {
    case 'boolean':
      return 'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
    default:
      return 'block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
  }
}

/**
 *
 * @param field
 * @returns {unknown[]}
 */
export function childElementForField(field) {
  switch (field.type) {
    case 'select':
      return Array.from(field.options).map((value, key) => {
        return (
          <option key={key} name={key}>
            {value}
          </option>
        )
      })
    case 'country':
      return countries.map((country) => {
        return (
          <option key={country.code} name={country.code}>
            {country.name}
          </option>
        )
      })
    case 'timezone':
      var timezones = Intl.supportedValuesOf('timeZone')
      return timezones.map((timezone) => {
        return (
          <option key={timezone} name={timezone}>
            {timezone}
          </option>
        )
      })
    default:
      return null
  }
}
