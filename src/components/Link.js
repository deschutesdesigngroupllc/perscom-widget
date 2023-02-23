import React from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'

export function Link(props) {
  return (
    <RouterLink to={{ pathname: props.href, search: location.search }} {...props}>
      {props.children}
    </RouterLink>
  )
}

Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.oneOfType(Array(PropTypes.string, PropTypes.array))
}
