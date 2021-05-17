export const sizeLocations = {
  BorderWidth: 2,
  SmCaptionWidth: 3,
  SmCaptionHeight: 4,
  CaptionWidth: 5,
  CaptionHeight: 6,
  ScrollWidth: 30,
  ScrollHeight: 31,
  MenuWidth: 55,
  MenuHeight: 56,
} as const
export type SchemeSizeName = keyof typeof sizeLocations

export const fontLocations = {
  CaptionFont: [7, 29],
  SmCaptionFont: [32, 54],
  MenuFont: [57, 79],
  StatusFont: [80, 102],
  MessageFont: [103, 125],
  IconFont: [126, 148],
} as const
export type SchemeFontName = keyof typeof fontLocations

export const colorLocations = {
  Scrollbar: 149,
  Background: 150,
  ActiveTitle: 151,
  InactiveTitle: 152,
  Menu: 153,
  Window: 154,
  WindowFrame: 155,
  MenuText: 156,
  WindowText: 157,
  TitleText: 158,
  ActiveBorder: 159,
  InactiveBorder: 160,
  AppWorkSpace: 161,
  Hilight: 162,
  HilightText: 163,
  ButtonFace: 164,
  ButtonShadow: 165,
  GrayText: 166,
  ButtonText: 167,
  InactiveTitleText: 168,
  ButtonHilight: 169,
  ButtonDkShadow: 170,
  ButtonLight: 171,
  InfoText: 172,
  InfoWindow: 173,
} as const
export type SchemeColorName = keyof typeof colorLocations
export const optionalColorLocations = {
  ButtonAlternateFace: 174,
  HotTrackingColor: 175,
  GradientActiveTitle: 176,
  GradientInactiveTitle: 177,
} as const
export type SchemeOptionalColorName = keyof typeof optionalColorLocations
