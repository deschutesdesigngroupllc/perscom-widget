import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getOptionalApiParameters } from '../utils/ParameterManager'
import CredentialService from '../services/CredentialService'

/**
 * @param url
 * @param parameters
 * @param method
 * @param body
 * @returns {{data, meta, links: *, loading: boolean, error: string, statusCode: undefined}}
 */
const useFetch = ({ url, parameters, method = 'GET', body = null, dependencies = null }) => {
  const [statusCode, setStatusCode] = useState()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchParams] = useSearchParams()

  useEffect(() => {
    createRequest(createRequestUrl(url, searchParams, parameters), method, createHeaders(searchParams), body)
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
          case 429:
            setError('Too Many Requests: You have made too many requests to the PERSCOM.io API. Please wait a minute and try again.')
            break
          case 500:
            setError('Error: We received an error while trying to communicate with the PERSCOM.io API.')
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
  }, [url, dependencies])

  return { data: data.data, links: data.links, meta: data.meta, statusCode, loading, error }
}

/**
 * @param url
 * @param method
 * @param headers
 * @param body
 * @returns {Promise<Response>}
 */
export const createRequest = (url, method = 'GET', headers = {}, body = null) => {
  const init = {
    method: method,
    headers: headers
  }

  if (body) {
    init.body = JSON.stringify(body)
  }

  return fetch(url, init)
}

/**
 * @param url
 * @param searchParams
 * @param parameters
 * @returns {string}
 */
const createRequestUrl = (url, searchParams, parameters = null) => {
  const currentUrl = new URL(url)
  getOptionalApiParameters().forEach((parameter) => {
    if (searchParams.has(parameter)) {
      currentUrl.searchParams.set(parameter, searchParams.get(parameter))
    }
  })

  const apiParams = Array.isArray(parameters) ? parameters : [parameters]
  if (parameters && apiParams.length) {
    apiParams.forEach((parameter) => {
      if (parameter['value']) {
        currentUrl.searchParams.set(parameter['key'], parameter['value'])
      }
    })
  }

  return currentUrl.href
}

/**
 * @param searchParams
 * @param additionalHeaders
 * @returns {{Authorization: string, Accept: string, 'X-Perscom-Id': *|null, 'X-Perscom-Widget': boolean, 'Content-Type': string}}
 */
export const createHeaders = (searchParams, additionalHeaders = {}) => {
  return {
    ...additionalHeaders,
    ...{
      'X-Perscom-Id': CredentialService.getPerscomId(searchParams),
      'X-Perscom-Widget': true,
      Authorization: `Bearer ${CredentialService.getApiKey(searchParams)}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }
}

export default useFetch
