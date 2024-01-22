import { StyleSheet } from "react-native";
import { colors } from '../global/colors'
import { Entypo } from '@expo/vector-icons';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ShopNavigator from "./ShopNavigator";
import CartNavigator from "./CartNavigator";
import OrdersNavigator from "./OrdersNavigator";
import ProfileNavigator from "./ProfileNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
             screenOptions={
                {
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: styles.tabBar,
                }
      }
            >
                <Tab.Screen
                name="OrdersStack"
                component={OrdersNavigator}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Entypo name="list" size={24} color={focused?"#fff":"#ccc"} />
                    )
                }}
                />

                <Tab.Screen 
                name="ShopStack" 
                component={ShopNavigator}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Entypo name="shop" size={24} color={focused?"#fff":"#ccc"} />
                    )
                }}
                 />
                <Tab.Screen 
                name="CartStack" 
                component={CartNavigator}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Entypo name="shopping-cart" size={24} color={focused?"#fff":"#ccc"} />
                    )
                }} 

                />
                <Tab.Screen
                name="ProfileStack"
                component={ProfileNavigator}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Entypo name="user" size={24} color={focused?"#fff":"#ccc"} />
                    )
                }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        position: 'flex-end',
        bottom: 10,
        elevation: 1,
        backgroundColor: colors.secondary,
        borderRadius: 20,
        height: 60,
        shadowColor: colors.primary,
    }
})

export default TabNavigator;