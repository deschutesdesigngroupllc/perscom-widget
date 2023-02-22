import * as Sentry from '@sentry/react'
import React, { useState } from 'react'
import useQuery from '../api/APIUtils'
import { Error } from '../components/Error'
import { Loading } from '../components/Loading'
import { config } from '../constants'
import { Table } from '../components/Table'
import { useParams } from 'react-router-dom'

function User() {
  const { id } = useParams()
  const [url] = useState(config.users.API_URL)

  const includes = [
    'assignment_records',
    'award_records',
    'combat_records',
    'position',
    'qualification_records',
    'rank',
    'rank_records',
    'service_records',
    'specialty',
    'status',
    'unit'
  ]

  const { data, links, meta, loading, error } = useQuery({
    url: new URL(id, url).href,
    queryParams: {
      key: 'include',
      value: includes.join()
    }
  })

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {error && <Error error={error} />}
          {data && !!data.length && renderAwards(data, links, meta)}
        </>
      )}
    </>
  )
}

function renderAwards(awards, links, meta) {
  return (
    <Table
      columns={[
        {
          name: 'Awards',
          headerClasses: ['text-center'],
          headerAttributes: { colSpan: '2' },
          cellClasses: ['hidden', 'sm:table-cell', 'w-1/6', '!py-4'],
          cellContent: (award) => {
            const { name, image_url } = award
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
          name: 'Award',
          key: 'description',
          hidden: true,
          cellClasses: ['!whitespace-normal', 'break-normal', '!py-4'],
          cellContent: (award) => {
            const { name, description, image_url } = award
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
      rows={awards}
      links={links}
      meta={meta}
    />
  )
}

export default Sentry.withProfiler(User)
