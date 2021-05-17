import React from 'react'
import { StyleSheet, TextInputProps } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import styled, { CSSObject, ThemeConsumer, useTheme } from 'styled-components'
import Bevel from './Bevel'

export type InputProps = TextInputProps

const styles = StyleSheet.create({
  wrap: {
    height: 22,
    maxHeight: 22,
    flex: 1,
  },
})

const StyledTextInput = styled(TextInput)`
  font-size: 12px;
  padding-left: 2px;
  padding-top: 1.5px;
  color: ${({ theme }) => theme.colors.WindowText};
`

const Input: React.FC<InputProps> = ({ ...props }) => {
  const backgroundColor = useTheme().colors.Window

  return (
    <Bevel
      type="lowered3d"
      style={styles.wrap}
      innerStyle={{ backgroundColor }}
    >
      <StyledTextInput {...props} />
    </Bevel>
  )
}

export default Input
