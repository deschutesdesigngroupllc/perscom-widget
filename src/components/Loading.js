import React from 'react'
import { Card, Spinner } from 'flowbite-react'

export function Loading() {
  return (
    <Card>
      <div className='flex items-center justify-center py-4'>
        <Spinner color='gray' />
      </div>
    </Card>
  )
}
