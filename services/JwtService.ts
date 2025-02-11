const ID_TOKEN_KEY = 'id_token' as string
const REFRESH_KEY = 'refresh' as string
export class JwtService {
  static getToken = (): string | null => {
    return window.localStorage.getItem(ID_TOKEN_KEY)
  }
  static getRefresh = (): string | null => {
    return window.localStorage.getItem(REFRESH_KEY)
  }

  /**
   * @description save token into localStorage
   * @param token
   */
  static saveToken = (token: string): void => {
    window.localStorage.setItem(ID_TOKEN_KEY, token)
  }
  static saveRefreshToken = (token: string): void => {
    window.localStorage.setItem(REFRESH_KEY, token)
  }
  static destroyAccess = (): void => {
    window.localStorage.removeItem(ID_TOKEN_KEY)
  }
  /**
   * @description remove token form localStorage
   */
  static destroyRefresh = (): void => {
    window.localStorage.removeItem(REFRESH_KEY)
  }
}
