import * as Sentry from '@sentry/react'
import React, { useState } from 'react'
import useQuery from '../api/APIUtils'
import { Error } from '../components/Error'
import { Loading } from '../components/Loading'
import { config } from '../constants'
import { Link } from '../components/Link'
import { useParams } from 'react-router-dom'
import cx from 'classnames'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import DataTable from 'react-data-table-component'
import { ChevronLeftIcon } from '@heroicons/react/20/solid'

function User() {
  const { id } = useParams()
  const [url] = useState(config.users.API_URL)

  const {
    data: user,
    loading: loading,
    error
  } = useQuery({
    url: new URL(id, url).href,
    queryParams: {
      key: 'include',
      value: Array('position', 'rank', 'specialty', 'status', 'unit').join()
    }
  })

  const tabs = createRecordsTabs()
  const [currentTab, setCurrentTab] = useState(0)

  let records = {}
  for (var i = 0; i < tabs.length; i++) {
    const { data: assignmentRecordData } = useQuery({
      url: new URL(id + '/' + tabs[i].path, url).href,
      queryParams: {
        key: 'include',
        value: tabs[i].includes
      }
    })

    records[tabs[i].variable] = assignmentRecordData
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {error && <Error error={error} />}
          <div className='flex flex-col space-y-4'>
            <div className='flex flex-row items-center justify-start space-x-1 text-gray-500 hover:text-gray-700 active:text-blue-600'>
              <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
              <Link href={'/roster'} className='text-sm'>
                Back to Roster
              </Link>
            </div>
            {user && renderProfile(user, records, tabs, currentTab, setCurrentTab)}
          </div>
        </>
      )}
    </>
  )
}

function renderProfile(user, records, tabs, currentTab, setCurrentTab) {
  const { name, rank, position, profile_photo_url, cover_photo_url, online, status, unit, specialty } = user
  const { name: rank_name, abbreviation: rank_abbreviation } = rank ?? {}
  const { name: position_name } = position ?? {}
  const { name: specialty_name } = specialty ?? {}
  const { name: unit_name } = unit ?? {}
  const { name: status_name, color: status_color } = status ?? {}

  return (
    <div className='flex flex-col space-y-4 text-sm min-h-fit'>
      {cover_photo_url && (
        <div className='flex items-center justify-center max-h-80 overflow-hidden'>
          <img src={cover_photo_url} className='w-full object-cover' />
        </div>
      )}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='md:col-span-1'>
          <div className='divide-y divide-gray-300 flex flex-col overflow-hidden rounded-lg bg-white shadow h-full'>
            <div className='px-3 py-3.5 bg-gray-50'>
              <div className='flex justify-between items-center'>
                <div className='font-semibold text-gray-900'>Personnel Profile</div>
                {status && (
                  <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${status_color}`}>{status_name}</span>
                )}
              </div>
            </div>
            <div className='px-4 py-3.5 flex flex-grow flex-col space-y-6 justify-center items-center'>
              {profile_photo_url && <img src={profile_photo_url} className='h-28 rounded' />}
              <div className='flex flex-col space-y-1 justify-center items-center'>
                <div className='font-bold'>
                  {rank_abbreviation} {name} {'  '}
                </div>
                {rank_name && <div className='text-gray-700 font-medium'>{rank_name}</div>}{' '}
                {position_name && <div className='text-gray-500'>{position_name}</div>}
              </div>
            </div>
          </div>
        </div>
        <div className='md:col-span-2'>
          <div className='divide-y divide-gray-300 flex flex-col overflow-hidden rounded-lg bg-white shadow min-h-full'>
            <div className='px-3 py-3.5 bg-gray-50'>
              <div className='flex justify-between items-center'>
                <div className='font-semibold text-gray-900'>Demographics</div>
                {online ? (
                  <span className='inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-green-100 text-green-600'>Online</span>
                ) : (
                  <span className='inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-sky-100 text-sky-600'>Offline</span>
                )}
              </div>
            </div>
            <div className='flex flex-col flex-grow'>
              <dl>
                <div className='bg-gray-50 px-4 py-3.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-sm font-medium text-gray-500'>Name</dt>
                  <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>{name}</dd>
                </div>
                <div className='bg-white px-4 py-3.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-sm font-medium text-gray-500'>Rank</dt>
                  <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>{rank_name}</dd>
                </div>
                <div className='bg-gray-50 px-4 py-3.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-sm font-medium text-gray-500'>Position</dt>
                  <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>{position_name}</dd>
                </div>
                <div className='bg-white px-4 py-3.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-sm font-medium text-gray-500'>Specialty</dt>
                  <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>{specialty_name}</dd>
                </div>
                <div className='bg-gray-50 px-4 py-3.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-sm font-medium text-gray-500'>Unit</dt>
                  <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>{unit_name}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        <div className='md:col-span-3'>{renderRecords(user, records, tabs, currentTab, setCurrentTab)}</div>
      </div>
    </div>
  )
}

function renderRecords(user, records, tabs, currentTab, setCurrentTab) {
  return (
    <div className='divide-y divide-gray-300 flex flex-col overflow-hidden rounded-lg bg-white shadow'>
      <div className='px-3 py-3.5 bg-gray-50 font-semibold text-gray-900'>Records</div>
      <div className='px-4 pt-4'>
        <Tabs onSelect={(index) => setCurrentTab(index)} defaultIndex={currentTab}>
          <TabList className='-mb-px flex space-x-8 border-b border-gray-200 overflow-scroll'>
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                className={cx('cursor-pointer whitespace-nowrap flex py-4 px-1 focus-visible:outline-none border-b-2 font-medium text-sm', {
                  'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200': index !== currentTab,
                  'active:border-transparent border-blue-600 text-blue-600': index === currentTab
                })}
              >
                {tab.name}
                <span
                  aria-hidden='true'
                  className={cx('hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block', {
                    'bg-blue-100 text-blue-600': index === currentTab,
                    'bg-gray-100 text-gray-900': index !== currentTab
                  })}
                >
                  {records[tabs[index].variable] ? records[tabs[index].variable].length : 0}
                </span>
              </Tab>
            ))}
          </TabList>
          {tabs.map((tab, index) => (
            <TabPanel key={index}>
              <div className='py-4'>
                {records && (
                  <DataTable
                    key={index}
                    columns={tabs[index].columns}
                    data={records[tabs[index].variable]}
                    pagination={true}
                    progressPending={!records[tabs[index].variable]}
                    progressComponent={DataTableLoading()}
                    highlightOnHover={true}
                    defaultSortFieldId='date'
                    responsive={true}
                    customStyles={{
                      cells: {
                        style: {
                          marginTop: '0.5rem',
                          marginBottom: '0.5rem'
                        }
                      }
                    }}
                  />
                )}
              </div>
            </TabPanel>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })
}

function createRecordsTabs() {
  return [
    {
      name: 'Assignment Records',
      path: 'assignment-records',
      includes: Array('position', 'specialty', 'unit').join(),
      variable: 'assignmentRecordData',
      columns: [
        {
          name: 'Date',
          selector: (row) => formatDate(row.created_at),
          sortable: true,
          maxWidth: '250px'
        },
        {
          name: 'Unit',
          selector: (row) => row.unit?.name,
          sortable: true
        },
        {
          name: 'Position',
          selector: (row) => row.position?.name,
          sortable: true
        },
        {
          name: 'Specialty',
          selector: (row) => row.specialty?.name,
          sortable: true
        },
        {
          name: 'Text',
          selector: (row) => row.text
        }
      ]
    },
    {
      name: 'Award Records',
      path: 'award-records',
      includes: 'award',
      variable: 'awardRecordData',
      columns: [
        {
          name: 'Date',
          selector: (row) => formatDate(row.created_at),
          sortable: true,
          maxWidth: '250px'
        },
        {
          name: 'Award',
          selector: (row) => row.award?.name,
          sortable: true
        },
        {
          name: 'Text',
          selector: (row) => row.text
        }
      ]
    },
    {
      name: 'Combat Records',
      path: 'combat-records',
      variable: 'combatRecordData',
      columns: [
        {
          name: 'Date',
          selector: (row) => formatDate(row.created_at),
          sortable: true,
          maxWidth: '250px'
        },
        {
          name: 'Text',
          selector: (row) => row.text
        }
      ]
    },
    {
      name: 'Qualification Records',
      path: 'qualification-records',
      includes: 'qualification',
      variable: 'qualificationRecordData',
      columns: [
        {
          name: 'Date',
          selector: (row) => formatDate(row.created_at),
          sortable: true,
          maxWidth: '250px'
        },
        {
          name: 'Qualification',
          selector: (row) => row.qualification?.name,
          sortable: true
        },
        {
          name: 'Text',
          selector: (row) => row.text
        }
      ]
    },
    {
      name: 'Rank Records',
      path: 'rank-records',
      includes: 'rank',
      variable: 'rankRecordData',
      columns: [
        {
          name: 'Date',
          selector: (row) => formatDate(row.created_at),
          sortable: true,
          maxWidth: '250px'
        },
        {
          name: 'Rank',
          selector: (row) => row.rank?.name,
          sortable: true
        },
        {
          name: 'Text',
          selector: (row) => row.text
        }
      ]
    },
    {
      name: 'Service Records',
      path: 'service-records',
      variable: 'serviceRecordData',
      columns: [
        {
          name: 'Date',
          selector: (row) => formatDate(row.created_at),
          sortable: true,
          maxWidth: '250px'
        },
        {
          name: 'Text',
          selector: (row) => row.text
        }
      ]
    }
  ]
}

function DataTableLoading() {
  return (
    <div className='flex flex-row items-center justify-center py-4 sm:py-8'>
      <div className='inline-flex items-center px-4 py-2 leading-6 text-sm text-gray-400 transition ease-in-out duration-150'>
        <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-gray-400' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
          <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
          ></path>
        </svg>
        Loading...
      </div>
    </div>
  )
}

export default Sentry.withProfiler(User)
