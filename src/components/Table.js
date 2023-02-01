import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

const get = require('lodash/get')

export function Table({ columns, rows, tableClasses, wrapperClasses }) {
  return (
    <div
      id='perscom_widget_table_wrapper'
      className={cx('overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg', wrapperClasses)}
    >
      <table id='perscom_widget_table' className={cx('min-w-full divide-y divide-gray-300', tableClasses)}>
        <thead id='perscom_widget_table_header' className='bg-gray-50'>
          <tr>
            {columns &&
              columns.map((column) => {
                return (
                  <th
                    id='perscom_widget_table_header_column'
                    scope='col'
                    key={column.key}
                    className={cx('px-3 py-3.5 text-left text-sm font-semibold text-gray-900', column.headerClasses)}
                  >
                    {!column.hidden && column.name}
                  </th>
                )
              })}
          </tr>
        </thead>
        <tbody id='perscom_widget_table_body' className='divide-y divide-gray-200 bg-white'>
          {rows &&
            rows.map((row) => {
              return (
                <tr id='perscom_widget_table_row' key={row.id}>
                  {columns.map((column) => {
                    return (
                      <td
                        id='perscom_widget_table_cell'
                        className={cx('whitespace-nowrap px-3 py-2 text-sm text-gray-500', column.cellClasses)}
                        key={column.key}
                      >
                        {column.content ? <>{row && column.content.call(null, row)}</> : <>{column.key && get(row, column.key, '')}</>}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

Table.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array,
  tableClasses: PropTypes.array || PropTypes.string || PropTypes.object,
  wrapperClasses: PropTypes.array || PropTypes.string || PropTypes.object
}

export default Table
