import { config } from '../constants'

const getApiKey = () => {
  const urlParams = new URLSearchParams(window.location.search)

  return urlParams.get('apikey') ?? config.app.API_KEY ?? null
}

const getPerscomId = () => {
  const urlParams = new URLSearchParams(window.location.search)

  return urlParams.get('perscomid') ?? config.app.PERSCOM_ID ?? null
}

const CredentialService = {
  getApiKey,
  getPerscomId
}

export default CredentialService
