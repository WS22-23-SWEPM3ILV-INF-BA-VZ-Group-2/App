import 'dotenv/config'

export default {
  expo: {
    name: 'my-app',
    slug: 'my-app',
    entryPoint: './src/App.js',
    version: '1.0.1-1',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/road.png',
      resizeMode: 'cover',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      buildNumber: '2',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
      versionCode: 2,
      package: 'com.lbeghini.myapp',
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      API_URL: process.env.API_URL,
      eas: {
        projectId: 'f7134fcd-83b8-4bec-8429-f164455d3981',
      },
    },
    owner: 'lbeghini',
  },
}
