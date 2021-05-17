import { useCallback, useRef, useState } from 'react'
import { TextInputProps } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { addHttp } from './useWebView'

export const useAddressBar = (
  currentUrl: string,
  navigate: (url: string) => void
): TextInputProps => {
  const [focused, setFocused] = useState(false)
  const [inputUrl, setInputUrl] = useState(currentUrl)

  return {
    value: focused ? inputUrl : currentUrl,
    onFocus: useCallback(() => {
      setInputUrl(currentUrl ?? inputUrl)
      setFocused(true)
    }, [currentUrl, inputUrl]),
    selectTextOnFocus: true,
    autoCorrect: false,
    autoCapitalize: 'none',
    autoCompleteType: 'off',
    onBlur: useCallback(() => setFocused(false), []),
    onChangeText: setInputUrl,
    onSubmitEditing: useCallback(
      (e) => {
        const { text } = e.nativeEvent
        navigate(addHttp(text))
      },
      [navigate]
    ),
  }
}
