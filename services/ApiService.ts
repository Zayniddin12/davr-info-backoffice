import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { App } from 'vue'
import VueAxios from 'vue-axios'

import { JwtService } from '@/services/JwtService'

class ApiService {
  public static vueInstance: App

  public static init(app: App<Element>) {
    ApiService.vueInstance = app
    ApiService.vueInstance.use(VueAxios, axios)
    ApiService.vueInstance.axios.defaults.baseURL =
      import.meta.env.VITE_APP_BASE_URL
  }

  public static async refreshToken(axios: AxiosInstance, router: any) {
    return new Promise(async (resolve, reject) => {
      const refresh = JwtService.getRefresh()
      if (!refresh) {
        JwtService.destroyAccess()
        await router.push({ name: 'PAuth' })
        return reject('No refresh token available')
      }

      const headersWithoutAuth = { ...axios.defaults.headers }
      delete headersWithoutAuth.common.Authorization

      try {
        const { data } = await axios.post<{ access: string }>(
          import.meta.env.VITE_APP_BASE_URL + '/account/TokenRefresh/',
          { refresh },
          { headers: { ...headersWithoutAuth.post } },
        )

        JwtService.saveToken(data.access)
        ApiService.setHeader()
        resolve(data.access)
      } catch (error) {
        this.unsetHeader()
        localStorage.removeItem('refresh')
        localStorage.removeItem('id_token')
        JwtService.destroyAccess()
        JwtService.destroyRefresh()
        await router.push({ name: 'PAuth' })
        reject(error)
      }
    })
  }

  public static handleResponseError(axios: AxiosInstance, router: any) {
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const errorResponse = error?.response
        let originalRequest = error?.config

        if (errorResponse?.status === 401) {
          const isRefresh = originalRequest?.url?.includes(
            'account/TokenRefresh/',
          )
          if (isRefresh) {
            JwtService.destroyAccess()
            JwtService.destroyRefresh()
            await router.push({ name: 'PAuth' })
            return Promise.reject(error)
          }

          if (originalRequest) {
            try {
              const newToken = await this.refreshToken(axios, router)
              if (newToken && originalRequest?.headers) {
                originalRequest.headers.Authorization = `Bearer ${newToken}`
                return axios(originalRequest)
              }
            } catch (refreshError) {
              return Promise.reject(refreshError)
            }
          }
        }

        if (errorResponse?.status === 404) {
          await router.replace({ name: '404' })
        }

        return Promise.reject(error)
      },
    )
  }

  public static setHeader(): void {
    ApiService.vueInstance.axios.defaults.headers.common['Authorization'] =
      JwtService.getToken() ? `Bearer ${JwtService.getToken()}` : undefined
    ApiService.vueInstance.axios.defaults.headers.common['Accept-Language'] =
      localStorage.getItem('locale') || 'ru'
  }

  public static unsetHeader(): void {
    ApiService.vueInstance.axios.defaults.headers.common['Authorization'] = ``
  }

  public static query<T>(
    resource: string,
    params: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return ApiService.vueInstance.axios.get(resource, params)
  }

  public static get<R = any>(
    resource: string,
    slug = '' as string,
  ): Promise<AxiosResponse<R>> {
    return ApiService.vueInstance.axios.get(`${resource}/${slug}`)
  }

  public static post<T = any, R = any>(
    resource: string,
    data?: T,
    params?: AxiosRequestConfig,
  ): Promise<AxiosResponse<R>> {
    return ApiService.vueInstance.axios.post(`${resource}`, data, params)
  }

  public static update<T = any, R = any>(
    resource: string,
    slug: string,
    data?: T,
    params?: AxiosRequestConfig,
  ): Promise<AxiosResponse<R>> {
    return ApiService.vueInstance.axios.put(`${resource}/${slug}`, data, params)
  }

  public static put<T = any, R = any>(
    resource: string,
    data?: T,
    params?: AxiosRequestConfig,
  ): Promise<AxiosResponse<R>> {
    return ApiService.vueInstance.axios.put(`${resource}`, data, params)
  }

  public static patch<T = any, R = any>(
    resource: string,
    data?: T,
    params?: AxiosRequestConfig,
  ): Promise<AxiosResponse<R>> {
    return ApiService.vueInstance.axios.patch(`${resource}`, data, params)
  }

  public static delete<T = any>(
    resource: string,
    params?: T,
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.delete(`${resource}`, { params })
  }
}

export default ApiService
