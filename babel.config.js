module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@api': './src/api',
          '@assets': './src/assets',
          '@components': './src/components',
          '@config': './src/config',
          '@constants': './src/constants',
          '@context': './src/context',
          '@hooks': './src/hooks',
          '@interface': './src/interface',
          '@localization': './src/localization',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@theme': './src/theme',
          '@appTypes': './src/types',
          '@appTypes/*': './src/types/*',
          '@lib': './src/lib',
          '@notification': './src/notification',
          '@store': './src/store',
          '@utils': './src/utils',
          '@images': './src/assets/images',
          '@icons': './src/assets/icons',
          '@svg': './src/assets/svg',
          '@styles': './src/styles',
          '@scripts': './src/scripts',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};


