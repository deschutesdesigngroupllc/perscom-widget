import * as Sentry from '@sentry/react'
import React, { useState } from 'react'
import useFetch from '../hooks/useFetch'
import { Loading } from '../components/Loading'
import { config } from '../constants'
import { Link } from '../components/Link'
import { useParams } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { ChevronLeftIcon } from '@heroicons/react/20/solid'
import { Alert } from '../components/Alert'
import { Card, Spinner, Tabs as FlowbiteTabs } from 'flowbite-react'
import { FieldValue } from '../components/Field'
import Helpers from '../utils/Helpers'

const get = require('lodash/get')

function User() {
  const { id } = useParams()
  const [url] = useState(config.app.API_URL + 'users/')

  const {
    data: user,
    loading: loading,
    error
  } = useFetch({
    url: new URL(id, url).href,
    parameters: {
      key: 'include',
      value: Array(
        'position',
        'rank',
        'specialty',
        'status',
        'unit',
        'service_records',
        'combat_records',
        'rank_records',
        'qualification_records',
        'assignment_records'
      ).join()
    }
  })

  const { data: additionalFields } = useFetch({
    url: new URL(id + '/fields', url).href
  })

  const recordsTabs = createRecordsTabs()

  let records = {}
  for (var i = 0; i < recordsTabs.length; i++) {
    const { data: recordData } = useFetch({
      url: new URL(id + '/' + recordsTabs[i].path, url).href,
      parameters: {
        key: 'include',
        value: recordsTabs[i].includes
      }
    })

    records[recordsTabs[i].variable] = recordData
  }

  const assignmentTabs = createAssignmentTabs()

  let assignments = {}
  for (var a = 0; a < assignmentTabs.length; a++) {
    const { data: assignmentData } = useFetch({
      url: new URL(id + '/' + assignmentTabs[a].path, url).href,
      parameters: {
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
            <Alert message={error} type='failure' />
          ) : (
            <div className='flex flex-col space-y-4'>
              <div className='flex flex-row items-center justify-start space-x-1 active:text-blue-600'>
                <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
                <Link href={'/roster'} className='text-sm'>
                  Back to Roster
                </Link>
              </div>
              {user && renderProfile(user, additionalFields, records, recordsTabs, assignments, assignmentTabs)}
            </div>
          )}
        </>
      )}
    </>
  )
}

function renderProfile(user, additionalFields, records, recordsTabs, assignments, assignmentTabs) {
  const { cover_photo_url } = user

  return (
    <div className='flex flex-col space-y-4 min-h-fit'>
      {cover_photo_url && (
        <div className='flex items-center justify-center max-h-80 overflow-hidden'>
          <img src={cover_photo_url} className='w-full object-cover' />
        </div>
      )}
      <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4'>
        {renderPersonnelProfileCard(user)}
        {renderDemographicsCard(user)}
      </div>
      {additionalFields && !!additionalFields.length && renderAdditionalFieldsCard(user, additionalFields)}
      {renderSecondaryAssignments(user, assignments, assignmentTabs)}
      {renderRecords(user, records, recordsTabs)}
    </div>
  )
}

function renderPersonnelProfileCard(user) {
  const { name, rank, position, profile_photo_url, status } = user
  const { name: rank_name, abbreviation: rank_abbreviation } = rank ?? {}
  const { name: position_name } = position ?? {}
  const { name: status_name, color: status_color } = status ?? {}

  return (
    <Card className='md:w-1/3 w-full justify-start'>
      <div className='flex justify-between items-center'>
        <h5 className='text-xl font-bold'>Personnel Profile</h5>
        {status && <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${status_color}`}>{status_name}</span>}
      </div>
      <div className='py-4 flex flex-grow flex-col space-y-4 justify-center items-center'>
        {profile_photo_url && <img src={profile_photo_url} className='h-28 rounded' />}
        <div className='flex flex-col justify-center items-center text-center'>
          <div className='font-bold'>
            {rank_abbreviation} {name} {'  '}
          </div>
          {rank_name && <div className='font-medium'>{rank_name}</div>} {position_name && <div className='font-light'>{position_name}</div>}
        </div>
      </div>
    </Card>
  )
}

function renderDemographicsCard(user) {
  const { name, rank, position, online, unit, specialty } = user
  const { name: rank_name } = rank ?? {}
  const { name: position_name } = position ?? {}
  const { name: specialty_name } = specialty ?? {}
  const { name: unit_name } = unit ?? {}

  return (
    <Card className='w-full md:w-2/3 justify-start'>
      <div className='flex justify-between items-center'>
        <h5 className='text-xl font-bold tracking-tight'>Demographics</h5>
        {online ? (
          <span className='inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-green-100 text-green-600'>Online</span>
        ) : (
          <span className='inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-sky-100 text-sky-600'>Offline</span>
        )}
      </div>
      <div className='flow-root'>
        <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
          <li className='py-2'>
            <p className='truncate text-sm font-semibold'>Name</p>
            <p className='truncate text-sm'>{name}</p>
          </li>
          <li className='py-2'>
            <p className='truncate text-sm font-semibold'>Rank</p>
            <p className='truncate text-sm'>{rank_name}</p>
          </li>
          <li className='py-2'>
            <p className='truncate text-sm font-semibold'>Primary Position</p>
            <p className='truncate text-sm'>{position_name}</p>
          </li>
          <li className='py-2'>
            <p className='truncate text-sm font-semibold'>Primary Specialty</p>
            <p className='truncate text-sm'>{specialty_name}</p>
          </li>
          <li className='py-2'>
            <p className='truncate text-sm font-semibold'>Primary Unit</p>
            <p className='truncate text-sm'>{unit_name}</p>
          </li>
        </ul>
      </div>
    </Card>
  )
}

function renderAdditionalFieldsCard(user, additionalFields) {
  return (
    <Card>
      <h5 className='text-xl font-bold'>Additional Information</h5>
      <div className='flow-root'>
        <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
          {additionalFields &&
            !!additionalFields.length &&
            additionalFields.map(function (field) {
              return (
                <li key={field.key} className='py-2'>
                  <p className='truncate text-sm font-semibold'>{field.name}</p>
                  <p className='text-sm'>
                    <FieldValue field={field} value={get(user, field.key, '')} />
                  </p>
                </li>
              )
            })}
        </ul>
      </div>
    </Card>
  )
}

function renderSecondaryAssignments(user, assignments, assignmentTabs) {
  return (
    <Card
      theme={{
        root: {
          children: 'flex h-full flex-col justify-center gap-4 p-6 pb-2'
        }
      }}
    >
      <h5 className='text-xl font-bold'>Assignments</h5>
      <FlowbiteTabs.Group style='underline'>
        {assignmentTabs.map((tab, index) => (
          <FlowbiteTabs.Item key={index} title={tab.name}>
            <div className='pt-4'>
              <DataTable
                key={index}
                columns={assignmentTabs[index].columns}
                data={assignments[assignmentTabs[index].variable]}
                pagination={true}
                progressPending={!assignments[assignmentTabs[index].variable]}
                progressComponent={DataTableLoading()}
                noDataComponent={DataTableEmpty()}
                highlightOnHover={true}
                defaultSortFieldId={1}
                responsive={true}
                paginationComponentOptions={{
                  noRowsPerPage: true
                }}
                customStyles={{
                  cells: {
                    style: {
                      marginTop: '0.5rem',
                      marginBottom: '0.5rem'
                    }
                  }
                }}
              />
            </div>
          </FlowbiteTabs.Item>
        ))}
      </FlowbiteTabs.Group>
    </Card>
  )
}

function renderRecords(user, records, recordsTabs) {
  return (
    <Card
      theme={{
        root: {
          children: 'flex h-full flex-col justify-center gap-4 p-6 pb-2'
        }
      }}
    >
      <h5 className='text-xl font-bold'>Records</h5>
      <FlowbiteTabs.Group style='underline'>
        {recordsTabs.map((tab, index) => (
          <FlowbiteTabs.Item key={index} title={tab.name}>
            <div className='pt-4'>
              <DataTable
                key={index}
                columns={recordsTabs[index].columns}
                data={records[recordsTabs[index].variable]}
                pagination={true}
                progressPending={!records[recordsTabs[index].variable]}
                progressComponent={DataTableLoading()}
                noDataComponent={DataTableEmpty()}
                highlightOnHover={true}
                defaultSortFieldId={1}
                defaultSortAsc={false}
                responsive={true}
                paginationComponentOptions={{
                  noRowsPerPage: true
                }}
                customStyles={{
                  cells: {
                    style: {
                      marginTop: '0.5rem',
                      marginBottom: '0.5rem'
                    }
                  }
                }}
              />
            </div>
          </FlowbiteTabs.Item>
        ))}
      </FlowbiteTabs.Group>
    </Card>
  )
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
          selector: (row) => Helpers.formatDate(row.created_at),
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
                {text && <div className='text-xs'>{text}</div>}
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
          selector: (row) => Helpers.formatDate(row.created_at),
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
                  {text && <div className='text-xs'>{text}</div>}
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
          selector: (row) => Helpers.formatDate(row.created_at),
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
          selector: (row) => Helpers.formatDate(row.created_at),
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
                  {text && <div className='text-xs'>{text}</div>}
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
          selector: (row) => Helpers.formatDate(row.created_at),
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
                  {text && <div className='text-xs'>{text}</div>}
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
          selector: (row) => Helpers.formatDate(row.created_at),
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
    <div className='py-4 sm:py-8'>
      <Spinner color='gray' />
    </div>
  )
}

function DataTableEmpty() {
  return <div className='text-grey-500 py-4 sm:py-8 text-sm'>There are no records to display.</div>
}

export default Sentry.withProfiler(User)
