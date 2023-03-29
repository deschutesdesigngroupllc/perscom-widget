import * as Sentry from '@sentry/react'
import React, { useState } from 'react'
import useQuery from '../api/APIUtils'
import { Error } from '../components/Error'
import { Loading } from '../components/Loading'
import { config } from '../constants'
import { useParams } from 'react-router-dom'
import { ChevronLeftIcon } from '@heroicons/react/20/solid'
import { Link } from '../components/Link'
import { classListForField, domElementForField, inputTypeForField, childElementForField } from '../utils/FormHelper'

function Form() {
  const { id } = useParams()
  const [url] = useState(config.forms.API_URL)
  const [values, setValues] = useState({})

  const { data, loading, error } = useQuery({
    url: new URL(id, url).href
  })

  const onChange = (event) => {
    const key = event.target.id
    const value = event.target.value
    setValues((values) => ({
      ...values,
      [key]: value
    }))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    useQuery({
      url: new URL(id, url).href,
      method: 'POST',
      requestBody: values
    })
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {error && <Error error={error} />}
          <div className='flex flex-col space-y-4'>
            <div className='flex flex-row items-center justify-start space-x-1 text-gray-500 hover:text-gray-700 active:text-blue-600'>
              <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
              <Link href={'/forms'} className='text-sm'>
                Back to Forms
              </Link>
            </div>
            {data && renderForm(data, onChange, onSubmit)}
          </div>
        </>
      )}
    </>
  )
}

function renderForm(form, onChange, onSubmit) {
  const { name, fields, instructions } = form

  return (
    <div className='divide-y divide-gray-300 flex flex-col flex-grow overflow-hidden ring-1 ring-black ring-opacity-5 rounded-lg bg-white shadow min-h-full text-sm'>
      <div className='px-3 py-3.5 bg-gray-50'>
        <div className='flex justify-between items-center'>
          <div className='font-semibold text-gray-900'>{name}</div>
        </div>
      </div>
      <div className='px-3'>
        <form onSubmit={onSubmit} className='mb-0'>
          <div className='space-y-12 sm:space-y-16'>
            <div className='space-y-8 py-4 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:py-0'>
              {instructions && <div className='text-sm text-gray-600 pt-4 sm:py-8'>{instructions}</div>}
              {fields &&
                !!fields.length &&
                fields.map((field) => {
                  return (
                    <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6' key={field.id}>
                      <label htmlFor={field.key} className='block text-sm font-bold leading-6 text-gray-900 sm:pt-1.5'>
                        {field.name}
                      </label>
                      <div className='mt-2 sm:col-span-2 sm:mt-0'>
                        <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
                          {React.createElement(
                            domElementForField(field),
                            {
                              type: inputTypeForField(field),
                              name: field.key,
                              id: field.key,
                              className: classListForField(field),
                              placeholder: field.placeholder ?? '',
                              readOnly: field.readonly,
                              required: field.required,
                              onChange: onChange
                            },
                            childElementForField(field)
                          )}
                        </div>
                        {field.help && <p className='mt-1 text-sm text-gray-400'>{field.help}</p>}
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
          <div className='flex items-center justify-end gap-x-6 border-t border-gray-900/10 py-4 px-4 sm:px-8'>
            <button type='button' className='text-sm font-semibold leading-6 text-gray-900'>
              Cancel
            </button>
            <button
              type='submit'
              className='rounded-md bg-blue-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Sentry.withProfiler(Form)
