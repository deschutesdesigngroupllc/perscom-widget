import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { config } from '../constants'
import { getOptionalApiParameters } from '../utils/ParameterManager'

const useQuery = ({ url }) => {
  const [statusCode, setStatusCode] = useState()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [searchParams] = useSearchParams()

  const apiKey = searchParams.get('apikey') ?? config.app.API_KEY ?? null
  const perscomId = searchParams.get('perscomid') ?? config.app.PERSCOM_ID ?? null

  const headers = {
    'X-Perscom-Id': perscomId,
    'X-Perscom-Widget': true,
    Authorization: `Bearer ${apiKey}`,
    Accept: 'application/json'
  }

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

const composeQueryUrl = (url, currentSearchParams) => {
  const currentUrl = new URL(url)
  getOptionalApiParameters().forEach((parameter) => {
    if (currentSearchParams.has(parameter)) {
      currentUrl.searchParams.set(parameter, currentSearchParams.get(parameter))
    }
  })

  return currentUrl.href
}

export default useQuery
