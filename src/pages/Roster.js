import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { config } from '../constants'

function Roster({ domElement }) {
  const apiKey = domElement.getAttribute('data-apikey')
  const perscomId = domElement.getAttribute('data-perscomid')
  const [loading, setLoading] = useState()
  const [error, setError] = useState('')
  const [data, setData] = useState([])

  useEffect(() => {
    setLoading(true)
    fetch(config.roster.API_URL, {
      method: 'GET',
      headers: {
        'X-Perscom-Id': perscomId,
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
        'User-Agent': 'PERSCOM Widget'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false)
        setData(data)
      })
      .catch((e) => {
        console.log(e)
        setLoading(false)
        setError('We recevied an error while trying to communicate with PERSCOM.io.')
      })
  }, [apiKey, perscomId])

  return (
    <div className='perscom_roster_widget'>
      <div className='perscom_roster_loading'>{loading && 'Loading...'}</div>
      <div className='perscom_roster_error'>{error && error}</div>
      {data && data}
    </div>
  )
}

Roster.propTypes = {
  domElement: PropTypes.object
}

export default Roster
