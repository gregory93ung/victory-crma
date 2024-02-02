import { ReplaceUrl } from '@/api/fetcherHook/api.types'

export const replaceUrlFn = (url: string, replaceUrl: ReplaceUrl) => {
  const splittedUrl = url.split('/')

  return splittedUrl
    .map((part) => {
      if (part.startsWith(':')) {
        const key = part.slice(1)
        return replaceUrl[key] ? String(replaceUrl[key]) : part
      }

      return part
    })
    .join('/')
}
