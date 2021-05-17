import React, { useRef, useState } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import MenuBar from './src/components/MenuBar'
import Titlebar from './src/components/Titlebar'
import StatusBarIE from './src/components/StatusBar'
import ToolbarWrap from './src/components/Toolbar/ToolbarWrap'
import { WebView, WebViewNavigation } from 'react-native-webview'
import Window from './src/components/Window'
import Bevel from './src/components/Bevel'
import Input from './src/components/Input'
import Toolbar from './src/components/Toolbar/Toolbar'
import ToolbarLabel from './src/components/Toolbar/ToolbarLabel'
import { WebViewNativeProgressEvent } from 'react-native-webview/lib/WebViewTypes'
import ToolbarButton from './src/components/Toolbar/ToolbarButton'
import ToolbarRow from './src/components/Toolbar/ToolbarRow'
import ToolbarLogo from './src/components/Toolbar/ToolbarLogo'
import { useWebView } from './src/components/WebView/useWebView'
import { useAddressBar } from './src/components/WebView/useAddressBar'
import Combobox from './src/components/Combobox'
import schemes, { Scheme } from './src/colorschemes/parseScheme'
import styled, { ThemeProvider } from 'styled-components'
import ToolbarBg from './src/components/Toolbar/ToolbarBg'
import { useSimulatedLocation } from './src/utils/useSimulatedLocation'

const years = [
  'Today',
  '1994',
  '1995',
  '1996',
  '1997',
  '1998',
  '1999',
  '2000',
  '2001',
  '2002',
  '2003',
  '2004',
  '2005',
] as const

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
  const {
    props: webViewProps,
    ref: webView,
    navigationActions,
    navigationState,
  } = useWebView('https://theoldnet.com')
  const location = useSimulatedLocation(
    navigationState.currentUrl,
    navigationActions.navigate
  )
  const addressBarProps = useAddressBar(location.url, location.setUrl)

  return (
    <ThemeProvider theme={schemes['Windows Standard']}>
      <SafeAreaView style={styles.outerWrap}>
        <Desktop>
          <Window title={navigationState.title}>
            <StatusBar barStyle="light-content" />
            <MenuBar />
            <ToolbarWrap>
              <ToolbarRow>
                <Toolbar big>
                  <ToolbarButton
                    icon="go_back"
                    label="Back"
                    onPress={navigationActions.goBack}
                    disabled={!navigationState.canGoBack}
                  />
                  <ToolbarButton
                    icon="go_forward"
                    label="Forward"
                    onPress={navigationActions.goForward}
                    disabled={!navigationState.canGoForward}
                  />
                  <ToolbarButton
                    icon={navigationState.loading ? 'stop-loading' : 'stop'}
                    label="Stop"
                    onPress={navigationActions.stopLoading}
                  />
                  <ToolbarButton
                    icon="refresh"
                    label="Refesh"
                    onPress={navigationActions.reload}
                  />
                  <ToolbarButton
                    icon="home"
                    label="Home"
                    onPress={navigationActions.goHome}
                  />
                  <ToolbarButton icon="search" label="Search" />
                  <ToolbarButton icon="favorites" label="Favorites" />
                  <ToolbarButton
                    icon="print"
                    label="Print"
                    disabled
                    onPress={navigationActions.print}
                  />
                  <ToolbarButton icon="font-size" label="Font" />
                  <ToolbarButton icon="mail" label="Mail" />
                </Toolbar>
                <ToolbarLogo animating={navigationState.loading} />
              </ToolbarRow>
              <Toolbar>
                <ToolbarLabel style={{ marginRight: 4 }}>Address</ToolbarLabel>
                <Input {...addressBarProps} />
                <Combobox
                  value={location.year}
                  setValue={location.setYear}
                  style={styles.selectYear}
                  options={years}
                />
              </Toolbar>
            </ToolbarWrap>
            <Bevel type="lowered3d" style={styles.mainContent}>
              <WebView ref={webView} {...webViewProps} />
            </Bevel>
            <StatusBarIE progress={navigationState.progress} />
          </Window>
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
  container: {
    flex: 1,
    backgroundColor: '#57A8A8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContent: { flex: 1 },
  selectYear: {
    flex: 0,
    width: 75,
    marginLeft: 4,
  },
})
