import React from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import MenuBar from '../components/MenuBar'
import StatusBarIE from '../components/StatusBar'
import ToolbarWrap from '../components/Toolbar/ToolbarWrap'
import Window from '../components/Window'
import Bevel from '../components/Bevel'
import Input from '../components/Input'
import Toolbar from '../components/Toolbar/Toolbar'
import ToolbarLabel from '../components/Toolbar/ToolbarLabel'
import ToolbarButton from '../components/Toolbar/ToolbarButton'
import ToolbarRow from '../components/Toolbar/ToolbarRow'
import ToolbarLogo from '../components/Toolbar/ToolbarLogo'
import { useWebView } from '../components/WebView/useWebView'
import { useAddressBar } from '../components/WebView/useAddressBar'
import Combobox from '../components/Combobox'
import { useSimulatedLocation } from '../utils/useSimulatedLocation'
import WebView from 'react-native-webview'

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

export default function BrowserWindow() {
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
    <Window title={navigationState.title}>
      <StatusBar barStyle="light-content" />
      <MenuBar />
      <ToolbarWrap>
        <ToolbarRow>
          <Toolbar big scrollOverflow>
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
  )
}

const styles = StyleSheet.create({
  mainContent: { flex: 1 },
  selectYear: {
    flex: 0,
    width: 75,
    marginLeft: 4,
  },
})
