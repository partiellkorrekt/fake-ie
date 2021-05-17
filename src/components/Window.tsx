import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import styled, { useTheme } from 'styled-components'
import Bevel from './Bevel'
import Titlebar from './Titlebar'
import TraditionalBorderView from './TraditionalBorderView'

export type WindowProps = {
  title?: string
  maximized?: boolean
}
const styles = StyleSheet.create({
  outerWrap: {},
  restored: {
    width: 800,
    height: 600,
  },
  maximized: {
    flex: 1,
    alignSelf: 'stretch',
    margin: -4,
  },
  innerWrap: {
    padding: 0,
  },
})

const Border = styled(TraditionalBorderView)`
  flex: 1;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.ActiveBorder};
  padding: 1px;
`

const Window: React.FC<WindowProps> = ({ children, title }) => {
  const [maximized, setMaximized] = useState(true)

  return (
    <Bevel
      style={[
        styles.outerWrap,
        maximized && styles.maximized,
        !maximized && styles.restored,
      ]}
      innerStyle={styles.innerWrap}
    >
      <Border>
        <Titlebar
          maximized={maximized}
          setMaximized={setMaximized}
          title={title}
        />
        {children}
      </Border>
    </Bevel>
  )
}

export default Window
