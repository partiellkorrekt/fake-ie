import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from 'styled-components'
import makeIcon from '../Icon'

const iconNames = [
  'go_back',
  'go_forward',
  'stop',
  'refresh',
  'home',
  'search',
  'favorites',
  'print',
  'font-size',
  'edit',
  'tools',
  'tools-disabled',
  'stop-loading',
  'mail',
] as const

const Icon = makeIcon({
  source: require('../../assets/toolbaricons/toolbaricons.png'),
  height: 20,
  width: 30,
  names: iconNames,
  direction: 'horizontal',
})
const IconDisabled = makeIcon({
  source: require('../../assets/toolbaricons/toolbaricons-disabled.png'),
  height: 20,
  width: 30,
  names: iconNames,
  direction: 'horizontal',
})
const IconHover = makeIcon({
  source: require('../../assets/toolbaricons/toolbaricons-hover.png'),
  height: 20,
  width: 30,
  names: iconNames,
  direction: 'horizontal',
})

export type ToolbarIconName = typeof iconNames[number]

export type ToolbarIconProps = {
  name?: ToolbarIconName
  disabled?: boolean
  hover?: boolean
}
const styles = StyleSheet.create({
  outerWrap: {
    height: 20,
    width: 30,
  },
  wrap: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
  wrap2: {
    height: '100%',
    width: '100%',
    marginTop: 1,
    marginBottom: -21,
    marginLeft: 1,
    overflow: 'hidden',
  },
})

const ToolbarIcon: React.FC<ToolbarIconProps> = ({ name, disabled, hover }) => {
  const index = Math.max(0, iconNames.indexOf(name ?? 'go_back'))
  const { ButtonShadow, ButtonHilight } = useTheme().colors

  return (
    <>
      <View style={styles.outerWrap}>
        {disabled && (
          <View style={styles.wrap2}>
            <IconDisabled name={name} tintColor={ButtonHilight} />
          </View>
        )}
        <View style={styles.wrap}>
          {disabled ? (
            <IconDisabled name={name} tintColor={ButtonShadow} />
          ) : hover ? (
            <IconHover name={name} />
          ) : (
            <Icon name={name} />
          )}
        </View>
      </View>
    </>
  )
}

export default ToolbarIcon
