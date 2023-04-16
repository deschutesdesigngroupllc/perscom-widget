import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { InformationCircleIcon } from '@heroicons/react/20/solid'
import { XCircleIcon } from '@heroicons/react/20/solid'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'

export function Alert({ message, type = 'info' }) {
  const renderIcon = () => {
    switch (type) {
      case 'info':
        return <InformationCircleIcon className='h-5 w-5 text-blue-400' aria-hidden='true' />
      case 'success':
        return <CheckCircleIcon className='h-5 w-5 text-green-400' aria-hidden='true' />
      case 'warning':
        return <ExclamationTriangleIcon className='h-5 w-5 text-yellow-400' aria-hidden='true' />
      case 'danger':
        return <XCircleIcon className='h-5 w-5 text-red-400' aria-hidden='true' />
    }
  }

  return (
    <div
      className={cx('md:rounded-lg p-4', {
        'bg-blue-50': type === 'info',
        'bg-green-50': type === 'success',
        'bg-yellow-50': type === 'warning',
        'bg-red-50': type === 'danger'
      })}
    >
      <div className='flex'>
        <div className='flex-shrink-0'>{renderIcon()}</div>
        <div className='ml-3'>
          <h3
            className={cx('text-sm font-medium', {
              'text-blue-800': type === 'info',
              'text-green-800': type === 'success',
              'text-yellow-800': type === 'warning',
              'text-red-800': type === 'danger'
            })}
          >
            {message}
          </h3>
        </div>
      </div>
    </div>
  )
}

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Array('info', 'success', 'warning', 'danger'))
}
