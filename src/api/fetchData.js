import wrapPromise from './wrapPromise'
import { config } from '../constants'
import CredentialService from '../services/CredentialService'
import { getOptionalApiParameters } from '../utils/ParameterManager'

const fetchData = (url, parameters, method = 'GET', body = null) => {
  const init = {
    method: method,
    headers: {
      'X-Perscom-Id': CredentialService.getPerscomId(),
      'X-Perscom-Widget': true,
      Authorization: `Bearer ${CredentialService.getApiKey()}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }

  if (body) {
    init.body = JSON.stringify(body)
  }

  const currentUrlParams = new URLSearchParams(window.location.search)
  let requestUrl = new URL(config.app.API_URL + url)
  getOptionalApiParameters().forEach((parameter) => {
    if (currentUrlParams.has(parameter)) {
      requestUrl.searchParams.set(parameter, currentUrlParams.get(parameter))
    }
  })

  const promise = fetch(requestUrl, init)
    .then((res) => res.json())
    .then((res) => res)

  return wrapPromise(promise)
}

export default fetchData
