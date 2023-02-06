import { useEffect, useState } from 'react'

const useQuery = ({ url, widgetId, page, apiKey, perscomId }) => {
  const [statusCode, setStatusCode] = useState()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const headers = {
    'X-Perscom-Id': perscomId,
    'X-Perscom-Widget': true,
    'X-Perscom-Widget-Id': widgetId,
    Authorization: `Bearer ${apiKey}`,
    Accept: 'application/json',
    'User-Agent': 'PERSCOM Widget'
  }

  useEffect(() => {
    setLoading(true)
    setError('')
    if (apiKey && perscomId) {
      fetch(formatUrl(url, page), {
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

function formatUrl(url, page) {
  const newUrl = new URL(url)

  page && newUrl.searchParams.append('page', page)

  return newUrl.href
}

export default useQuery
