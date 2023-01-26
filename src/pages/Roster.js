import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

function Roster({ domElement }) {
  const apiKey = domElement.getAttribute('data-apikey')
  const perscomKey = domElement.getAttribute('data-perscomkey')
  const [loading, setLoading] = useState()
  const [error, setError] = useState('')
  const [data, setData] = useState([])

  useEffect(() => {
    setLoading(true)
    fetch('https://api.perscom.io/v1/widget/roster', {
      method: 'GET',
      headers: {
        'X-Perscom-Key': perscomKey,
        Authorization: `Bearer ${apiKey}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false)
        setData(data.data.children.slice(0, 10))
      })
      .catch((e) => {
        console.log(e)
        setLoading(false)
        setError('We recevied an error while trying to communicate with PERSCOM.io.')
      })
  }, [apiKey, perscomKey])

  return (
    <div className='perscom_roster_widget'>
      <div className='perscom_roster_loading'>{loading && 'Loading...'}</div>
      <div className='perscom_roster_error'>{error && error}</div>
    </div>
  )
}

Roster.propTypes = {
  domElement: PropTypes.object
}

export default Roster
