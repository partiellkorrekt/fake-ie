import React, { useCallback, useMemo, useRef, useState } from 'react'
import {
  Image,
  Modal,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TouchableWithoutFeedback,
  LayoutChangeEvent,
  useWindowDimensions,
} from 'react-native'
import { useTheme } from 'styled-components'
import Bevel from './Bevel'

export type ComboboxProps = {
  readonly options?: readonly string[]
  readonly value?: string
  readonly setValue?: (nextValue: string | undefined) => unknown
  readonly style?: StyleProp<ViewStyle>
}

const styles = StyleSheet.create({
  wrap: {
    height: 22,
    maxHeight: 22,
  },
  innerWrap: {
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    fontFamily: 'Arial',
    fontSize: 12,
    paddingLeft: 2,
    paddingTop: 1.5,
  },
  button: {
    width: 16,
  },
  buttonInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdown: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
  },
  optionWrap: {},
  optionText: {},
})

const Combobox: React.FC<ComboboxProps> = ({
  value,
  setValue,
  style,
  options,
}) => {
  const windowDimensions = useWindowDimensions()
  const [layout, setLayout] = useState<{
    x: number
    y: number
    width: number
    height: number
  }>()
  const [open, setOpen] = useState(false)
  const wrap = useRef<View>(null)

  const closeDropDown = useCallback(() => setOpen(false), [])
  const toggleDropdown = useCallback(() => {
    setOpen((x) => !x)
  }, [])

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    if (wrap.current) {
      wrap.current?.measure((x, y, width, height, pageX, pageY) => {
        setLayout({
          x: pageX,
          y: pageY,
          width,
          height,
        })
      })
    }
  }, [])

  const {
    Window: backgroundColor,
    WindowText: textColor,
    ButtonText: iconColor,
  } = useTheme().colors

  const ddOptions = useMemo(
    () =>
      (options ?? []).map((value, i) => ({
        value,
        select: () => {
          closeDropDown()
          setValue?.(i ? value : undefined)
        },
      })),
    [options, closeDropDown, setValue]
  )

  return (
    <>
      <TouchableWithoutFeedback onPress={toggleDropdown}>
        <View style={style} onLayout={onLayout} ref={wrap}>
          <Bevel
            type="lowered3d"
            style={styles.wrap}
            innerStyle={[
              styles.innerWrap,
              { backgroundColor: backgroundColor },
            ]}
          >
            <Text style={[styles.input, { color: textColor }]}>
              {value ?? options?.[0] ?? ''}
            </Text>
            <Bevel
              type="raised3d"
              style={styles.button}
              innerStyle={styles.buttonInner}
            >
              <Image
                style={{ tintColor: iconColor }}
                source={require('../assets/icon_down.png')}
              />
            </Bevel>
          </Bevel>
        </View>
      </TouchableWithoutFeedback>
      <Modal animationType="none" visible={open} transparent>
        <TouchableWithoutFeedback onPress={closeDropDown}>
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
            }}
          ></View>
        </TouchableWithoutFeedback>
        <View
          style={[
            styles.dropdown,
            !!layout && {
              right: windowDimensions.width - layout.width - layout.x,
              top: layout.height + layout.y,
              minWidth: layout.width,
            },
          ]}
        >
          {ddOptions.map(({ value, select }) => (
            <TouchableWithoutFeedback key={'option-' + value} onPress={select}>
              <View style={styles.optionWrap}>
                <Text style={styles.optionText}>{value}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </Modal>
    </>
  )
}

export default Combobox
