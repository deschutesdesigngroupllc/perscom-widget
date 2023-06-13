import * as Sentry from '@sentry/react'
import React, { useRef, useState } from 'react'
import useFetch from '../hooks/useFetch'
import { Alert } from '../components/Alert'
import { Button, Card, Label } from 'flowbite-react'
import { ChevronLeftIcon } from '@heroicons/react/20/solid'
import { Controller, useForm } from 'react-hook-form'
import { Link } from '../components/Link'
import { Loading } from '../components/Loading'
import { config } from '../constants'
import { useParams, useSearchParams } from 'react-router-dom'
import { createRequest, createHeaders } from '../hooks/useFetch'
import { FieldElement } from '../components/Field'

function Form() {
  const { id } = useParams()
  const [url] = useState(config.forms.API_URL)
  const [validationError, setValidationError] = useState()
  const [submitted, setSubmitted] = useState(false)
  const [searchParams] = useSearchParams()
  const formRef = useRef(null)

  const { data, loading, error } = useFetch({
    url: new URL(id, url).href
  })

  const { control, handleSubmit, reset } = useForm()
  const onSubmit = (data) => {
    createRequest(config.forms.API_URL + `${id}` + '/submissions', 'POST', createHeaders(searchParams), data)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((response) => {
            throw new Error(response.error.message)
          })
        }
        response.json()
      })
      .then(() => {
        setValidationError()
        setSubmitted(true)
        reset()
      })
      .catch((error) => {
        setSubmitted(false)
        setValidationError(error.message)
      })
      .finally(() => {
        formRef.current.scrollIntoView()
      })
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {error ? (
            <Alert message={error} type='failure' />
          ) : (
            <>
              <div className='flex flex-col space-y-4'>
                <div className='flex flex-row items-center justify-start space-x-1 text-gray-500 hover:text-gray-700 active:text-blue-600'>
                  <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
                  <Link href={'/forms'} className='text-sm'>
                    Back to Forms
                  </Link>
                </div>
                {data && renderForm(data, formRef, control, handleSubmit, onSubmit, validationError, submitted)}
              </div>
            </>
          )}
        </>
      )}
    </>
  )
}

function renderForm(form, formRef, control, handleSubmit, onSubmit, validationError, submitted) {
  const { name, fields, instructions } = form

  return (
    <Card>
      <h5 className='text-xl font-bold tracking-tight text-gray-900 dark:text-white' ref={formRef}>
        {name}
      </h5>
      <form onSubmit={handleSubmit(onSubmit)} className='mb-0'>
        <div className='flex flex-col gap-4 py-4 sm:py-0'>
          {submitted && <Alert message={form.success_message ?? 'Your form has been successfully submitted.'} type='success' />}
          {validationError && <Alert message={validationError} type='failure' />}
          {instructions && <div className='text-sm text-gray-600'>{instructions}</div>}
          {fields &&
            !!fields.length &&
            fields.map((fieldObject) => {
              return (
                <div key={fieldObject.key}>
                  <div className='mb-2 block'>
                    <Label htmlFor={fieldObject.key} value={fieldObject.name} />
                  </div>
                  <Controller
                    render={({ field }) => <FieldElement field={field} fieldObject={fieldObject} />}
                    name={fieldObject.key}
                    control={control}
                    defaultValue={''}
                  />
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
