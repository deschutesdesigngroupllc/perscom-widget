import React from 'react'
import PropTypes from 'prop-types'
import { InformationCircleIcon } from '@heroicons/react/20/solid'
import { XCircleIcon } from '@heroicons/react/20/solid'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import { Alert as FlowbiteAlert } from 'flowbite-react'

// eslint-disable-next-line react/prop-types
export function Alert({ message, type = 'info', error }) {
  console.log(error)
  const renderIcon = () => {
    switch (type) {
      case 'info':
        return <InformationCircleIcon className='h-5 w-5 mr-2' aria-hidden='true' />
      case 'success':
        return <CheckCircleIcon className='h-5 w-5 mr-2' aria-hidden='true' />
      case 'warning':
        return <ExclamationTriangleIcon className='h-5 w-5 mr-2' aria-hidden='true' />
      case 'failure':
        return <XCircleIcon className='h-5 w-5 mr-2' aria-hidden='true' />
    }
  }

  return (
    <FlowbiteAlert color={type} icon={renderIcon}>
      <span>
        <p>{message}</p>
      </span>
    </FlowbiteAlert>
  )
}

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Array('info', 'success', 'warning', 'failure'))
}
