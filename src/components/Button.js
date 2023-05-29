import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button as FlowbiteButton } from 'flowbite-react'

export function Button(props) {
  return (
    <Link to={{ pathname: props.href, search: location.search }}>
      <FlowbiteButton {...props}>{props.children}</FlowbiteButton>
    </Link>
  )
}

Button.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.oneOfType(Array(PropTypes.string, PropTypes.array))
}
