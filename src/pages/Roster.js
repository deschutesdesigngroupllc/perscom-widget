import * as Sentry from '@sentry/react'
import React from 'react'
import useQuery from '../api/APIUtils'
import { Error } from '../components/Error'
import { Loading } from '../components/Loading'
import { Table } from '../components/Table'
import { config } from '../constants'
import { Link } from '../components/Link'

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
          headerAttributes: { colSpan: '6' },
          cellClasses: ['w-1/6', 'whitespace-normal sm:whitespace-nowrap'],
          cellContent: (user) => {
            const { name, rank, position, id: user_id } = user
            const { image, abbreviation, name: rank_name } = rank ?? {}
            const { image_url } = image ?? {}
            const { name: position_name } = position ?? {}
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
                <div className='flex flex-col ml-4'>
                  <Link href={`/users/${user_id}`} className='font-semibold text-gray-900 hover:text-gray-500 active:text-blue-600'>
                    {name}
                  </Link>
                  <div className='md:hidden text-xs text-gray-500'>{position_name}</div>
                </div>
              </div>
            )
          }
        },
        {
          name: 'Position',
          key: 'position.name',
          hidden: true,
          cellClasses: ['hidden', 'md:table-cell', 'w-1/6', 'whitespace-normal', 'lg:whitespace-nowrap']
        },
        {
          name: 'Specialty',
          hidden: true,
          key: 'specialty.name',
          cellClasses: ['hidden', 'sm:table-cell', 'w-1/6', 'whitespace-normal', 'lg:whitespace-nowrap']
        },
        {
          name: 'Status',
          hidden: true,
          cellClasses: ['text-right', 'md:text-center', 'whitespace-nowrap', 'w-1/12'],
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
          hidden: true,
          cellClasses: ['hidden', 'lg:table-cell', 'text-center', 'w-1/12'],
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
          cellClasses: ['hidden', 'xl:table-cell', 'text-center', 'w-1/6'],
          cellContent: (user) => {
            const { name, id } = user
            return (
              <Link href={`/users/${id}`} className='text-gray-500 hover:text-gray-700 active:text-blue-600'>
                Personnel Profile<span className='sr-only'>, {name}</span>
              </Link>
            )
          }
        }
      ]}
      rows={users}
    />
  )
}

export default Sentry.withProfiler(Roster)
