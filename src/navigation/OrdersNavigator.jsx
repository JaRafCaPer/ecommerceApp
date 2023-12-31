import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "../components/Header";
import OrdersScreen from "../screens/OrderScreen";

const Stack = createNativeStackNavigator();

const OrdersNavigator = () => {
    return (
            <Stack.Navigator
                initialRouteName="Orders"
                screenOptions={
                    ({ navigation, route }) => ({
                        header: () => <Header title={route.name} navigation={navigation}/>,                     
                    })
                }
            >
                <Stack.Screen
                    name="Orders"
                    component={OrdersScreen}
                />
            </Stack.Navigator>
    )
}

export default OrdersNavigator