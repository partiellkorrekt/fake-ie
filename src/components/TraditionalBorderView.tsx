import React, { useMemo } from 'react'
import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native'

export type TraditionalBorderViewProps = ViewProps
const styles = StyleSheet.create({
  border: {
    position: 'absolute',
  },
})

const TraditionalBorderView: React.FC<TraditionalBorderViewProps> = (props) => {
  const style = useMemo(() => StyleSheet.flatten(props.style), [props.style])
  const modifiedStyle = useMemo<ViewStyle>(
    () => ({
      ...style,
      position: style.position === 'absolute' ? 'absolute' : 'relative',
      borderColor: 'transparent',
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: 'transparent',
      borderTopColor: 'transparent',
    }),
    [style]
  )

  return (
    <View {...props} style={modifiedStyle}>
      <View
        style={useMemo(
          () => ({
            ...styles.border,
            left: -(style.borderLeftWidth ?? style.borderWidth ?? 0),
            top: -(style.borderTopWidth ?? style.borderWidth ?? 0),
            bottom: 0,
            width: style.borderLeftWidth ?? style.borderWidth ?? 0,
            backgroundColor:
              style.borderLeftColor ?? style.borderColor ?? 'transparent',
          }),
          [style]
        )}
      />
      <View
        style={useMemo(
          () => ({
            ...styles.border,
            left: 0,
            top: -(style.borderTopWidth ?? style.borderWidth ?? 0),
            right: 0,
            height: style.borderTopWidth ?? style.borderWidth ?? 0,
            backgroundColor:
              style.borderTopColor ?? style.borderColor ?? 'transparent',
          }),
          [style]
        )}
      />
      <View
        style={useMemo(
          () => ({
            ...styles.border,
            top: -(style.borderTopWidth ?? style.borderWidth ?? 0),
            right: -(style.borderRightWidth ?? style.borderWidth ?? 0),
            bottom: -(style.borderBottomWidth ?? style.borderWidth ?? 0),
            width: style.borderRightWidth ?? style.borderWidth ?? 0,
            backgroundColor:
              style.borderRightColor ?? style.borderColor ?? 'transparent',
          }),
          [style]
        )}
      />
      <View
        style={useMemo(
          () => ({
            ...styles.border,
            left: -(style.borderLeftWidth ?? style.borderWidth ?? 0),
            right: 0,
            bottom: -(style.borderBottomWidth ?? style.borderWidth ?? 0),
            height: style.borderBottomWidth ?? style.borderWidth ?? 0,
            backgroundColor:
              style.borderBottomColor ?? style.borderColor ?? 'transparent',
          }),
          [style]
        )}
      />
      {props.children}
    </View>
  )
}

export default TraditionalBorderView
