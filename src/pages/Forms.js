import * as Sentry from '@sentry/react'
import React, { useState } from 'react'
import useQuery from '../api/APIUtils'
import { Error } from '../components/Error'
import { Loading } from '../components/Loading'
import { config } from '../constants'
import { Table } from '../components/Table'
import { Link, useSearchParams } from 'react-router-dom'

function Forms() {
  const [url, setUrl] = useState(config.forms.API_URL)
  const [searchParams] = useSearchParams()

  const tags = searchParams.has('tags') ? searchParams.get('tags').split(',') : null
  const { data, links, meta, loading, error } = useQuery({
    url: url,
    method: 'POST',
    requestBody: tags && {
      scopes: [
        {
          name: 'forTags',
          parameters: tags
        }
      ]
    }
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
          {error && <Error error={error} />}
          {data && !!data.length && renderForms(data, links, meta, onPaginationClick)}
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
          cellClasses: ['!whitespace-normal', 'break-normal', '!py-4'],
          cellContent: (form) => {
            const { name, description, id } = form
            return (
              <>
                <div className='flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 space-x-0 md:space-x-8'>
                  <div>
                    <div className='font-semibold text-black mb-2'>{name}</div>
                    <div className='text-sm'>{description}</div>
                  </div>
                  <div className='flex-shrink-0'>
                    <Link
                      to={String(id)}
                      className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
                    >
                      Open Form
                    </Link>
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
