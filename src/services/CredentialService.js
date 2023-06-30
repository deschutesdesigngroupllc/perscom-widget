import { config } from '../constants'

const getApiKey = (searchParams) => {
  return searchParams.get('apikey') ?? config.app.API_KEY ?? null
}

const getPerscomId = (searchParams) => {
  return searchParams.get('perscomid') ?? config.app.PERSCOM_ID ?? null
}

const CredentialService = {
  getApiKey,
  getPerscomId
}

export default CredentialService
