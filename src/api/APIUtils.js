import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const useQuery = ({ url, apiKey, perscomId }) => {
  const [statusCode, setStatusCode] = useState()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const headers = {
    'X-Perscom-Id': perscomId,
    'X-Perscom-Widget': true,
    Authorization: `Bearer ${apiKey}`,
    Accept: 'application/json'
  }

  const [searchParams] = useSearchParams()

  useEffect(() => {
    setLoading(true)
    setError('')
    if (apiKey && perscomId) {
      fetch(composeQueryUrl(url, searchParams), {
        method: 'GET',
        headers: headers
      })
        .then((response) => {
          setStatusCode(response.status)
          switch (response.status) {
            case 401:
              setError('Unauthenticated: The API key provided is incorrect or there was none provided.')
              break
            case 403:
              setError('Forbidden: The API key you provided does not have access to the widget.')
              break
            case 404:
              setError('Not Found: The resource you are trying to access does not exist.')
              break
            case 500:
              setError('Error: We recevied an error while trying to communicate with PERSCOM.io.')
              break
          }

          return response.json()
        })
        .then((data) => {
          setData(data)
          setLoading(false)
        })
        .catch((e) => {
          console.log(e)
          setError('Error: We recevied an error while trying to communicate with PERSCOM.io.')
          setLoading(false)
        })
    }
  }, [url, perscomId, apiKey])

  return { data: data.data, links: data.links, meta: data.meta, statusCode, loading, error }
}

const composeQueryUrl = (url, newSearchParams) => {
  const currentUrl = new URL(url)
  const currentSearchParams = currentUrl.searchParams
  const searchParams = new URLSearchParams({
    ...Object.fromEntries(newSearchParams),
    ...Object.fromEntries(currentSearchParams)
  })

  currentUrl.searchParams.forEach((value, key) => currentUrl.searchParams.delete(key))
  searchParams.forEach((value, key) => currentUrl.searchParams.set(key, value))

  return currentUrl.href
}

export default useQuery
