import * as Sentry from '@sentry/react'
import React, { useState } from 'react'
import useQuery from '../api/APIUtils'
import { Loading } from '../components/Loading'
import { config } from '../constants'
import { Table } from '../components/Table'
import { Alert } from '../components/Alert'

function Qualifications() {
  const [url, setUrl] = useState(config.qualifications.API_URL)

  const { data, links, meta, loading, error } = useQuery({
    url: url,
    queryParams: {
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
            renderQualifications(data, links, meta, onPaginationClick)
          ) : (
            <Alert message='No qualifications found. Please add a qualification.' />
          )}
        </>
      )}
    </>
  )
}

function renderQualifications(qualifications, links, meta, onPaginationClick) {
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
                  <div className='text-center font-bold text-sm'>No Image</div>
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
                <div className='font-semibold text-black mb-2'>{name}</div>
                <div className='text-sm'>{description}</div>
              </>
            )
          }
        }
      ]}
      rows={qualifications}
      links={links}
      meta={meta}
      onPaginationClick={onPaginationClick}
    />
  )
}

export default Sentry.withProfiler(Qualifications)
