import { Allocation } from 'src/interfaces/allocation'

export type AuthURLs = Record<string, string>;

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

class APIClientBadInput extends Error {}
class APIClientServerError extends Error {}

const BASE_URL = process.env.REACT_APP_SERVER_URI
const PATHS = {
  authUrls: `${BASE_URL}/auth/urls`,
  authToken: `${BASE_URL}/auth/token`,
  allocations: `${BASE_URL}/allocations`,
}

class Client {
  accessToken = ''
  refreshToken = ''
  tokenType = ''

  async getAuthURLS(): Promise<AuthURLs> {
    const url = new URL(PATHS.authUrls)
    return this.call<AuthURLs>(url)
  }

  async checkAuthCode(code: string, state: string): Promise<number> {
    const url = new URL(PATHS.authToken)
    url.searchParams.append('code', code)
    url.searchParams.append('state', state)
    url.searchParams.append('grant_type', 'authorization_code')
    return this.call<TokenResponse>(url)
      .then(response => this.storeTokens(response))
      .then(response => response.expires_in)
  }

  async refreshTokens(): Promise<number> {
    const url = new URL(PATHS.authToken)
    url.searchParams.append('token', this.refreshToken)
    url.searchParams.append('grant_type', 'refresh_token')
    return this.call<TokenResponse>(url)
      .then(response => this.storeTokens(response))
      .then(response => response.expires_in)
  }

  async getAllocations(): Promise<Array<string>> {
    const url = new URL(PATHS.allocations)
    return this.callWithAuth<Array<string>>(url)
  }

  async getAllocation(id: string): Promise<Allocation> {
    const url = new URL(`${PATHS.allocations}/${id}`)
    return this.callWithAuth<Allocation>(url)
  }

  async callWithAuth<T>(url: URL, options?: RequestInit): Promise<T> {
    const headers = options && options.headers
      ? { ...options.headers }
      : {}
    const authedOptions = {
      ...options,
      headers: {
        ...headers,
        Authorization: `${this.tokenType} ${this.accessToken}`,
      },
    }
    return this.call(url, authedOptions)
  }

  async call<T>(url: URL, options?: RequestInit): Promise<T> {
    return fetch(url.toString(), { mode: 'cors', ...options })
      .then(this.parseErrors)
      .then(response => response.json())
      .then(data => data as T)
  }

  storeTokens(response: TokenResponse): TokenResponse {
    this.accessToken = response.access_token
    this.refreshToken = response.refresh_token
    return response
  }

  parseErrors(response: Response): Response {
    if (response.status >= 400 && response.status <= 499) {
      throw new APIClientBadInput('Bad request')
    }
    if (response.status >= 500 && response.status <= 599) {
      throw new APIClientServerError('Server Failed')
    }
    return response
  }
}

export { Client }
