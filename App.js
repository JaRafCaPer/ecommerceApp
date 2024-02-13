import { ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import { useState } from 'react';
import { Provider } from 'react-redux';
import MainNavigator from './src/navigation/MainNavigator';
import store from './src/store';
import { init } from './src/db/index';


export default function App() {
  init()
  .then(()=>console.log('Database initialized'))
  .catch(err=>console.log('Database initialization failed', err))

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
      <MainNavigator/>
    </Provider>
  );
}
