import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import schemes, { Scheme } from './src/colorschemes/parseScheme'
import styled, { ThemeProvider } from 'styled-components'
import BrowserWindow from './src/views/BrowserWindow'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme extends Scheme {}
}

const Desktop = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.Background};
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

export default function App() {
  return (
    <ThemeProvider theme={schemes['Windows Standard']}>
      <SafeAreaView style={styles.outerWrap}>
        <Desktop>
          <BrowserWindow />
        </Desktop>
      </SafeAreaView>
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  outerWrap: {
    flex: 1,
    backgroundColor: '#000',
  },
})
