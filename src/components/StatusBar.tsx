import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Bevel from './Bevel'
import ProgressBar from './ProgressBar'

export type StatusBarProps = {
  progress?: number
}
const styles = StyleSheet.create({
  wrap: {
    height: 19,
    paddingTop: 2,
    flexDirection: 'row',
  },
  section: {
    height: 17,
    marginRight: 2,
    flex: 1,
  },
  sectionProgress: {
    flex: 0,
    width: 118,
  },
  sectionLast: {
    marginRight: 0,
    flex: 0,
    width: 54,
  },
})

const StatusBar: React.FC<StatusBarProps> = ({ progress }) => {
  return (
    <View style={styles.wrap}>
      <Bevel type="lowered3dFlat" style={styles.section} />
      <Bevel
        type="lowered3dFlat"
        style={[styles.section, styles.sectionProgress]}
      >
        <ProgressBar progress={progress} />
      </Bevel>
      <Bevel
        type="lowered3dFlat"
        style={[styles.section, styles.sectionLast]}
      />
    </View>
  )
}

export default StatusBar
