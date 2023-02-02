import React from 'react'
import { config } from '../constants'
import { ReactComponent as Logo } from '../assets/svg/logo.svg'

export function Footer() {
  const version = config.version.WIDGET_VERSION

  return (
    <div className='flex items-center mt-2 space-x-2'>
      <Logo className='w-16' />
      <div id='perscom_footer' className='text-xs text-gray-400'>
        Widget Provided By{' '}
        <a href='https://perscom.io' target='_blank' rel='noreferrer' className='underline'>
          PERSCOM.io
        </a>
        . Copyright {new Date().getFullYear()} Deschutes Design Group LLC. {version && <span>Version {version}.</span>}
      </div>
    </div>
  )
}
