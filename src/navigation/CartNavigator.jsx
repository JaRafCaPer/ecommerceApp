import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartScreen from "../screens/CartScreen";
import Header from "../components/Header";


const Stack = createNativeStackNavigator();

const CartNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Cart"
      screenOptions={
        ({ navigation, route }) => ({
          header: () => <Header title={route.name} navigation={navigation} />
        })

      }
    >
      <Stack.Screen
        name="Cart"
        component={CartScreen} />
    </Stack.Navigator>
  );
}

export default CartNavigator;