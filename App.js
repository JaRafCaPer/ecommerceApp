import { ActivityIndicator } from 'react-native';
import CategoriesScreen from './src/screens/CategoriesScreen';
import ProductsBuCategoryScreen from './src/screens/ProductsByCategoryScreen';
import {useFonts} from 'expo-font';
import  { useState } from 'react';


export default function App() {
  const [categorySelected, setCategorySelected] = useState('')
  console.log("categoria:",categorySelected)

  const [fontLoaded] = useFonts({
    'RobotoSerif_28pt_Condensed-Bold': require('./assets/fonts/RobotoSerif_28pt_Condensed-Bold.ttf'),
    'RobotoSerif_28pt_Condensed-Italic': require('./assets/fonts/RobotoSerif_28pt_Condensed-Italic.ttf'),
    'RobotoSerif_28pt_Condensed-Regular': require('./assets/fonts/RobotoSerif_28pt_Condensed-Regular.ttf'),
    'RobotoSerif_28pt_Condensed-Light': require('./assets/fonts/RobotoSerif_28pt_Condensed-Light.ttf'),
    'RobotoSerif_28pt_Condensed-Medium': require('./assets/fonts/RobotoSerif_28pt_Condensed-Medium.ttf'),
  });
  if (!fontLoaded) return 
    <ActivityIndicator />
  
  const onSelectCategory = (category) => {  
    setCategorySelected(category)
  }
  return (
    <>{
      categorySelected
      ?
      <ProductsBuCategoryScreen category={categorySelected} />
      :
      <CategoriesScreen onSelectCategoryEvent={onSelectCategory} />
      }
    </>
  
  );
}

