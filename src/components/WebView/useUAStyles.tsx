import { useTheme } from 'styled-components'

const svgDataUrl = (svgCode: string): string => {
  return `data:image/svg+xml,${encodeURIComponent(
    svgCode
      .trim()
      .replace(/[\n\t]/g, ' ')
      .replace(/\s+/g, ' ')
  )}`
}

const borderSvg = (c1: string, c2: string, c3: string, c4: string): string => `
  <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6">
    <g fill="transparent" stroke-width="1" stroke-linecap="butt">
      <path d="M1.5 4 L1.5 1.5 L4 1.5" stroke="${c4}" />
      <path d="M1 4.5 L4.5 4.5 L4.5 1" stroke="${c3}" />
      <path d="M0.5 5 L0.5 0.5 L5 0.5" stroke="${c2}" />
      <path d="M0 5.5 L5.5 5.5 L5.5 0" stroke="${c1}" />
    </g>
  </svg>
`

const borderImage = (
  c1: string,
  c2: string,
  c3: string,
  c4: string
): string => `
  -webkit-border-image: url("${svgDataUrl(
    borderSvg(c1, c2, c3, c4)
  )}") 2 2 repeat;
  border-image: url("${svgDataUrl(borderSvg(c1, c2, c3, c4))}") 2 2 repeat;
`

// Fake User-Agent styles to simulate Windows 9x/2000
export const useUAStyles = (): string => {
  const colors = useTheme().colors

  return `
    input:not([type=radio]):not([type=checkbox]), button, textarea {
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
      ${borderImage(
        colors.ButtonDkShadow,
        colors.ButtonLight,
        colors.ButtonShadow,
        colors.ButtonHilight
      )}
    }

    button:focus, input[type=button]:focus, input[type=submit]:focus, input[type=reset]:focus {
      outline: 1px solid ${colors.ButtonDkShadow};
    }

    input:not([type=radio]):not([type=checkbox]):not([type=button]):not([type=submit]):not([type=reset]), textarea {
      padding: 2px 5px;
      background-color: ${colors.Window};
      color: ${colors.WindowText};
      border: 2px solid black;
      ${borderImage(
        colors.ButtonHilight,
        colors.ButtonShadow,
        colors.ButtonLight,
        colors.ButtonDkShadow
      )}
    }

    input:not([type=radio]):not([type=checkbox]):not([type=button]):not([type=submit]):not([type=reset]):focus, textarea:focus {
      outline: none;
    }
  `
}
