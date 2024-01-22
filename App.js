import { ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import { useState } from 'react';
import { Provider } from 'react-redux';
import TabNavigator from './src/navigation/TabNavigator';
import store from './src/store';


export default function App() {

  const [fontLoaded] = useFonts({
    'RobotoSerif_28pt_Condensed-Bold': require('./assets/fonts/RobotoSerif_28pt_Condensed-Bold.ttf'),
    'RobotoSerif_28pt_Condensed-Italic': require('./assets/fonts/RobotoSerif_28pt_Condensed-Italic.ttf'),
    'RobotoSerif_28pt_Condensed-Regular': require('./assets/fonts/RobotoSerif_28pt_Condensed-Regular.ttf'),
    'RobotoSerif_28pt_Condensed-Light': require('./assets/fonts/RobotoSerif_28pt_Condensed-Light.ttf'),
    'RobotoSerif_28pt_Condensed-Medium': require('./assets/fonts/RobotoSerif_28pt_Condensed-Medium.ttf'),
  });

  if (!fontLoaded) return (
    <ActivityIndicator />
  );


  return (
    <Provider store={store}>
      <TabNavigator/>
    </Provider>
  );
}
