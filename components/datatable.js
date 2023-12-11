'use client';

import React from 'react';
import DataTable from 'react-data-table-component';
import get from 'lodash/get';
import { Spinner } from 'flowbite-react';

export function Datatable(props) {
  return (
    <DataTable
      {...props}
      progressComponent={<DataTableLoading />}
      noDataComponent={
        <DataTableEmpty emptyMessage={props.emptyMessage ?? 'There are no records to display.'} />
      }
      columns={props.columns.map((column) => {
        return {
          ...column,
          selector: async (row) => {
            return column.selector?.$$typeof === Symbol.for('react.lazy')
              ? await { ...column.selector, props: { ...column.selector.props, row } }
              : get(row, column.selector);
          }
        };
      })}
    />
  );
}

function DataTableLoading() {
  return (
    <div className="py-4 sm:py-8">
      <Spinner color="gray" />
    </div>
  );
}

function DataTableEmpty({ emptyMessage }) {
  return <div className="py-4 text-sm text-gray-500 sm:py-8">{emptyMessage}</div>;
}
