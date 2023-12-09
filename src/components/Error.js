import React from 'react'
import { Alert } from './Alert'
import PropTypes from 'prop-types'

export const Error = ({ error }) => {
  return (
    <>
      <Alert message={error.message ?? 'There was an error with the last request.'} type='failure' />
    </>
  )
}

Error.propTypes = {
  error: PropTypes.object.isRequired
}
