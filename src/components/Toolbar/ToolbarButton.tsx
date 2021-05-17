import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import styled from 'styled-components'
import ToolbarIcon, { ToolbarIconName } from './ToolbarIcon'

export type ToolbarButtonProps = {
  icon?: ToolbarIconName
  label?: string
  disabled?: boolean
  onPress?: () => void
}

const styles = StyleSheet.create({
  wrap: {
    width: 50,
    alignItems: 'center',
  },
  label: {
    position: 'relative',
    zIndex: 1,
    fontFamily: 'Arial',
    fontSize: 12,
    lineHeight: 12,
    marginTop: 2,
  },
  labelDisabled: {
    color: '#87888F',
  },
  shadowLabel: {
    zIndex: 0,
    marginTop: -11,
    marginLeft: 1,
    marginBottom: -1,
    color: '#fff',
  },
})

const Label = styled(Text)<{ $disabled?: boolean }>`
  position: relative;
  z-index: 1;
  font-family: Arial;
  font-size: 12px;
  line-height: 12px;
  margin-top: 2px;
  color: ${({ theme, $disabled }) =>
    theme.colors[$disabled ? 'ButtonShadow' : 'ButtonText']};
`

const ShadowLabel = styled(Label)`
  z-index: 0;
  margin-top: -11px;
  margin-left: 2px;
  margin-bottom: -1px;
  color: ${({ theme }) => theme.colors['ButtonHilight']};
`

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  icon,
  label,
  disabled,
  onPress,
}) => {
  const [pressed, setPressed] = useState(false)
  const onPressIn = useCallback(() => setPressed(true), [])
  const onPressOut = useCallback(() => setPressed(false), [])

  return (
    <TouchableWithoutFeedback
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={disabled ? undefined : onPress}
    >
      <View style={styles.wrap}>
        <ToolbarIcon name={icon} disabled={disabled} hover={pressed} />
        <Label $disabled={disabled}>{label}</Label>
        {disabled && <ShadowLabel>{label}</ShadowLabel>}
      </View>
    </TouchableWithoutFeedback>
  )
}

export default ToolbarButton
