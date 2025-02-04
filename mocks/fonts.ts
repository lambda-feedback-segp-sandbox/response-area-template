interface FontConfig {
  fallback: string[]
  style?: string[]
  weight: string[]
}

function mockFont(config: FontConfig) {
  const { fallback, style, weight } = config
  return {
    style: 'normal',
    ...config,
    fontFamily: fallback,
    fontStyle: style ? style[0] : 'normal',
    fontWeight: weight[0],
  }
}

export const Fira_Sans = mockFont
export const Fira_Mono = mockFont
export const Lato = mockFont
export const Roboto = mockFont
