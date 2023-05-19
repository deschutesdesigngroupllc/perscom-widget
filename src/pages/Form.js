import * as Sentry from '@sentry/react'
import React, { useState } from 'react'
import useQuery from '../api/APIUtils'
import { Alert } from '../components/Alert'
import { Button, Card, Label } from 'flowbite-react'
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
  const [errors, setErrors] = useState()

  const { data, loading, error } = useQuery({
    url: new URL(id, url).href
  })

  const { control, handleSubmit } = useForm()
  const onSubmit = (data, event) => console.log(data, event)
  const onError = (errors) => setErrors(errors)

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {error ? (
            <Alert message={error} type='danger' />
          ) : (
            <>
              <div className='flex flex-col space-y-4'>
                <div className='flex flex-row items-center justify-start space-x-1 text-gray-500 hover:text-gray-700 active:text-blue-600'>
                  <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
                  <Link href={'/forms'} className='text-sm'>
                    Back to Forms
                  </Link>
                </div>
                {data && renderForm(data, control, handleSubmit, onSubmit, onError, errors)}
              </div>
            </>
          )}
        </>
      )}
    </>
  )
}

function renderForm(form, control, handleSubmit, onSubmit, onError, errors) {
  const { name, fields, instructions } = form

  return (
    <Card>
      <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{name}</h5>
      <form onSubmit={handleSubmit(onSubmit, onError)} className='mb-0'>
        <div className='flex flex-col gap-4 py-4 sm:py-0'>
          {errors && <Alert message={errors} type='danger' />}
          {instructions && <div className='text-sm text-gray-600'>{instructions}</div>}
          {fields &&
            !!fields.length &&
            fields.map((fieldObject) => {
              return (
                <div key={fieldObject.key}>
                  <div className='mb-2 block'>
                    <Label htmlFor={fieldObject.key} value={fieldObject.name} />
                  </div>
                  <Controller render={({ field }) => componentForField(fieldObject, field)} name={fieldObject.key} control={control} />
                </div>
              )
            })}
          <Button type='submit'>Submit</Button>
        </div>
      </form>
    </Card>
  )
}

export default Sentry.withProfiler(Form)
