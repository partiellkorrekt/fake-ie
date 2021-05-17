import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import styled from 'styled-components'
import Input from '../Input'
import TraditionalBorderView from '../TraditionalBorderView'

export type ToolbarWrapProps = {}
const styles = StyleSheet.create({
  wrap: {
    borderWidth: 1,
    borderColor: '#fff',
    borderTopColor: '#808080',
    borderLeftColor: '#808080',
    marginBottom: 3,
  },
  bg: {},
})

const Wrap = styled(TraditionalBorderView)`
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.ButtonHilight};
  border-top-color: ${({ theme }) => theme.colors.ButtonShadow};
  border-left-color: ${({ theme }) => theme.colors.ButtonShadow};
  margin-bottom: 3px;
`

const ToolbarWrap: React.FC<ToolbarWrapProps> = ({ children }) => {
  return (
    <Wrap>
      <View
        style={styles.bg}
        // source={require('../../assets/toolbar-bg.png')}
        // resizeMode="repeat"
      >
        {children}
      </View>
    </Wrap>
  )
}

export default ToolbarWrap
