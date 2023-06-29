import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Pagination, Table as TableFlowbite } from 'flowbite-react'

const get = require('lodash/get')
const hash = require('object-hash')

export function Table({ columns, rows, meta, tableClasses, wrapperClasses, onPaginationClick }) {
  return (
    <div className={cx(wrapperClasses)}>
      <TableFlowbite className={cx(tableClasses)}>
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
      {meta?.current_page && meta?.last_page && meta?.last_page > 1 && (
        <Pagination showIcons currentPage={meta.current_page} onPageChange={onPaginationClick} totalPages={meta.last_page} />
      )}
    </div>
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
  meta: PropTypes.object,
  tableClasses: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.object]),
  wrapperClasses: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.object]),
  onPaginationClick: PropTypes.func
}

export default Table
