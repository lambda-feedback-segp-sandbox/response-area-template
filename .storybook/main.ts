import type { StorybookConfig } from '@storybook/react-webpack5'
import { dirname, resolve } from 'path'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import { fileURLToPath } from 'url'

if (!__dirname) {
  const __filename = fileURLToPath(import.meta.url)
  var __dirname = dirname(__filename)
}

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-webpack5-compiler-swc',
    '@lambda-feedback-segp-sandbox/sandbox-addon',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  staticDirs: ['../dist'],
  webpackFinal: async config => {
    if (config.resolve) {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        'next/font/google': resolve(__dirname, '../mocks/fonts.ts'),
      }
      config.resolve.plugins = [
        ...(config.resolve.plugins || []),
        new TsconfigPathsPlugin({
          extensions: config.resolve.extensions,
        }),
      ]
    }
    config.module.rules = [
      ...config.module.rules,
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ]
    return config
  },
}
export default config
