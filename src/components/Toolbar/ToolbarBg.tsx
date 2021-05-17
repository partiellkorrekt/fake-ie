import React, { useMemo, useState } from 'react'
import { Renderer, TextureLoader } from 'expo-three'
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl'

export type ToolbarBgProps = {}

const onContextCreate = (gl: ExpoWebGLRenderingContext): void => {
  // Create a WebGLRenderer without a DOM element
  const renderer = new Renderer({ gl })
  renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight)

  const texture = new TextureLoader().load(
    require('../../assets/toolbar-bg.png')
  )
}

const ToolbarBg: React.FC<ToolbarBgProps> = () => {
  return (
    <GLView
      onContextCreate={onContextCreate}
      style={{ height: 80, backgroundColor: '#000' }}
    ></GLView>
  )
}

export default ToolbarBg
