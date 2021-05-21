import { useTheme } from 'styled-components'

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
      border: none;
    }

    button, input[type=button], input[type=submit] {
      background-color: ${colors.ButtonFace};
      color: ${colors.ButtonText};
      padding: 3px 10px;
      -webkit-box-shadow:
        -1px -1px 0 0px ${colors.ButtonDkShadow} inset,
         1px  1px 0 0px ${colors.ButtonLight}    inset,
        -2px -2px 0 0px ${colors.ButtonShadow}   inset,
         2px  2px 0 0px ${colors.ButtonHilight}  inset;
    }

    input:not([type=radio]):not([type=checkbox]):not([type=button]):not([type=submit]), textarea {
      padding: 3px 7px;
      background-color: ${colors.Window};
      color: ${colors.WindowText};
      -webkit-box-shadow:
        -1px -1px 0 0px ${colors.ButtonHilight} inset,
         1px  1px 0 0px ${colors.ButtonShadow}    inset,
        -2px -2px 0 0px ${colors.ButtonLight}   inset,
         2px  2px 0 0px ${colors.ButtonDkShadow}  inset;
    }
  `
}
