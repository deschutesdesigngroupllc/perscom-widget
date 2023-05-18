import * as Sentry from '@sentry/react'
import React, { useState } from 'react'
import useQuery from '../api/APIUtils'
import { Alert } from '../components/Alert'
import { Button, Label } from 'flowbite-react'
import { ChevronLeftIcon } from '@heroicons/react/20/solid'
import { Controller, useForm } from 'react-hook-form'
import { Link } from '../components/Link'
import { Loading } from '../components/Loading'
import { config } from '../constants'
import { useParams } from 'react-router-dom'
import { componentForField } from '../utils/FormHelper'

function Form() {
  const { id } = useParams()
  const [url] = useState(config.forms.API_URL)

  const { data, loading, error } = useQuery({
    url: new URL(id, url).href
  })

  const { control, handleSubmit } = useForm()
  const onSubmit = (data) => console.log(data)

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {error ? (
            <Alert message={error} type='danger' />
          ) : (
            <div className='flex flex-col space-y-4'>
              <div className='flex flex-row items-center justify-start space-x-1 text-gray-500 hover:text-gray-700 active:text-blue-600'>
                <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
                <Link href={'/forms'} className='text-sm'>
                  Back to Forms
                </Link>
              </div>
              {data && renderForm(data, control, handleSubmit, onSubmit)}
            </div>
          )}
        </>
      )}
    </>
  )
}

function renderForm(form, control, handleSubmit, onSubmit) {
  const { name, fields, instructions } = form

  return (
    <div className='divide-y divide-gray-300 flex flex-col flex-grow overflow-hidden ring-1 ring-black ring-opacity-5 rounded-lg bg-white shadow min-h-full text-sm'>
      <div className='px-3 py-3.5 bg-gray-50'>
        <div className='flex justify-between items-center'>
          <div className='font-semibold text-gray-900'>{name}</div>
        </div>
      </div>
      <div className='p-4'>
        <form onSubmit={handleSubmit(onSubmit)} className='mb-0'>
          <div className='flex flex-col gap-4 py-4 sm:py-0'>
            {instructions && <div className='text-sm text-gray-600'>{instructions}</div>}
            {fields &&
              !!fields.length &&
              fields.map((field) => {
                return (
                  <div key={field.key}>
                    <div className='mb-2 block'>
                      <Label htmlFor={field.key} value={field.name} />
                    </div>
                    <Controller
                      render={(fieldObject) => {
                        return componentForField(field, fieldObject)
                      }}
                      name={field.name}
                      control={control}
                    />
                  </div>
                )
              })}
            <Button type='submit'>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Sentry.withProfiler(Form)
