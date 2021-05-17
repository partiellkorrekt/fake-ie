import React, { useEffect, useMemo, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Bevel from '../Bevel'
import Animated, {
  and,
  block,
  Clock,
  clockRunning,
  cond,
  Easing,
  eq,
  not,
  set,
  startClock,
  stopClock,
  timing,
  useAnimatedStyle,
  useCode,
  useSharedValue,
  Value,
} from 'react-native-reanimated'

export type ToolbarLogoProps = {
  animating?: boolean
}
const styles = StyleSheet.create({
  wrap: {
    width: 42,
    height: 42,
    flex: 0,
  },
  inner: {
    backgroundColor: '#000',
    overflow: 'hidden',
  },
  imageWrap: {
    margin: 1,
    width: 38,
    height: 38,
    overflow: 'hidden',
  },
})

const frameCount = 46
const introFrameCount = 4
const fps = 15

const loopFrame = (
  frameNo: number,
  frameCount: number,
  introFrameCount: number
) => {
  if (frameNo < frameCount) {
    return frameNo
  } else {
    return (
      ((frameNo - introFrameCount) % (frameCount - introFrameCount)) +
      introFrameCount
    )
  }
}

const ToolbarLogo: React.FC<ToolbarLogoProps> = ({ animating }) => {
  const currentFrame = useSharedValue(0)
  useEffect(() => {
    if (animating) {
      const startTime = new Date().getTime()
      const frameTime = 1000 / fps
      const interval = setInterval(() => {
        const elapsedTime = new Date().getTime() - startTime
        const nextFrame = Math.round(elapsedTime / frameTime)
        currentFrame.value = loopFrame(nextFrame, frameCount, introFrameCount)
      }, frameTime)
      return () => {
        clearInterval(interval)
        currentFrame.value = 0
      }
    }
  }, [animating])

  const imageStyle = useAnimatedStyle(
    () => ({
      marginTop: currentFrame.value * -styles.imageWrap.height,
    }),
    []
  )

  return (
    <Bevel type="raised3dFlat" style={styles.wrap} innerStyle={styles.inner}>
      <View style={styles.imageWrap}>
        <Animated.Image
          source={require('../../assets/logo_anim.png')}
          style={imageStyle}
        />
      </View>
    </Bevel>
  )
}

export default ToolbarLogo
