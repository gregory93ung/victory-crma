import { AxiosRequestConfig, AxiosInstance } from 'axios'
import qs from 'query-string'

import { replaceUrlFn } from '@/utils/stringUtils'
import { getLocalStorageItem, LocalStorageKeys, removeLocalStorageItem } from '@/utils/localStorage'
import { ReplaceUrl } from './fetcherHook/api.types'

type AppAxiosRequestConfig = AxiosRequestConfig & {
  replaceUrl?: ReplaceUrl
  needFullAxiosResp?: boolean
}

function filterNonNull(obj: any) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => {
      return !isNaN(v as any) || (v && (v as string).length)
    })
  )
}

export class ApiClass {
  headers: Record<string, string> = {}

  constructor(private axios: AxiosInstance) {}

  request(options: AppAxiosRequestConfig) {
    const token = getLocalStorageItem(LocalStorageKeys.USER)
    this.headers.Authorization = `Bearer ${token}`
    const { needFullAxiosResp, replaceUrl } = options
    let { url } = options

    if (url && replaceUrl) url = replaceUrlFn(url, replaceUrl)

    return this.axios
      .request({
        ...options,
        url,
        headers: {
          ...this.headers,
          ...options.headers,
        },
        params: filterNonNull({ ...options.params }),
        paramsSerializer: {
          serialize: (params: any) => qs.stringify(params, { arrayFormat: 'none' }),
        },
      })
      .then((resp) => {
        if (needFullAxiosResp) {
          return resp
        }

        return resp.data
      })
      .catch((error) => {
        if (error.response.status === 401) {
          removeLocalStorageItem(LocalStorageKeys.USER)
          window.location.reload()
        }
        return Promise.reject(error)
      })
  }

  get(url: string, options?: AppAxiosRequestConfig) {
    return this.request({
      ...options,
      method: 'GET',
      url,
    })
  }

  post(url: string, data: any, options?: AppAxiosRequestConfig) {
    return this.request({
      ...options,
      method: 'POST',
      data: { ...data },
      url,
    })
  }

  put(url: string, data: any, options?: AppAxiosRequestConfig) {
    return this.request({
      ...options,
      method: 'PUT',
      data,
      url,
    })
  }

  patch(url: string, data: any, options?: AppAxiosRequestConfig) {
    return this.request({
      ...options,
      method: 'PATCH',
      data,
      url,
    })
  }

  delete(url: string, options?: AppAxiosRequestConfig) {
    return this.request({
      ...options,
      method: 'DELETE',
      url,
    })
  }

  options(url: string, options?: AppAxiosRequestConfig) {
    return this.request({
      ...options,
      method: 'OPTIONS',
      url,
    })
  }
}
