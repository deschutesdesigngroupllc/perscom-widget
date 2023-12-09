import * as Sentry from '@sentry/react'
import React from 'react'
import useFetch from '../hooks/useFetch'
import { Loading } from '../components/Loading'
import { Table } from '../components/Table'
import { config } from '../constants'
import { Link } from '../components/Link'
import { Alert } from '../components/Alert'
import { Card, Tabs } from 'flowbite-react'

function Roster() {
  const { data, loading, error } = useFetch({
    url: config.app.API_URL + 'groups/',
    parameters: {
      key: 'include',
      value: 'units,units.users,units.users.position,units.users.rank,units.users.rank.image,units.users.specialty,units.users.status'
    }
  })

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {error ? (
            <Alert message={error} type='failure' />
          ) : data && !!data.length ? (
            renderTabs(data)
          ) : (
            <Alert message='No groups found. Please add a group and assign a unit to view the roster.' />
          )}
        </>
      )}
    </>
  )
}

function renderTabs(groups) {
  return (
    <Card
      theme={{
        root: {
          children: 'flex h-full flex-col justify-center gap-4 p-0'
        }
      }}
    >
      <Tabs style='underline'>
        {groups.map((group, index) => (
          <Tabs.Item key={index} title={group.name}>
            {group.units && !!group.units.length ? (
              group.units.map((unit) => renderUnit(unit))
            ) : (
              <div className='flex justify-center items-center py-4 text-sm'>No Units Assigned To Group</div>
            )}
          </Tabs.Item>
        ))}
      </Tabs>
    </Card>
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
          headerClasses: ['!rounded-none'],
          cellClasses: ['w-1/6', 'whitespace-normal', 'sm:whitespace-nowrap', '!py-3'],
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
                  <Link href={`/users/${user_id}`} className='text-sm font-semibold hover:text-gray-600 active:text-blue-600'>
                    {name}
                  </Link>
                  <div className='md:hidden text-xs'>{position_name}</div>
                </div>
              </div>
            )
          }
        },
        {
          name: 'Position',
          key: 'position.name',
          hidden: true,
          cellClasses: ['hidden', 'md:table-cell', 'w-1/6', 'whitespace-normal', 'lg:whitespace-nowrap', '!py-3']
        },
        {
          name: 'Specialty',
          hidden: true,
          key: 'specialty.name',
          cellClasses: ['hidden', 'sm:table-cell', 'w-1/6', 'whitespace-normal', 'lg:whitespace-nowrap', '!py-3']
        },
        {
          name: 'Status',
          hidden: true,
          cellClasses: ['text-right', 'md:text-center', 'whitespace-nowrap', 'w-1/12', '!py-3'],
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
          cellClasses: ['hidden', 'lg:table-cell', 'text-center', 'w-1/12', '!py-3'],
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
        }
      ]}
      rows={users}
      emptyRowsMessage='No Personnel Assigned To Unit'
    />
  )
}

export default Sentry.withProfiler(Roster)
