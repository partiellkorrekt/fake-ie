// https://social.technet.microsoft.com/Forums/en-US/e86eef1a-c396-4c95-83ce-a9d96751b200/adding-a-new-color-scheme-to-windows-xp?forum=itproxpsp
import { readFileSync } from 'fs'
import { writeFileSync } from 'node:fs'

const sizes = {
  BorderWidth: 2,
  SmCaptionWidth: 3,
  SmCaptionHeight: 4,
  CaptionWidth: 5,
  CaptionHeight: 6,
  ScrollWidth: 30,
  ScrollHeight: 31,
  MenuWidth: 55,
  MenuHeight: 56,
}

const fonts = {
  CaptionFont: [7, 29],
  SmCaptionFont: [32, 54],
  MenuFont: [57, 79],
  StatusFont: [80, 102],
  MessageFont: [103, 125],
  IconFont: [126, 148],
}

const colors = {
  Scrollbar: 149,
  Background: 150,
  ActiveTitle: 151,
  InactiveTitle: 152,
  Menu: 153,
  Window: 154,
  WindowFrame: 155,
  MenuText: 156,
  WindowText: 157,
  TitleText: 158,
  ActiveBorder: 159,
  InactiveBorder: 160,
  AppWorkSpace: 161,
  Hilight: 162,
  HilightText: 163,
  ButtonFace: 164,
  ButtonShadow: 165,
  GrayText: 166,
  ButtonText: 167,
  InactiveTitleText: 168,
  ButtonHilight: 169,
  ButtonDkShadow: 170,
  ButtonLight: 171,
  InfoText: 172,
  InfoWindow: 173,
  ButtonAlternateFace: 174,
  HotTrackingColor: 175,
  GradientActiveTitle: 176,
  GradientInactiveTitle: 177,
}

const minLong = -parseInt('7FFFFFFF', 16) - 1

const parseHexLong = (bytes, log) => {
  const input = bytes
    .map((x) => x.toString(16).padStart(2, '0'))
    .reverse()
    .join('')
  const binary = parseInt(input, 16).toString(2).padStart(32, '0')
  const negative = binary.substr(0, 1) === '1'
  const number = parseInt(binary.substr(1), 2)
  return negative ? number + minLong : number
}

const makeColor = (r, g, b, a) => {
  const hex = [r, g, b].map((x) => x.toString(16).padStart(2, '0'))
  return '#' + hex.join('')
}

const parseScheme = (input) => {
  const values = input.split(',').map((x) => parseInt(x, 16))
  const words = []
  for (let i = 0; i < values.length; i += 4) {
    words.push(values.slice(i, i + 4))
  }
  const result = {
    sizes: {},
    fonts: {},
    colors: {},
  }
  for (const [name, range] of Object.entries(fonts)) {
    // https://docs.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-logfonta
    const bytes = values.slice(range[0] * 4, (range[1] + 1) * 4)
    let font = ''
    for (let i = 7 * 4; i < bytes.length; i += 2) {
      if (bytes[i] === 0) {
        break
      }
      font += String.fromCodePoint(bytes[i])
    }
    result.fonts[name] = {
      height: -Math.round((parseHexLong(words[range[0]]) * 72) / 96),
      width: parseHexLong(words[range[0] + 1]),
      escapement: parseHexLong(words[range[0] + 2]),
      orientation: parseHexLong(words[range[0] + 3]),
      weight: parseHexLong(words[range[0] + 4]),
      italic: !!bytes[20],
      underline: !!bytes[21],
      strikeOut: !!bytes[22],
      charSet: bytes[23],
      outPrecision: bytes[24],
      clipPrecision: bytes[25],
      quality: bytes[26],
      pitchAndFamily: !!bytes[27],
      faceName: font,
    }
  }
  for (const [name, index] of Object.entries(sizes)) {
    result.sizes[name] = parseHexLong(words[index])
  }
  for (const [name, index] of Object.entries(colors)) {
    const [r, g, b, a] = words[index]
    result.colors[name] = makeColor(r, g, b, a)
  }
  // for (let i = 153; i <= 177; i++) {
  //   if (!words[i] || Object.values(colors).includes(i)) {
  //     // console.log(i)
  //   } else {
  //     const [r, g, b, a] = words[i]
  //     result.colors['color' + i] = [r, g, b, a]
  //   }
  // }
  return result
}

const schemes = Object.fromEntries(
  readFileSync('win2000.reg')
    .toString()
    .replace(/\\\n\s*/g, '')
    .split('\n')
    .map((line) => {
      const result = line.match(/^\"(.+)\"=hex:(.+)/)
      if (result) {
        return [result[1], result[2]]
      }
    })
    .filter((x) => !!x)
)
writeFileSync('schemes.win2000.json', JSON.stringify(schemes, undefined, 2))
const parsed = Object.fromEntries(
  Object.entries(schemes).map(([key, value]) => [key, parseScheme(value)])
)
writeFileSync(
  'parsed_schemes.win2000.json',
  JSON.stringify(parsed, undefined, 2)
)
// for (const [schemeName, scheme] of Object.entries(parsed)) {
//   const colors = Object.entries(scheme.colors).map(([name, values]) => [
//     name,
//     values.join(', '),
//   ])
//   for (const [name, values] of colors) {
//     if (!name.startsWith('color')) {
//       continue
//     }
//     if (
//       !colors.find(
//         ([otherName, otherValues]) =>
//           otherName !== name &&
//           otherName.startsWith('color') &&
//           values === otherValues
//       )
//     ) {
//       console.log(
//         `Unique color in scheme "${schemeName}": ${name} => [${values}]`
//       )
//     }
//   }
// }
// for (const name of Object.keys(parsed.test.colors)) {
//   if (name.startsWith('color')) {
//     console.log(name)
//   }
// }
