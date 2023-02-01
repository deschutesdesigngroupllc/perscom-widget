import { useEffect, useState } from 'react'

const useQuery = ({ url, perscomId, apiKey }) => {
  const [statusCode, setStatusCode] = useState()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const headers = {
    'X-Perscom-Id': perscomId,
    Authorization: `Bearer ${apiKey}`,
    Accept: 'application/json',
    'User-Agent': 'PERSCOM Widget'
  }

  useEffect(() => {
    setLoading(true)
    setError('')
    fetch(url, {
      method: 'GET',
      headers: headers
    })
      .then((response) => {
        setStatusCode(response.status)
        switch (response.status) {
          case 401:
            setError(
              'The request failed due to not being authenticated. Please make sure you have provided an API key and that is not revoked.'
            )
            break
          case 403:
            setError('The API key you provided does not have access to the widget.')
            break
          case 500:
            setError('We recevied an error while trying to communicate with PERSCOM.io.')
            break
        }

        return response.json()
      })
      .then((data) => {
        setData(data.data)
        setLoading(false)
      })
      .catch((e) => {
        console.log(e)
        setError('We recevied an error while trying to communicate with PERSCOM.io.')
        setLoading(false)
      })
  }, [url, perscomId, apiKey])

  return { data: data, statusCode, loading, error }
}

export default useQuery
