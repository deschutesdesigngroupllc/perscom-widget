import * as Sentry from '@sentry/react'
import React, { useState } from 'react'
import useFetch from '../hooks/useFetch'
import { Loading } from '../components/Loading'
import { config } from '../constants'
import { Table } from '../components/Table'
import { Alert } from '../components/Alert'

function Awards() {
  const [url, setUrl] = useState(config.awards.API_URL)

  const { data, links, meta, loading, error } = useFetch({
    url: url,
    parameters: {
      key: 'include',
      value: 'image'
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
          {error ? (
            <Alert message={error} type='danger' />
          ) : data && !!data.length ? (
            renderAwards(data, links, meta, onPaginationClick)
          ) : (
            <Alert message='No awards found. Please add an award.' />
          )}
        </>
      )}
    </>
  )
}

function renderAwards(awards, links, meta, onPaginationClick) {
  return (
    <Table
      columns={[
        {
          name: 'Awards',
          headerClasses: ['text-center'],
          headerAttributes: { colSpan: '2' },
          cellClasses: ['hidden', 'sm:table-cell', 'w-1/6', '!py-4'],
          cellContent: (award) => {
            const { name, image } = award
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
          name: 'Award',
          key: 'description',
          hidden: true,
          cellClasses: ['!whitespace-normal', 'break-normal', '!py-4'],
          cellContent: (award) => {
            const { name, description, image } = award
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
      rows={awards}
      links={links}
      meta={meta}
      onPaginationClick={onPaginationClick}
    />
  )
}

export default Sentry.withProfiler(Awards)
