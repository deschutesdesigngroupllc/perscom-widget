import * as Sentry from '@sentry/react'
import React, { useState } from 'react'
import useQuery from '../api/APIUtils'
import { Loading } from '../components/Loading'
import { config } from '../constants'
import { Link } from '../components/Link'
import { useParams } from 'react-router-dom'
import cx from 'classnames'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import DataTable from 'react-data-table-component'
import { ChevronLeftIcon } from '@heroicons/react/20/solid'
import { Alert } from '../components/Alert'
import { Card, Spinner } from 'flowbite-react'

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

  const recordsTabs = createRecordsTabs()
  const [currentRecordTab, setCurrentRecordTab] = useState(0)

  let records = {}
  for (var i = 0; i < recordsTabs.length; i++) {
    const { data: recordData } = useQuery({
      url: new URL(id + '/' + recordsTabs[i].path, url).href,
      queryParams: {
        key: 'include',
        value: recordsTabs[i].includes
      }
    })

    records[recordsTabs[i].variable] = recordData
  }

  const assignmentTabs = createAssignmentTabs()
  const [currentAssignmentTab, setCurrentAssignmentTab] = useState(0)

  let assignments = {}
  for (var a = 0; a < assignmentTabs.length; a++) {
    const { data: assignmentData } = useQuery({
      url: new URL(id + '/' + assignmentTabs[a].path, url).href,
      queryParams: {
        key: 'include',
        value: assignmentTabs[a].includes
      }
    })

    assignments[assignmentTabs[a].variable] = assignmentData
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {error ? (
            <Alert message={error} type='danger' />
          ) : (
            <div className='flex flex-col space-y-4'>
              <div className='flex flex-row items-center justify-start space-x-1 text-gray-500 hover:text-gray-700 active:text-blue-600'>
                <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
                <Link href={'/roster'} className='text-sm'>
                  Back to Roster
                </Link>
              </div>
              {user &&
                renderProfile(
                  user,
                  records,
                  recordsTabs,
                  currentRecordTab,
                  setCurrentRecordTab,
                  assignments,
                  assignmentTabs,
                  currentAssignmentTab,
                  setCurrentAssignmentTab
                )}
            </div>
          )}
        </>
      )}
    </>
  )
}

function renderProfile(
  user,
  records,
  recordsTabs,
  currentRecordTab,
  setCurrentRecordTab,
  assignments,
  assignmentTabs,
  currentAssignmentTab,
  setCurrentAssignmentTab
) {
  const { name, rank, position, profile_photo_url, cover_photo_url, online, status, unit, specialty } = user
  const { name: rank_name, abbreviation: rank_abbreviation } = rank ?? {}
  const { name: position_name } = position ?? {}
  const { name: specialty_name } = specialty ?? {}
  const { name: unit_name } = unit ?? {}
  const { name: status_name, color: status_color } = status ?? {}

  return (
    <div className='flex flex-col space-y-4 min-h-fit'>
      {cover_photo_url && (
        <div className='flex items-center justify-center max-h-80 overflow-hidden'>
          <img src={cover_photo_url} className='w-full object-cover' />
        </div>
      )}
      <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4'>
        <Card className='md:w-1/3 w-full justify-start'>
          <div className='flex justify-between items-center'>
            <h5 className='text-xl font-bold tracking-tight text-gray-900 dark:text-white'>Personnel Profile</h5>
            {status && (
              <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${status_color}`}>{status_name}</span>
            )}
          </div>
          <div className='py-4 flex flex-grow flex-col space-y-4 justify-center items-center'>
            {profile_photo_url && <img src={profile_photo_url} className='h-28 rounded' />}
            <div className='flex flex-col justify-center items-center text-center'>
              <div className='font-bold'>
                {rank_abbreviation} {name} {'  '}
              </div>
              {rank_name && <div className='text-gray-700 font-medium'>{rank_name}</div>}{' '}
              {position_name && <div className='text-gray-500'>{position_name}</div>}
            </div>
          </div>
        </Card>
        <Card className='md:w-2/3 w-full justify-start'>
          <div className='flex justify-between items-center'>
            <h5 className='text-xl font-bold tracking-tight text-gray-900 dark:text-white'>Demographics</h5>
            {online ? (
              <span className='inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-green-100 text-green-600'>Online</span>
            ) : (
              <span className='inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-sky-100 text-sky-600'>Offline</span>
            )}
          </div>
          <div className='flow-root'>
            <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
              <li className='py-2'>
                <p className='truncate text-sm font-medium text-gray-900 dark:text-white'>Name</p>
                <p className='truncate text-sm text-gray-500 dark:text-gray-400'>{name}</p>
              </li>
              <li className='py-2'>
                <p className='truncate text-sm font-medium text-gray-900 dark:text-white'>Rank</p>
                <p className='truncate text-sm text-gray-500 dark:text-gray-400'>{rank_name}</p>
              </li>
              <li className='py-2'>
                <p className='truncate text-sm font-medium text-gray-900 dark:text-white'>Primary Position</p>
                <p className='truncate text-sm text-gray-500 dark:text-gray-400'>{position_name}</p>
              </li>
              <li className='py-2'>
                <p className='truncate text-sm font-medium text-gray-900 dark:text-white'>Primary Specialty</p>
                <p className='truncate text-sm text-gray-500 dark:text-gray-400'>{specialty_name}</p>
              </li>
              <li className='py-2'>
                <p className='truncate text-sm font-medium text-gray-900 dark:text-white'>Primary Unit</p>
                <p className='truncate text-sm text-gray-500 dark:text-gray-400'>{unit_name}</p>
              </li>
            </ul>
          </div>
        </Card>
      </div>
      {renderSecondaryAssignments(user, assignments, assignmentTabs, currentAssignmentTab, setCurrentAssignmentTab)}
      {renderRecords(user, records, recordsTabs, currentRecordTab, setCurrentRecordTab)}
    </div>
  )
}

function renderSecondaryAssignments(user, assignments, assignmentTabs, currentAssignmentTab, setCurrentAssignmentTab) {
  return (
    <Card>
      <h5 className='text-xl font-bold tracking-tight text-gray-900 dark:text-white'>Assignments</h5>
      <Tabs onSelect={(index) => setCurrentAssignmentTab(index)} defaultIndex={currentAssignmentTab}>
        <TabList className='-mb-px flex space-x-8 overflow-scroll'>
          {assignmentTabs.map((tab, index) => (
            <Tab
              key={index}
              className={cx('cursor-pointer whitespace-nowrap flex py-4 px-1 focus-visible:outline-none border-b-2 font-medium text-sm', {
                'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200': index !== currentAssignmentTab,
                'active:border-transparent border-blue-600 text-blue-600': index === currentAssignmentTab
              })}
            >
              {tab.name}
              <span
                aria-hidden='true'
                className={cx('hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block', {
                  'bg-blue-100 text-blue-600': index === currentAssignmentTab,
                  'bg-gray-100 text-gray-900': index !== currentAssignmentTab
                })}
              >
                {assignments[assignmentTabs[index].variable] ? assignments[assignmentTabs[index].variable].length : 0}
              </span>
            </Tab>
          ))}
        </TabList>
        {assignmentTabs.map((tab, index) => (
          <TabPanel key={index}>
            <div className='py-4'>
              {assignments && (
                <DataTable
                  key={index}
                  columns={assignmentTabs[index].columns}
                  data={assignments[assignmentTabs[index].variable]}
                  pagination={true}
                  progressPending={!assignments[assignmentTabs[index].variable]}
                  progressComponent={DataTableLoading()}
                  highlightOnHover={true}
                  defaultSortFieldId={1}
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
    </Card>
  )
}

function renderRecords(user, records, recordsTabs, currentRecordTab, setCurrentRecordTab) {
  return (
    <Card>
      <h5 className='text-xl font-bold tracking-tight text-gray-900 dark:text-white'>Records</h5>
      <Tabs onSelect={(index) => setCurrentRecordTab(index)} defaultIndex={currentRecordTab}>
        <TabList className='-mb-px flex space-x-8 overflow-scroll'>
          {recordsTabs.map((tab, index) => (
            <Tab
              key={index}
              className={cx('cursor-pointer whitespace-nowrap flex py-4 px-1 focus-visible:outline-none border-b-2 font-medium text-sm', {
                'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200': index !== currentRecordTab,
                'active:border-transparent border-blue-600 text-blue-600': index === currentRecordTab
              })}
            >
              {tab.name}
              <span
                aria-hidden='true'
                className={cx('hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block', {
                  'bg-blue-100 text-blue-600': index === currentRecordTab,
                  'bg-gray-100 text-gray-900': index !== currentRecordTab
                })}
              >
                {records[recordsTabs[index].variable] ? records[recordsTabs[index].variable].length : 0}
              </span>
            </Tab>
          ))}
        </TabList>
        {recordsTabs.map((tab, index) => (
          <TabPanel key={index}>
            <div className='py-4'>
              {records && (
                <DataTable
                  key={index}
                  columns={recordsTabs[index].columns}
                  data={records[recordsTabs[index].variable]}
                  pagination={true}
                  progressPending={!records[recordsTabs[index].variable]}
                  progressComponent={DataTableLoading()}
                  highlightOnHover={true}
                  defaultSortFieldId={1}
                  defaultSortAsc={false}
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
    </Card>
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
          name: 'Assignment',
          selector: (row) => {
            const { unit, position, specialty, text } = row
            const { name: unit_name } = unit ?? {}
            const { name: position_name } = position ?? {}
            const { name: specialty_name } = specialty ?? {}
            return (
              <div className='flex flex-col space-y-1 justify-center'>
                <div className='font-semibold'>
                  {position_name}, {unit_name}
                </div>
                {specialty_name && <div className='text-xs'>{specialty_name}</div>}
                {text && <div className='text-xs text-gray-400'>{text}</div>}
              </div>
            )
          },
          sortable: true,
          sortFunction: (rowA, rowB) => {
            const a = rowA.position?.name ?? ''
            const b = rowB.position?.name ?? ''

            if (a > b) {
              return 1
            }

            if (b > a) {
              return -1
            }

            return 0
          }
        }
      ]
    },
    {
      name: 'Award Records',
      path: 'award-records',
      includes: Array('award', 'award.image').join(),
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
          selector: (row) => {
            const { award, text } = row
            const { image, name } = award ?? {}
            const { image_url } = image ?? {}
            return (
              <div className='flex space-x-4'>
                {image_url && <img className='w-6 sm:w-8 font-bold' src={image_url} alt={name} />}
                <div className='flex flex-col space-y-1 justify-center'>
                  {name && <div className='font-semibold'>{name}</div>}
                  {text && <div className='text-xs text-gray-400'>{text}</div>}
                </div>
              </div>
            )
          },
          sortable: true,
          sortFunction: (rowA, rowB) => {
            const a = rowA.award?.name ?? ''
            const b = rowB.award?.name ?? ''

            if (a > b) {
              return 1
            }

            if (b > a) {
              return -1
            }

            return 0
          }
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
          name: 'Record',
          selector: (row) => row.text
        }
      ]
    },
    {
      name: 'Qualification Records',
      path: 'qualification-records',
      includes: Array('qualification', 'qualification.image').join(),
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
          selector: (row) => {
            const { qualification, text } = row
            const { image, name } = qualification ?? {}
            const { image_url } = image ?? {}
            return (
              <div className='flex space-x-4'>
                {image_url && <img className='w-6 sm:w-8 font-bold' src={image_url} alt={name} />}
                <div className='flex flex-col space-y-1 justify-center'>
                  {name && <div className='font-semibold'>{name}</div>}
                  {text && <div className='text-xs text-gray-400'>{text}</div>}
                </div>
              </div>
            )
          },
          sortable: true,
          sortFunction: (rowA, rowB) => {
            const a = rowA.qualification?.name ?? ''
            const b = rowB.qualification?.name ?? ''

            if (a > b) {
              return 1
            }

            if (b > a) {
              return -1
            }

            return 0
          }
        }
      ]
    },
    {
      name: 'Rank Records',
      path: 'rank-records',
      includes: Array('rank', 'rank.image').join(),
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
          selector: (row) => {
            const { rank, text } = row
            const { image, name } = rank ?? {}
            const { image_url } = image ?? {}
            return (
              <div className='flex space-x-4'>
                {image_url && <img className='w-6 sm:w-8 font-bold' src={image_url} alt={name} />}
                <div className='flex flex-col space-y-1 justify-center'>
                  {name && <div className='font-semibold'>{name}</div>}
                  {text && <div className='text-xs text-gray-400'>{text}</div>}
                </div>
              </div>
            )
          },
          sortable: true,
          sortFunction: (rowA, rowB) => {
            const a = rowA.rank?.name ?? ''
            const b = rowB.rank?.name ?? ''

            if (a > b) {
              return 1
            }

            if (b > a) {
              return -1
            }

            return 0
          }
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
          name: 'Record',
          selector: (row) => row.text
        }
      ]
    }
  ]
}

function createAssignmentTabs() {
  return [
    {
      name: 'Secondary Positions',
      path: 'secondary-positions',
      variable: 'secondaryPositions',
      columns: [
        {
          name: 'Position',
          selector: (row) => row.name,
          sortable: true
        }
      ]
    },
    {
      name: 'Secondary Specialties',
      path: 'secondary-specialties',
      variable: 'secondarySpecialties',
      columns: [
        {
          name: 'Specialty',
          selector: (row) => row.name,
          sortable: true
        }
      ]
    },
    {
      name: 'Secondary Units',
      path: 'secondary-units',
      variable: 'secondaryUnits',
      columns: [
        {
          name: 'Unit',
          selector: (row) => row.name,
          sortable: true
        }
      ]
    }
  ]
}

function DataTableLoading() {
  return (
    <div className='pt-4 sm:pt-8'>
      <Spinner />
    </div>
  )
}

export default Sentry.withProfiler(User)
