import React from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'

export type ToolbarRowProps = ViewProps
const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
  },
})

const ToolbarRow: React.FC<ToolbarRowProps> = (props) => {
  return <View {...props} style={styles.wrap} />
}

export default ToolbarRow
