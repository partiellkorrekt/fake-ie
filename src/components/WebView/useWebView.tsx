import { useCallback, useMemo, useRef, useState } from 'react'
import WebView, { WebViewNavigation, WebViewProps } from 'react-native-webview'
import { WebViewNativeProgressEvent } from 'react-native-webview/lib/WebViewTypes'

export const addHttp = (url: string): string => {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return 'http://' + url
}

export const useWebView = (
  homeUrl = ''
): {
  props: WebViewProps
  ref: React.RefObject<WebView>

  navigationActions: {
    navigate: (url: string) => void
    goHome: () => void
    goBack: () => void
    goForward: () => void
    stopLoading: () => void
    reload: () => void
    print: () => void
  }
  navigationState: {
    currentUrl: string
    title: string
    canGoBack: boolean
    canGoForward: boolean
    loading: boolean
    progress: number | undefined
  }
} => {
  const webView = useRef<WebView>(null)
  const [navigationState, setNavigationState] = useState<
    WebViewNavigation | WebViewNativeProgressEvent
  >()

  const navigatorUrlRef = useRef(homeUrl)
  const onNavigationStateChange = useCallback<
    Exclude<WebViewProps['onNavigationStateChange'], undefined>
  >((e) => {
    navigatorUrlRef.current = e.url
    setNavigationState(e)
  }, [])
  const onLoadProgress = useCallback<
    Exclude<WebViewProps['onLoadProgress'], undefined>
  >((e) => {
    setNavigationState({
      ...e.nativeEvent,
      url: navigatorUrlRef.current ?? e.nativeEvent.url,
      loading: e.nativeEvent.progress < 1,
    })
  }, [])

  const props: WebViewProps = useMemo(
    () => ({
      onNavigationStateChange,
      onLoadProgress,
      allowsFullscreenVideo: false,
      source: {
        uri: homeUrl,
      },
    }),
    [homeUrl]
  )

  const navigate = useCallback((url: string): void => {
    webView.current?.injectJavaScript(
      'location.href=' + JSON.stringify(addHttp(url)) + ';'
    )
  }, [])

  const goHome = useCallback(() => navigate(homeUrl), [navigate, homeUrl])
  const goBack = useCallback(() => webView.current?.goBack(), [])
  const goForward = useCallback(() => webView.current?.goForward(), [])
  const stopLoading = useCallback(() => webView.current?.stopLoading(), [])
  const reload = useCallback(() => webView.current?.reload(), [])

  const print = useCallback((): void => {
    webView.current?.injectJavaScript(
      'alert("Printing is not supported yet.");'
    )
  }, [])

  return {
    props,
    ref: webView,
    navigationActions: {
      navigate,
      goHome,
      goBack,
      goForward,
      stopLoading,
      reload,
      print,
    },
    navigationState: {
      currentUrl: navigationState?.url ?? '',
      title: [navigationState?.title, 'Old Net Explorer']
        .filter((x) => !!x)
        .join(' - '),
      canGoBack: !!navigationState?.canGoBack,
      canGoForward: !!navigationState?.canGoForward,
      loading: !!navigationState?.loading,
      progress:
        navigationState && 'progress' in navigationState
          ? navigationState.progress
          : undefined,
    },
  }
}
