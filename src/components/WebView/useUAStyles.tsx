import { useTheme } from 'styled-components'
import { Scheme } from '../../colorschemes/parseScheme'

const svgDataUrl = (svgCode: string): string => {
  return `data:image/svg+xml,${encodeURIComponent(
    svgCode
      .trim()
      .replace(/[\n\t]/g, ' ')
      .replace(/\s+/g, ' ')
  )}`
}

const borderSvgPaths = (
  colors: [string, string, string, string],
  [width, height]: [number, number]
): string => {
  const corners = [
    [
      [0, height - 0.5],
      [width - 0.5, height - 0.5],
      [width - 0.5, 0],
    ],
    [
      [0.5, height - 1],
      [0.5, 0.5],
      [width - 0.5, 0.5],
    ],
    [
      [1, height - 1.5],
      [width - 1.5, height - 1.5],
      [width - 1.5, 1],
    ],
    [
      [1.5, height - 2],
      [1.5, 1.5],
      [width - 2, 1.5],
    ],
  ]

  return `
    <g fill="transparent" stroke-width="1" stroke-linecap="butt">
      ${colors
        .map((color, i) => {
          const d = corners[i]
            .map((x, j) => (j ? 'L' : 'M') + x.join(' '))
            .join('')
          return `<path d="${d}" stroke="${color}" />`
        })
        .reverse()
        .join('')}
    </g>
  `
}

const borderImage = (colors: Scheme['colors'], inset?: boolean): string => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6">
      ${borderSvgPaths(
        inset
          ? [
              colors.ButtonHilight,
              colors.ButtonShadow,
              colors.ButtonLight,
              colors.ButtonDkShadow,
            ]
          : [
              colors.ButtonDkShadow,
              colors.ButtonLight,
              colors.ButtonShadow,
              colors.ButtonHilight,
            ],
        [6, 6]
      )}
    </svg>
  `

  return `
  -webkit-border-image: url("${svgDataUrl(svg)}") 2 2 repeat;
  border-image: url("${svgDataUrl(svg)}") 2 2 repeat;
`
}

const selectBorderImage = (colors: Scheme['colors']): string => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="100" viewBox="0 0 24 100">
      ${borderSvgPaths(
        [
          colors.ButtonHilight,
          colors.ButtonShadow,
          colors.ButtonLight,
          colors.ButtonDkShadow,
        ],
        [24, 100]
      )}
      <g transform="translate(6, 2)">
        ${borderSvgPaths(
          [
            colors.ButtonDkShadow,
            colors.ButtonLight,
            colors.ButtonShadow,
            colors.ButtonHilight,
          ],
          [16, 96]
        )}
      </g>
      <rect x="2" y="2" width="4" height="96" fill="${colors.Window}" />
      <rect x="8" y="4" width="12" height="92" fill="${colors.ButtonFace}" />
      <g transform="translate(10, 48)">>
      <path d="M 0 0l7 0 l0 1l-1 0 l0 1l-1 0 l0 1l-1 0 l0 1l-1 0   l0 -1l-1 0 l0 -1l-1 0 l0 -1l-1 0 l0 -1l-1 0" fill="${
        colors.ButtonText
      }" />
      </g>
    </svg>
  `

  return `
  -webkit-border-image: url("${svgDataUrl(svg)}") 4 18 4 4 repeat;
  border-image: url("${svgDataUrl(svg)}") 4 18 4 4 repeat;
`
}

// Fake User-Agent styles to simulate Windows 9x/2000
export const useUAStyles = (): string => {
  const colors = useTheme().colors

  return `
    body {
      background: paint(box);
    }

    input:not([type=radio]):not([type=checkbox]), button, textarea, select {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border-radius: 0;
      font-family: Arial;
      font-size: 12px;
      line-height: 16px;
    }

    button, input[type=button], input[type=submit] {
      background-color: ${colors.ButtonFace};
      color: ${colors.ButtonText};
      padding: 2px 8px;
      border: 2px solid black;
      ${borderImage(colors)}
    }

    button:focus, input[type=button]:focus, input[type=submit]:focus, input[type=reset]:focus, select {
      outline: none;
    }

    input:not([type=radio]):not([type=checkbox]):not([type=button]):not([type=submit]):not([type=reset]), textarea, select {
      padding: 2px 5px;
      background-color: ${colors.Window};
      color: ${colors.WindowText};
      border: 2px solid black;
      ${borderImage(colors, true)}
    }

    select {
      padding: 0px 10px 0px 3px;
      border-width: 4px 18px 4px 4px;
      ${selectBorderImage(colors)}
    }

    input:not([type=radio]):not([type=checkbox]):not([type=button]):not([type=submit]):not([type=reset]):focus, textarea:focus {
      outline: none;
    }
  `
}
