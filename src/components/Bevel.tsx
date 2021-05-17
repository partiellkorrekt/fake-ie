import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import styled, { css } from 'styled-components'
import { SchemeColorName } from '../colorschemes/constants'
import TraditionalBorderView from './TraditionalBorderView'

export type BevelType =
  | 'raised3d'
  | 'lowered3d'
  | 'lowered3dFlat'
  | 'raised3dFlat'

export type BevelProps = {
  type?: BevelType
  style?: StyleProp<ViewStyle>
  innerStyle?: StyleProp<ViewStyle>
}

const Borders = styled(TraditionalBorderView)<{
  $colors: [SchemeColorName, SchemeColorName, SchemeColorName, SchemeColorName]
  $outerWrap: boolean
  $innerWrap: boolean
}>`
  border-width: 1px;
  border-top-color: ${({ theme, $colors }) => theme.colors[$colors[0]]};
  border-right-color: ${({ theme, $colors }) => theme.colors[$colors[1]]};
  border-bottom-color: ${({ theme, $colors }) => theme.colors[$colors[2]]};
  border-left-color: ${({ theme, $colors }) => theme.colors[$colors[3]]};
  ${({ $outerWrap }) =>
    $outerWrap
      ? ''
      : css`
          flex: 1;
        `}
  ${({ $innerWrap, theme }) =>
    $innerWrap
      ? css`
          background-color: ${theme.colors['ButtonFace']};
        `
      : ''}
`

const borderColors: Partial<
  {
    [key in BevelType]: [
      SchemeColorName,
      SchemeColorName,
      SchemeColorName,
      SchemeColorName
    ][]
  }
> = {
  raised3d: [
    ['ButtonLight', 'ButtonDkShadow', 'ButtonDkShadow', 'ButtonLight'],
    ['ButtonHilight', 'ButtonShadow', 'ButtonShadow', 'ButtonHilight'],
  ],
  lowered3d: [
    ['ButtonShadow', 'ButtonHilight', 'ButtonHilight', 'ButtonShadow'],
    ['ButtonDkShadow', 'ButtonLight', 'ButtonLight', 'ButtonDkShadow'],
  ],
  lowered3dFlat: [
    ['ButtonShadow', 'ButtonHilight', 'ButtonHilight', 'ButtonShadow'],
  ],
  raised3dFlat: [
    ['ButtonHilight', 'ButtonShadow', 'ButtonShadow', 'ButtonHilight'],
  ],
}

const Bevel: React.FC<BevelProps> = ({
  type = 'raised3d',
  children,
  style,
  innerStyle,
}) => {
  const myBorderColors = borderColors[type] ?? []
  let result = <>{children}</>

  for (let i = myBorderColors.length - 1; i >= 0; i--) {
    const outerWrap = i === 0
    const innerWrap = i === myBorderColors.length - 1
    result = (
      <Borders
        $colors={myBorderColors[i]}
        $outerWrap={outerWrap}
        $innerWrap={innerWrap}
        style={[outerWrap && style, innerWrap && innerStyle]}
      >
        {result}
      </Borders>
    )
  }

  return result
}

export default Bevel
