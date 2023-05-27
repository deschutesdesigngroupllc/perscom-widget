import * as Sentry from '@sentry/react'
import React, { useState } from 'react'
import useFetch from '../hooks/useFetch'
import { Loading } from '../components/Loading'
import { config } from '../constants'
import { Table } from '../components/Table'
import { Alert } from '../components/Alert'

function Ranks() {
  const [url, setUrl] = useState(config.ranks.API_URL)

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
            <Alert message={error} type='failure' />
          ) : data && !!data.length ? (
            renderRanks(data, links, meta, onPaginationClick)
          ) : (
            <Alert message='No ranks found. Please add a rank.' />
          )}
        </>
      )}
    </>
  )
}

function renderRanks(ranks, links, meta, onPaginationClick) {
  return (
    <Table
      columns={[
        {
          name: 'Ranks',
          headerClasses: ['text-center'],
          headerAttributes: { colSpan: '2' },
          cellClasses: ['hidden', 'sm:table-cell', 'w-1/6', '!py-4'],
          cellContent: (rank) => {
            const { name, image } = rank
            const { image_url } = image ?? {}
            return (
              <>
                {image_url ? (
                  <img className='w-16 block mx-auto' src={image_url} alt={name} />
                ) : (
                  <div className='text-center font-medium'>No Image</div>
                )}
              </>
            )
          }
        },
        {
          name: 'Rank',
          key: 'description',
          hidden: true,
          cellClasses: ['!whitespace-normal', 'break-normal', '!py-4'],
          cellContent: (rank) => {
            const { name, description, image } = rank
            const { image_url } = image ?? {}
            return (
              <>
                {image_url && (
                  <div className='sm:hidden flex mb-2'>
                    <img className='w-10' src={image_url} alt={name} />
                  </div>
                )}
                <div className='text-sm font-medium text-gray-900 dark:text-white mb-2'>{name}</div>
                <div className='text-sm text-gray-500 dark:text-gray-400'>{description}</div>
              </>
            )
          }
        }
      ]}
      rows={ranks}
      links={links}
      meta={meta}
      onPaginationClick={onPaginationClick}
    />
  )
}

export default Sentry.withProfiler(Ranks)
