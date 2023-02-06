import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

const get = require('lodash/get')
const hash = require('object-hash')

export function Table({ columns, rows, links, meta, tableClasses, wrapperClasses, onPaginationClick }) {
  return (
    <div
      id='perscom_widget_table_wrapper'
      className={cx('overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg', wrapperClasses)}
    >
      <table id='perscom_widget_table' className={cx('min-w-full divide-y divide-gray-300', tableClasses)}>
        <thead id='perscom_widget_table_header' className='bg-gray-50'>
          <tr>
            {columns &&
              !!columns.length &&
              columns.map((column) => {
                return (
                  <th
                    id='perscom_widget_table_header_column'
                    scope='col'
                    key={hash(column)}
                    className={cx('px-3 py-3.5 text-left text-sm font-semibold text-gray-900', column.headerClasses)}
                  >
                    {!column.hidden && renderHeaderContent(column)}
                  </th>
                )
              })}
          </tr>
        </thead>
        <tbody id='perscom_widget_table_body' className='divide-y divide-gray-200 bg-white'>
          {rows &&
            !!rows.length &&
            rows.map((row) => {
              return (
                <tr id='perscom_widget_table_row' key={hash(row)}>
                  {columns.map((column) => {
                    return (
                      <td
                        id='perscom_widget_table_cell'
                        className={cx('whitespace-nowrap px-3 py-2 text-sm text-gray-500', column.cellClasses)}
                        key={hash(column)}
                      >
                        {renderCellContent(row, column)}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
        </tbody>
      </table>
      {renderPagination(rows, links, meta, onPaginationClick)}
    </div>
  )
}

const renderPagination = (rows, links, meta, onPaginationClick) => {
  return (
    rows &&
    links &&
    meta &&
    !!rows.length &&
    parseInt(meta.total) > parseInt(meta.per_page) && (
      <div className='flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6'>
        <div className='flex flex-1 justify-between sm:hidden'>
          {links.prev && (
            <button
              onClick={() => onPaginationClick(links.prev)}
              className='disabled relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
            >
              Previous
            </button>
          )}
          {links.next && (
            <button
              onClick={() => onPaginationClick(links.next)}
              className='relative ml-auto inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
            >
              Next
            </button>
          )}
        </div>
        <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
          <div>
            <p className='text-sm text-gray-500'>
              Showing <span className='font-medium'>{meta.from}</span> to <span className='font-medium'>{meta.to}</span> of{' '}
              <span className='font-medium'>{meta.total}</span> results
            </p>
          </div>
          <div>
            <nav className='isolate inline-flex -space-x-px rounded-md shadow-sm' aria-label='Pagination'>
              {meta.links.map((link) => (
                <button
                  onClick={() => onPaginationClick(link.url)}
                  aria-current='page'
                  disabled={!link.url}
                  className={cx(
                    '!relative inline-flex items-center border px-4 py-2 text-sm font-medium bg-white border-gray-300 text-gray-500',
                    {
                      'z-10 text-blue-600 border-blue-500 bg-blue-50 hover:bg-blue-50 focus:z-20': link.active,
                      'rounded-r-md': link.label === 'Next &raquo;',
                      'rounded-l-md': link.label === '&laquo; Previous',
                      'hover:bg-gray-50': link.url
                    }
                  )}
                  key={link.label}
                >
                  {link.label !== '&laquo; Previous' && link.label !== 'Next &raquo;' && link.label}
                  {link.label === '&laquo; Previous' && <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />}
                  {link.label === 'Next &raquo;' && <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    )
  )
}

const renderHeaderContent = (column) => {
  if (column.headerContent && typeof column.headerContent == 'function') {
    return column.headerContent.call(null, column)
  }
  return column.name
}

const renderCellContent = (row, column) => {
  if (column.cellContent && typeof column.cellContent == 'function') {
    return column.cellContent.call(null, row)
  }
  return get(row, column.key, '')
}

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  links: PropTypes.object,
  meta: PropTypes.object,
  tableClasses: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.object]),
  wrapperClasses: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.object]),
  onPaginationClick: PropTypes.func
}

export default Table
