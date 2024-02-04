module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      ['react-native-reanimated/plugin'],
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@': './src/',
            '@router': './src/router',
            '@storage': './src/storage',
            '@store': './src/store',
            '@utils': './src/utils',
            '@locales': './src/locales',
            '@pages': './src/pages',
            '@hooks': './src/hooks',
            '@assets': './assets',
            '@api': './src/api',
            '@components': './src/components',
            '@TUIKit': './src/TUIKit'
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
  }
}
