import React from 'react'
import Table from './Table'

export function Loading() {
  return (
    <Table
      wrapperClasses='animate-pulse'
      columns={[
        {
          name: 'Loading...',
          headerClasses: ['!text-center', '!text-gray-400'],
          cellClasses: ['py-8']
        }
      ]}
      rows={[
        {
          name: 'Loading'
        }
      ]}
    />
  )
}
