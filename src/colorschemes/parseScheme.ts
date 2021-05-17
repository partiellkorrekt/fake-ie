import {
  colorLocations,
  fontLocations,
  optionalColorLocations,
  SchemeColorName,
  SchemeFontName,
  SchemeOptionalColorName,
  SchemeSizeName,
  sizeLocations,
} from './constants'
import schemeData from './schemes.win2000.json'
import _ from 'lodash'

export type FontDescription = {
  height: number
  width: number
  escapement: number
  orientation: number
  weight: number
  italic: boolean
  underline: boolean
  strikeOut: boolean
  charSet: number
  outPrecision: number
  clipPrecision: number
  quality: number
  pitchAndFamily: boolean
  faceName: String
}

const minLong = -parseInt('7FFFFFFF', 16) - 1
const parseHexLong = (bytes: number[]) => {
  const input = bytes
    .map((x) => x.toString(16).padStart(2, '0'))
    .reverse()
    .join('')
  const binary = parseInt(input, 16).toString(2).padStart(32, '0')
  const negative = binary.substr(0, 1) === '1'
  const number = parseInt(binary.substr(1), 2)
  return negative ? number + minLong : number
}

const parseString = (bytes: number[]): string => {
  let result = ''
  for (let i = 0; i < bytes.length; i += 2) {
    if (bytes[i] === 0) {
      break
    }
    result += String.fromCodePoint(bytes[i])
  }
  return result
}

const parseFont = (bytes: number[]): FontDescription => {
  // https://docs.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-logfonta
  return {
    height: -Math.round((parseHexLong(bytes.slice(0, 4)) * 72) / 96),
    width: parseHexLong(bytes.slice(4, 8)),
    escapement: parseHexLong(bytes.slice(8, 12)),
    orientation: parseHexLong(bytes.slice(12, 16)),
    weight: parseHexLong(bytes.slice(16, 20)),
    italic: !!bytes[20],
    underline: !!bytes[21],
    strikeOut: !!bytes[22],
    charSet: bytes[23],
    outPrecision: bytes[24],
    clipPrecision: bytes[25],
    quality: bytes[26],
    pitchAndFamily: !!bytes[27],
    faceName: parseString(bytes.slice(28)),
  }
}

const parseColor = (bytes: number[]): string => {
  const [r, g, b, a] = bytes
  const hex = [r, g, b].map((x) => x.toString(16).padStart(2, '0'))
  return '#' + hex.join('')
}

export interface Scheme {
  sizes: {
    [key in SchemeSizeName]: number
  }
  fonts: {
    [key in SchemeFontName]: FontDescription
  }
  colors: {
    [key in SchemeColorName]: string
  } &
    {
      [key in SchemeOptionalColorName]?: string
    }
}

const parseScheme = (input: string): Scheme => {
  const values = input.split(',').map((x) => parseInt(x, 16))
  const result: Scheme = {
    sizes: _.mapValues(sizeLocations, (index) =>
      parseHexLong(values.slice(index * 4, (index + 1) * 4))
    ),
    fonts: _.mapValues(fontLocations, ([start, end]) =>
      parseFont(values.slice(start * 4, (end + 1) * 4))
    ),
    colors: {
      ..._.mapValues(colorLocations, (index) =>
        parseColor(values.slice(index * 4, (index + 1) * 4))
      ),
      ..._.mapValues(optionalColorLocations, (index) => {
        if (values.length >= (index + 1) * 4) {
          return parseColor(values.slice(index * 4, (index + 1) * 4))
        }
      }),
    },
  }
  return result
}

const schemes = _.mapValues(schemeData, parseScheme) as Record<string, Scheme>
console.log(schemes)
export default schemes
