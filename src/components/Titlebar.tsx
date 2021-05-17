import { LinearGradient } from 'expo-linear-gradient'
import React, { useCallback, useMemo } from 'react'
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native'
import styled, { useTheme } from 'styled-components'
import Bevel from './Bevel'
import makeIcon from './Icon'

export type TitlebarProps = {
  title?: string
  maximized?: boolean
  setMaximized?: React.Dispatch<React.SetStateAction<boolean>>
}
const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#010080',
  },
  inner: {
    height: 18,
    flexDirection: 'row',
  },
  favicon: {
    width: 16,
    height: 16,
    marginTop: 1,
    marginLeft: 1,
  },
  text: {
    color: '#fff',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 2,
    marginLeft: 3,
    flex: 1,
  },
  windowControls: {
    width: 50,
    height: 14,
    margin: 2,
  },
  windowControlWrap: {
    flexDirection: 'row',
    paddingLeft: 2,
    margin: 2,
  },
})

const Wrap = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.colors.ActiveTitle};
`

const TitleText = styled(Text)`
  color: ${({ theme }) => theme.colors.TitleText};
  font-family: Arial;
  font-weight: ${({ theme }) => theme.fonts.CaptionFont.weight};
  font-size: 12px;
  margin-top: 2px;
  margin-left: 3px;
  flex: 1;
`

const windowControlNames = ['minimize', 'restore', 'maximize', 'close'] as const
const WindowControlIcon = makeIcon({
  source: require('../assets/window_controls.png'),
  width: 10,
  height: 10,
  names: windowControlNames,
  direction: 'horizontal',
})

const WindowControl: React.FC<{
  icon: typeof windowControlNames[number]
}> = ({ icon }) => {
  const style = useMemo<ViewStyle>(
    () => ({
      width: 16,
      height: 14,
      marginLeft: icon === 'close' ? 2 : 0,
    }),
    [icon]
  )

  const innerStyle = useMemo<ViewStyle>(
    () => ({
      paddingLeft: 1,
    }),
    []
  )

  const tintColor = useTheme().colors.ButtonText

  return (
    <Bevel type="raised3d" style={style} innerStyle={innerStyle}>
      <WindowControlIcon name={icon} tintColor={tintColor} />
    </Bevel>
  )
}

const gStart = { x: 0, y: 0 }
const gEnd = { x: 1, y: 0 }

const Titlebar: React.FC<TitlebarProps> = ({
  title,
  maximized,
  setMaximized,
}) => {
  const toggleMaximized = useCallback(() => {
    setMaximized?.((x) => !x)
  }, [setMaximized])

  const { ActiveTitle, GradientActiveTitle } = useTheme().colors
  const gradient = useMemo(
    () => [ActiveTitle, GradientActiveTitle ?? ActiveTitle],
    [ActiveTitle, GradientActiveTitle]
  )

  return (
    <LinearGradient colors={gradient} start={gStart} end={gEnd}>
      <View style={styles.inner}>
        <Image
          source={require('../assets/favicon.png')}
          resizeMethod="resize"
          style={styles.favicon}
        />
        <TitleText numberOfLines={1} ellipsizeMode="head">
          {title}
        </TitleText>
        <TouchableWithoutFeedback onPress={toggleMaximized}>
          <View style={styles.windowControlWrap}>
            <WindowControl icon="minimize" />
            <WindowControl icon={maximized ? 'restore' : 'maximize'} />
            <WindowControl icon="close" />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </LinearGradient>
  )
}

export default Titlebar
