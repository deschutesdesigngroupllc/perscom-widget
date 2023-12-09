import React from 'react'
import PropTypes from 'prop-types'
import CredentialService from '../services/CredentialService'
import { useErrorBoundary } from 'react-error-boundary'

export const CredentialCheck = ({ children }) => {
  const { showBoundary } = useErrorBoundary()

  if (!CredentialService.getApiKey()) {
    showBoundary(new Error('Please provide a valid API Key.'))
  }

  if (!CredentialService.getPerscomId()) {
    showBoundary(new Error('Please provide a valid PERSCOM ID.'))
  }

  return <>{children}</>
}

CredentialCheck.propTypes = {
  children: PropTypes.object.isRequired
}
