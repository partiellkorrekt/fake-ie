import { useMemo } from 'react'

const OLD_NET_BASE_URL = 'theoldnet.com/get'
const OLD_NET_ERROR_URL = 'theoldnet.com/error'

export type SimulatedLocation = {
  url: string
  year: string | undefined
  decode: boolean | undefined
  scripts: boolean | undefined
}

const parseArciveUrl = (url?: string | null): SimulatedLocation | undefined => {
  const match = url?.match(
    /^https?:\/\/web.archive.org\/web\/(\d\d\d\d)\d*id_\/(.*)$/
  )
  if (match) {
    return {
      url: match[2],
      year: match[1],
      decode: true,
      scripts: false,
    }
  }
}

export const parseRealUrl = (url: string): SimulatedLocation => {
  try {
    const { host, port, pathname, searchParams, hash, protocol } = new URL(url)
    const baseName = `${host}${port ? ':' + port : ''}${pathname}`
    if (OLD_NET_BASE_URL === baseName) {
      const simulatedUrl = searchParams.get('url')
      const year = searchParams.get('year')
      const decode = searchParams.get('decode') !== 'false'
      const scripts = searchParams.get('scripts') !== 'false'
      if (!simulatedUrl || !year) {
        throw new Error('wrong args')
      }
      return {
        url: (simulatedUrl.startsWith('http') ? '' : 'http://') + simulatedUrl,
        year,
        decode,
        scripts,
      }
    }
    if (OLD_NET_ERROR_URL === baseName) {
      const archiveLocation = parseArciveUrl(searchParams.get('url'))
      if (archiveLocation) {
        return archiveLocation
      }
    }
    const archiveLocation = parseArciveUrl(url)
    if (archiveLocation) {
      return archiveLocation
    }
  } catch (e) {}
  return {
    url,
    year: undefined,
    decode: undefined,
    scripts: undefined,
  }
}

const encodeRealUrl = ({
  url,
  year,
  decode = true,
  scripts = false,
}: SimulatedLocation): string => {
  console.log(url, year, decode, scripts)
  if (!year) {
    return url
  }
  let httpUrl = url
  if (httpUrl.startsWith('https://')) {
    httpUrl = 'http://' + httpUrl.substr('https://'.length)
  }
  const realUrl = `https://${OLD_NET_BASE_URL}?year=${encodeURIComponent(
    year
  )}&scripts=${scripts ? 'true' : 'false'}&decode=${
    decode ? 'true' : 'false'
  }&url=${encodeURIComponent(httpUrl)}`
  return realUrl
}

export const useSimulatedLocation = (
  url: string,
  setUrl: (nextUrl: string) => unknown
): {
  url: string
  year: string | undefined
  decode: boolean | undefined
  scripts: boolean | undefined
  setUrl: (nextUrl: string) => void
  setYear: (nextYear: string | undefined) => void
} => {
  const location = useMemo(() => parseRealUrl(url), [url])

  return useMemo(
    () => ({
      ...location,
      setUrl: (nextUrl: string) =>
        setUrl(encodeRealUrl({ ...location, url: nextUrl })),
      setYear: (nextYear: string | undefined) =>
        setUrl(encodeRealUrl({ ...location, year: nextYear })),
    }),
    [location, setUrl]
  )
}
