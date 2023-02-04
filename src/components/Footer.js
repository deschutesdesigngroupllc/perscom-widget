import React from 'react'
import { config } from '../constants'
import { Logo } from './Logo'

export function Footer() {
  const version = config.app.WIDGET_VERSION

  return (
    <div className='flex items-center mt-2 space-x-1'>
      <Logo className='w-16 h-6' />
      <div id='perscom_footer' className='text-xs text-gray-400'>
        Widget Provided By{' '}
        <a href='https://perscom.io' target='_blank' rel='noreferrer' className='underline'>
          PERSCOM.io
        </a>
        . Copyright {new Date().getFullYear()} <span className='sm:inline hidden'>Deschutes Design Group LLC.</span>{' '}
        {version && <span className='md:inline hidden'>Version {version}.</span>}
      </div>
    </div>
  )
}
