import React from 'react'
import Table from './Table'
import { Spinner } from 'flowbite-react'

export function Loading() {
  return (
    <Table
      columns={[
        {
          name: 'Loading',
          hidden: true,
          cellClasses: ['!py-8'],
          cellContent: () => {
            return (
              <div className='flex justify-center items-center'>
                <Spinner color='gray' />
              </div>
            )
          }
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
