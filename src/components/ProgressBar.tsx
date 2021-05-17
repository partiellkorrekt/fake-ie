import React, { useCallback, useState } from 'react'
import { LayoutChangeEvent, StyleSheet, View } from 'react-native'
import { useTheme } from 'styled-components'

export type ProgressBarProps = {
  progress?: number
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    marginRight: 1,
  },
  bar: {
    margin: 1,
    width: 6,
    backgroundColor: '#010080',
  },
})

const ProgressBar: React.FC<ProgressBarProps> = ({ progress = 0 }) => {
  const [width, setWidth] = useState(0)
  const onLayout = useCallback((e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width)
  }, [])
  const num = Math.ceil((width * progress) / 8)
  const barColor = useTheme().colors.Hilight

  return (
    <View onLayout={onLayout} style={styles.wrap}>
      {Array.from(Array(num)).map((x, i) => (
        <View key={i} style={[styles.bar, { backgroundColor: barColor }]} />
      ))}
    </View>
  )
}

export default ProgressBar
