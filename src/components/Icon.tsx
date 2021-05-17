import React, { useEffect, useMemo, useState } from 'react'
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native'
import { Asset } from 'react-native-unimodules'

export type IconProps<T extends string> = {
  icon?: string
  tintColor?: string
  name?: T
  style?: StyleProp<ViewStyle>
}

export type MakeIconProps<T extends string> = {
  readonly source: ImageSourcePropType
  readonly width: number
  readonly height: number
  readonly names: readonly T[]
  readonly direction?: 'horizontal' | 'vertical'
}

const makeIcon = <T extends string>({
  source,
  width,
  height,
  names,
  direction = 'horizontal',
}: MakeIconProps<T>): React.FC<IconProps<T>> => {
  const iconCount = names.length
  const outerStyle: ViewStyle = {
    width,
    height,
    overflow: 'hidden',
  }
  const asset =
    typeof source === 'string' || typeof source === 'number'
      ? Asset.fromModule(source)
      : undefined
  const assetPromise = asset?.downloadAsync()

  return function Icon({ name, tintColor, style }) {
    const index = name ? Math.max(0, names.indexOf(name)) : 0

    const imageStyle = useMemo<ImageStyle>(
      () => ({
        marginLeft: direction === 'horizontal' ? index * -width : 0,
        marginTop: direction === 'vertical' ? index * -height : 0,
        tintColor,
      }),
      [index, tintColor]
    )

    const [src, setSrc] = useState(source)
    useEffect(() => {
      assetPromise?.then((data) => {
        console.log({ uri: data.localUri ?? undefined })
        setSrc({ uri: data.localUri ?? undefined })
      })
    }, [])

    return (
      <View style={[style, outerStyle]}>
        <Image
          source={source}
          width={iconCount * width}
          height={height}
          style={imageStyle}
        />
      </View>
    )
  }
}

export default makeIcon
