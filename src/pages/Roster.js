import React from 'react'
import * as Sentry from '@sentry/react'
import PropTypes from 'prop-types'
import { config } from '../constants'
import useQuery from '../api/APIUtils'
import { Error } from '../components/Error'
import { Footer } from '../components/Footer'
import { Table } from '../components/Table'
import { Loading } from '../components/Loading'

function Roster({ domElement }) {
  const apiKey = domElement.getAttribute('data-apikey')
  const perscomId = domElement.getAttribute('data-perscomid')
  const { data, loading, error } = useQuery({
    url: config.roster.API_URL,
    perscomId,
    apiKey
  })

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {error && <Error error={error} />}
          {data && !!data.length && data.map((unit) => renderUnit(unit))}
        </>
      )}
      <Footer />
    </>
  )
}

function renderUnit(unit) {
  const { name, users } = unit

  return (
    <Table
      columns={[
        {
          name: name,
          key: 'name',
          content: (user) => {
            const { name, rank } = user
            return (
              <div className='flex items-center'>
                <div className='flex items-center h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0'>{rank && renderRankElement(rank)}</div>
                <div className='ml-4'>
                  <div className='font-semibold text-gray-900'>{name}</div>
                </div>
              </div>
            )
          }
        },
        {
          name: 'Position',
          key: 'position.name'
        },
        {
          name: 'Specialty',
          key: 'specialty.name',
          headerClasses: ['hidden', 'sm:table-cell'],
          cellClasses: ['hidden', 'sm:table-cell']
        },
        {
          name: 'Status',
          key: 'status.name',
          content: (user) => {
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
          key: 'online',
          headerClasses: ['hidden', 'md:table-cell'],
          cellClasses: ['hidden', 'md:table-cell'],
          content: (user) => {
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
          key: null,
          hidden: true,
          headerClasses: ['hidden', 'lg:table-cell'],
          cellClasses: ['hidden', 'lg:table-cell'],
          content: (user) => {
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

function renderRankElement(rank) {
  const hasImage = rank.image_url

  return (
    <>
      {hasImage ? (
        <img id='perscom_roster_table_cell_name_rank_image' className='h-6 w-6 sm:h-8 sm:w-8' src={rank.image_url} alt='' />
      ) : (
        <div id='perscom_roster_table_cell_name_rank_abbreviation' className='font-bold text-sm'>
          {rank.abbreviation}
        </div>
      )}
    </>
  )
}

Roster.propTypes = {
  domElement: PropTypes.object
}

export default Sentry.withProfiler(Roster)
