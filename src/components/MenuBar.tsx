import React from 'react'
import { StyleSheet, View } from 'react-native'

export type MenuBarProps = {}
const styles = StyleSheet.create({
  wrap: {
    height: 20,
  },
})

const MenuBar: React.FC<MenuBarProps> = () => {
  return <View style={styles.wrap}></View>
}

export default MenuBar
