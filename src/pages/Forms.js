import * as Sentry from '@sentry/react'
import React, { useState } from 'react'
import useFetch from '../hooks/useFetch'
import { Alert } from '../components/Alert'
import { Loading } from '../components/Loading'
import { Table } from '../components/Table'
import { config } from '../constants'
import { Button } from '../components/Button'

function Forms() {
  const [url, setUrl] = useState(config.app.API_URL + 'forms')

  const { data, meta, loading, error } = useFetch({
    url: url
  })

  const onPaginationClick = (page) => {
    const newUrl = new URL(url)
    newUrl.searchParams.set('page', page)

    setUrl(newUrl.href)
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {error ? (
            <Alert message={error} type='failure' />
          ) : data && !!data.length ? (
            renderForms(data, meta, onPaginationClick)
          ) : (
            <Alert message='No forms found. Please add an award.' />
          )}
        </>
      )}
    </>
  )
}

function renderForms(forms, meta, onPaginationClick) {
  return (
    <Table
      columns={[
        {
          name: 'Forms',
          headerClasses: ['text-center'],
          cellClasses: ['!whitespace-normal', 'break-normal'],
          cellContent: (form) => {
            const { name, description, id } = form
            return (
              <>
                <div className='flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 space-x-0 md:space-x-8'>
                  <div>
                    <div className='text-sm font-semibold mb-2'>{name}</div>
                    <div className='text-sm'>{description}</div>
                  </div>
                  <div className='flex-shrink-0'>
                    <Button href={String(id)} color='gray'>
                      Open Form
                    </Button>
                  </div>
                </div>
              </>
            )
          }
        }
      ]}
      rows={forms}
      meta={meta}
      onPaginationClick={onPaginationClick}
    />
  )
}

export default Sentry.withProfiler(Forms)
