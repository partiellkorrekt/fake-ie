import { TextProps, Text } from 'react-native'
import styled from 'styled-components'

export type ToolbarLabelProps = TextProps

const ToolbarLabel = styled(Text)`
  font-family: Arial;
  font-size: 12px;
  margin-horizontal: 2px;
  color: ${({ theme }) => theme.colors.ButtonText};
`

export default ToolbarLabel
