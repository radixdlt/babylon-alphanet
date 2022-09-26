/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/index.ts'),
      name: 'alphanet-gateway-api-v0-sdk',
      fileName: (format) => `alphanet-gateway-api-v0-sdk.${format}.js`,
    },
  },
})
