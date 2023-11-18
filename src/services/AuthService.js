import CredentialService from './CredentialService'
import { jwtDecode } from 'jwt-decode'

const decodeTokenPayload = (searchParams) => {
  return jwtDecode(CredentialService.getApiKey(searchParams))
}

const getSub = (searchParams) => {
  return decodeTokenPayload(searchParams)?.sub
}

const AuthService = {
  decodeTokenPayload,
  getSub
}

export default AuthService
