module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@router': './src/router',
          '@storage': './src/storage',
          '@store': './src/store',
          '@utils': './src/utils',
          '@locales': './src/locales',
          '@pages': './src/pages',
          '@assets': './assets',
        },
      },
      'import-glob',
    ],
    ['nativewind/babel'],
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
