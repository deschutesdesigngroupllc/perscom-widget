import * as Sentry from '@sentry/react'
import React from 'react'
import useQuery from '../api/APIUtils'
import { Error } from '../components/Error'
import { Loading } from '../components/Loading'
import { Table } from '../components/Table'
import { config } from '../constants'

function Roster() {
  const { data, loading, error } = useQuery({
    url: config.roster.API_URL
  })

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {error && <Error error={error} />}
          <div className='flex flex-col space-y-4'>{data && !!data.length && data.map((unit) => renderUnit(unit))}</div>
        </>
      )}
    </>
  )
}

function renderUnit(unit) {
  const { id, name, users } = unit

  return (
    <Table
      key={id}
      columns={[
        {
          name: name,
          headerClasses: ['w-1/6'],
          cellClasses: ['w-1/6'],
          cellContent: (user) => {
            const { name, rank } = user
            const { image_url, abbreviation, name: rank_name } = rank ?? {}
            return (
              <div className='flex items-center'>
                {rank && (
                  <div className='flex items-center w-6 sm:w-8 flex-shrink-0'>
                    {image_url ? (
                      <img className='w-6 sm:w-8 font-bold' src={image_url} alt={rank_name} />
                    ) : (
                      <div className='font-bold text-sm'>{abbreviation}</div>
                    )}
                  </div>
                )}
                <div className='ml-4'>
                  <div className='font-semibold text-gray-900'>{name}</div>
                </div>
              </div>
            )
          }
        },
        {
          name: 'Position',
          key: 'position.name',
          headerClasses: ['w-1/6'],
          cellClasses: ['w-1/6']
        },
        {
          name: 'Specialty',
          key: 'specialty.name',
          headerClasses: ['hidden', 'sm:table-cell', 'w-1/6'],
          cellClasses: ['hidden', 'sm:table-cell', 'w-1/6']
        },
        {
          name: 'Status',
          headerClasses: ['w-1/6'],
          cellClasses: ['w-1/6'],
          cellContent: (user) => {
            const { status } = user
            return (
              <>
                {status && (
                  <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${status.color}`}>{status.name}</span>
                )}
              </>
            )
          }
        },
        {
          name: 'Online',
          headerClasses: ['hidden', 'md:table-cell', 'w-1/6'],
          cellClasses: ['hidden', 'md:table-cell', 'w-1/6'],
          cellContent: (user) => {
            const { online } = user
            return (
              <>
                {online ? (
                  <span className='inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-green-100 text-green-600'>Online</span>
                ) : (
                  <span className='inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-sky-100 text-sky-600'>Offline</span>
                )}
              </>
            )
          }
        },
        {
          name: 'Link',
          hidden: true,
          headerClasses: ['hidden', 'lg:table-cell', 'w-1/6'],
          cellClasses: ['hidden', 'lg:table-cell', 'w-1/6'],
          cellContent: (user) => {
            const { url, name } = user
            return (
              <a href={url} target='_blank' rel='noreferrer' className='text-gray-600 hover:text-gray-900'>
                Personnel Profile<span className='sr-only'>, {name}</span>
              </a>
            )
          }
        }
      ]}
      rows={users}
    />
  )
}

export default Sentry.withProfiler(Roster)
