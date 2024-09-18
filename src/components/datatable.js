'use client';

import { Spinner } from 'flowbite-react';
import DataTable from 'react-data-table-component';
import '../styles/datatable.css';

export function Datatable(props) {
  return (
    <DataTable
      {...(({ noProgressComponent, noDataComponent, ...o }) => o)(props)}
      progressComponent={<DataTableLoading />}
      noDataComponent={
        <DataTableEmpty emptyMessage={props.emptyMessage ?? 'There are no records to display.'} />
      }
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
  return (
    <div className="py-4 text-xs text-gray-700 dark:text-gray-400 sm:py-8">{emptyMessage}</div>
  );
}
