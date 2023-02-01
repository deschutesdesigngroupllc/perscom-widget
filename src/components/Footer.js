import React from 'react'
import { config } from '../constants'

export function Footer() {
  const version = config.version.WIDGET_VERSION

  return (
    <div id='perscom_footer' className='text-xs text-gray-400 mt-4'>
      Widget Provided By{' '}
      <a href='https://perscom.io' target='_blank' rel='noreferrer'>
        PERSCOM.io
      </a>
      . Copyright {new Date().getFullYear()} Deschutes Design Group LLC. {version && <span>Version {version}.</span>}
    </div>
  )
}
