import React from 'react'
import { config } from '../constants'
import { Logo } from './Logo'
import { useSearchParams } from 'react-router-dom'

export function Footer() {
  const [searchParams] = useSearchParams()
  const version = config.app.WIDGET_VERSION

  return searchParams.get('footer') !== 'false' ? (
    <div className='flex flex-row justify-center'>
      <div className='flex items-center mt-2 space-x-1'>
        <Logo className='w-16 h-6' />
        <div className='text-xs'>
          Widget Provided By{' '}
          <a href='https://perscom.io' target='_blank' rel='noreferrer' className='underline'>
            PERSCOM.io
          </a>
          . <span className='sm:inline hidden'>Copyright {new Date().getFullYear()} Deschutes Design Group LLC.</span>{' '}
          {version && <span className='md:inline hidden'>Version {version}.</span>}
        </div>
      </div>
    </div>
  ) : (
    ''
  )
}
