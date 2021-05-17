import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import styled from 'styled-components'
import Bevel from '../Bevel'
import TraditionalBorderView from '../TraditionalBorderView'

export type ToolbarProps = {
  big?: boolean
}

const Wrap = styled(TraditionalBorderView)<{ $big?: boolean }>`
  height: ${({ $big }) => ($big ? 42 : 28)}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.ButtonHilight};
  border-bottom-color: ${({ theme }) => theme.colors.ButtonShadow};
  border-right-color: ${({ theme }) => theme.colors.ButtonShadow};
  flex-grow: 1;
`

const styles = StyleSheet.create({
  inner: {
    flex: 1,
    padding: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  handle: {
    width: 3,
    flex: 0,
    height: '100%',
  },
  handle2: {
    width: 3,
    flex: 0,
    marginRight: 2,
    height: '100%',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewInner: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
  },
})

const Toolbar: React.FC<ToolbarProps> = ({ children, big }) => {
  return (
    <Wrap $big={big}>
      <View style={styles.inner}>
        <Bevel type="raised3dFlat" style={styles.handle} />
        <Bevel type="raised3dFlat" style={styles.handle2} />
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          alwaysBounceHorizontal={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewInner}
        >
          {children}
        </ScrollView>
      </View>
    </Wrap>
  )
}

export default Toolbar
