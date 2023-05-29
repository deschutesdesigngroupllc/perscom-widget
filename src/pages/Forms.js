import * as Sentry from '@sentry/react'
import React, { useState } from 'react'
import useFetch from '../hooks/useFetch'
import { Alert } from '../components/Alert'
import { Loading } from '../components/Loading'
import { Table } from '../components/Table'
import { config } from '../constants'
import { Button } from '../components/Button'

function Forms() {
  const [url, setUrl] = useState(config.forms.API_URL)

  const { data, links, meta, loading, error } = useFetch({
    url: url
  })

  const onPaginationClick = (url) => {
    setUrl(url)
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
            renderForms(data, links, meta, onPaginationClick)
          ) : (
            <Alert message='No forms found. Please add an award.' />
          )}
        </>
      )}
    </>
  )
}

function renderForms(forms, links, meta, onPaginationClick) {
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
                    <div className='text-sm font-medium text-gray-900 dark:text-white mb-2'>{name}</div>
                    <div className='text-sm text-gray-500 dark:text-gray-400'>{description}</div>
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
      links={links}
      meta={meta}
      onPaginationClick={onPaginationClick}
    />
  )
}

export default Sentry.withProfiler(Forms)
