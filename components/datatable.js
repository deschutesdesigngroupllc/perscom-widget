'use client';

import React from 'react';
import DataTable from 'react-data-table-component';
import { Spinner } from 'flowbite-react';

export function Datatable(props) {
  return (
    <DataTable
      {...props}
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
  return <div className="py-4 text-sm text-gray-500 sm:py-8">{emptyMessage}</div>;
}
