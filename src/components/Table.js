import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Button, Table as TableFlowbite } from 'flowbite-react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

const get = require('lodash/get')
const hash = require('object-hash')

export function Table({ columns, rows, links, meta, tableClasses, wrapperClasses, onPaginationClick }) {
  return (
    <div className={cx(wrapperClasses)}>
      <TableFlowbite className={cx('rounded-b-lg', tableClasses)} striped={true}>
        <TableFlowbite.Head>
          {columns &&
            !!columns.length &&
            columns
              .filter((column) => !column.hidden)
              .map((column) => {
                return (
                  <TableFlowbite.HeadCell key={hash(column)} className={cx(column.headerClasses)} {...column.headerAttributes}>
                    {renderHeaderContent(column)}
                  </TableFlowbite.HeadCell>
                )
              })}
        </TableFlowbite.Head>
        <TableFlowbite.Body className='divide-y'>
          {rows &&
            !!rows.length &&
            rows.map((row) => {
              return (
                <TableFlowbite.Row key={hash(row)}>
                  {columns.map((column) => {
                    return (
                      <TableFlowbite.Cell className={cx(column.cellClasses)} key={hash(column)} {...column.cellAttributes}>
                        {renderCellContent(row, column)}
                      </TableFlowbite.Cell>
                    )
                  })}
                </TableFlowbite.Row>
              )
            })}
        </TableFlowbite.Body>
      </TableFlowbite>
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
      <div className='flex items-center justify-between mt-4'>
        <div className='flex flex-1 justify-between sm:hidden'>
          {links.prev && (
            <Button size='sm' color='gray' onClick={() => onPaginationClick(links.prev)}>
              Previous
            </Button>
          )}
          {links.next && (
            <Button size='sm' color='gray' className='ml-auto' onClick={() => onPaginationClick(links.next)}>
              Next
            </Button>
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
                      'z-10 text-blue-600 bg-blue-50 hover:bg-blue-50 focus:z-20': link.active,
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
