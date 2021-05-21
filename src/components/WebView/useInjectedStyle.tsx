import React, { useCallback, useEffect } from 'react'
import WebView from 'react-native-webview'

const insertCSS = (css: string, id: string) => {
  const existingEl = document.getElementById(id)
  if (existingEl) {
    existingEl.textContent = css
  } else {
    const el = document.createElement('style')
    el.setAttribute('type', 'text/css')
    el.setAttribute('id', id)
    el.textContent = css
    document.head.prepend(el)
  }
}

export const useInjectedStyle = (
  ref: React.RefObject<WebView>,
  style: string,
  id: string
): { injectedJavaScript: string } => {
  const injectedJavaScript = `(${insertCSS.toString()})(${JSON.stringify(
    style
  )}, ${JSON.stringify(id)});`

  useEffect(() => {
    ref.current?.injectJavaScript(injectedJavaScript)
  }, [injectedJavaScript])

  return {
    injectedJavaScript,
  }
}
