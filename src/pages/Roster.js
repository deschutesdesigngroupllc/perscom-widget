import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { config } from '../constants'

function Roster({ domElement }) {
  const apiKey = domElement.getAttribute('data-apikey')
  const perscomId = domElement.getAttribute('data-perscomid')
  const [loading, setLoading] = useState()
  const [error, setError] = useState('')
  const [data, setData] = useState([])

  useEffect(() => {
    setLoading(true)
    fetch(config.roster.API_URL, {
      method: 'GET',
      headers: {
        'X-Perscom-Id': perscomId,
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
        'User-Agent': 'PERSCOM Widget'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false)
        setData(data.data)
      })
      .catch((e) => {
        console.log(e)
        setLoading(false)
        setError('We recevied an error while trying to communicate with PERSCOM.io.')
      })
  }, [apiKey, perscomId])

  return (
    <div id='perscom_roster_widget'>
      <div id='perscom_roster_wrapper' className='sm:my-6 lg:my-8 sm:px-6 lg:px-8'>
        {error && renderError(error)}
        {loading ? (
          <div id='perscom_roster_loading' className='animate-pulse'>
            {renderUnit({}, true)}
          </div>
        ) : (
          <div className='flex flex-col space-y-6'>{!!data.length && data.map((unit) => renderUnit(unit, false))}</div>
        )}
      </div>
    </div>
  )
}

function renderUnit(unit, loading) {
  const { id, name, users } = unit

  return (
    <div id='perscom_roster_table_wrapper' className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg' key={id}>
      <table id='perscom_roster_table' className='min-w-full divide-y divide-gray-300'>
        <thead id='perscom_roster_table_header' className='bg-gray-50'>
          <tr>
            {loading ? (
              <th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-500 sm:pl-6 text-center'>
                Loading...
              </th>
            ) : (
              <>
                <th
                  id='perscom_roster_table_header_column_name'
                  scope='col'
                  className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
                >
                  {name}
                </th>
                <th
                  id='perscom_roster_table_header_column_position'
                  scope='col'
                  className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                >
                  Position
                </th>
                <th
                  id='perscom_roster_table_header_column_specialty'
                  scope='col'
                  className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell'
                >
                  Specialty
                </th>
                <th
                  id='perscom_roster_table_header_column_status'
                  scope='col'
                  className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                >
                  Status
                </th>
                <th
                  id='perscom_roster_table_header_column_online'
                  scope='col'
                  className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell'
                >
                  Online
                </th>
                <th id='perscom_roster_table_header_column_link' scope='col' className='hidden py-3.5 pl-3 pr-4 sm:pr-6 lg:table-cell'>
                  <span className='sr-only'>View</span>
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody id='perscom_roster_table_body' className='divide-y divide-gray-200 bg-white'>
          {!loading && !!users.length ? (
            users.map(renderUser)
          ) : (
            <tr>
              <td className='whitespace-nowrap py-6 pl-4 pr-3 text-sm sm:pl-6'></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

function renderUser(user) {
  const { id, name, position, specialty, status, rank, url, online } = user

  return (
    <tr id='perscom_roster_table_row' key={id}>
      <td id='perscom_roster_table_cell_name' className='whitespace-nowrap py-2 pl-4 pr-3 text-sm sm:pl-6'>
        <div id='perscom_roster_table_cell_name_wrapper' className='flex items-center'>
          <div id='perscom_roster_table_cell_name_rank' className='flex items-center h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0'>
            {rank && renderRankElement(rank)}
          </div>
          <div className='ml-4'>
            <div id='perscom_roster_table_cell_name_name' className='font-semibold text-gray-900'>
              {name}
            </div>
          </div>
        </div>
      </td>
      <td id='perscom_roster_table_cell_position' className='whitespace-nowrap px-3 py-2 text-sm text-gray-500'>
        {position && <div className='text-gray-900'>{position.name}</div>}
      </td>
      <td id='perscom_roster_table_cell_specialty' className='hidden whitespace-nowrap px-3 py-2 text-sm text-gray-500 sm:table-cell'>
        {specialty && <div className='text-gray-500'>{specialty.name}</div>}
      </td>
      <td id='perscom_roster_table_cell_status' className='whitespace-nowrap px-3 py-2 text-sm text-gray-500'>
        {status && <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${status.color}`}>{status.name}</span>}
      </td>
      <td id='perscom_roster_table_cell_online' className='hidden whitespace-nowrap px-3 py-2 text-sm text-gray-500 md:table-cell'>
        {online ? (
          <span className='inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-green-100 text-green-600'>Online</span>
        ) : (
          <span className='inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-sky-100 text-sky-600'>Offline</span>
        )}
      </td>
      <td
        id='perscom_roster_table_cell_link'
        className='hidden whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:table-cell'
      >
        <a href={url} className='text-gray-600 hover:text-gray-900'>
          Personnel Profile<span className='sr-only'>, {name}</span>
        </a>
      </td>
    </tr>
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

function renderError(error) {
  return (
    <div id='perscom_roster_error_wrapper' className='md:rounded-lg bg-red-50 p-4 mb-4'>
      <div className='flex'>
        <div className='flex-shrink-0'>
          <svg
            className='h-5 w-5 text-red-400'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z'
              clipRule='evenodd'
            />
          </svg>
        </div>
        <div className='ml-3'>
          <h3 className='text-sm font-medium text-red-800'>{error}</h3>
        </div>
      </div>
    </div>
  )
}

Roster.propTypes = {
  domElement: PropTypes.object
}

export default Roster
