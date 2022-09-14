/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/alphanet-walletextension-sdk.ts'),
      name: 'alphanet-walletextension-sdk',
      fileName: (format) => `alphanet-walletextension-sdk.${format}.js`,
    },
  },
})
