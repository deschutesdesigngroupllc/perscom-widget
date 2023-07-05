import * as Sentry from '@sentry/react'
import React, { useState } from 'react'
import useFetch from '../hooks/useFetch'
import { Loading } from '../components/Loading'
import { config } from '../constants'
import { Table } from '../components/Table'
import { Alert } from '../components/Alert'

function Qualifications() {
  const [url, setUrl] = useState(config.qualifications.API_URL)

  const { data, meta, loading, error } = useFetch({
    url: url,
    parameters: {
      key: 'include',
      value: 'image'
    }
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
            renderQualifications(data, meta, onPaginationClick)
          ) : (
            <Alert message='No qualifications found. Please add a qualification.' />
          )}
        </>
      )}
    </>
  )
}

function renderQualifications(qualifications, meta, onPaginationClick) {
  return (
    <Table
      columns={[
        {
          name: 'Qualifications',
          headerClasses: ['text-center'],
          headerAttributes: { colSpan: '2' },
          cellClasses: ['hidden', 'sm:table-cell', 'w-1/6', '!py-4'],
          cellContent: (qualification) => {
            const { name, image } = qualification
            const { image_url } = image ?? {}
            return (
              <>
                {image_url ? (
                  <img className='w-28 block mx-auto' src={image_url} alt={name} />
                ) : (
                  <div className='text-center font-medium'>No Image</div>
                )}
              </>
            )
          }
        },
        {
          name: 'Qualification',
          key: 'description',
          hidden: true,
          cellClasses: ['!whitespace-normal', 'break-normal', '!py-4'],
          cellContent: (qualification) => {
            const { name, description, image } = qualification
            const { image_url } = image ?? {}
            return (
              <>
                {image_url && (
                  <div className='sm:hidden flex mb-2'>
                    <img className='w-20' src={image_url} alt={name} />
                  </div>
                )}
                <div className='text-sm font-medium text-gray-900 dark:text-white mb-2'>{name}</div>
                <div className='text-sm text-gray-500 dark:text-gray-400'>{description}</div>
              </>
            )
          }
        }
      ]}
      rows={qualifications}
      meta={meta}
      onPaginationClick={onPaginationClick}
    />
  )
}

export default Sentry.withProfiler(Qualifications)
