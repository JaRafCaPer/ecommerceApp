import { StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import Card from './Card'
import { Feather } from '@expo/vector-icons';

const OrderItem = ({ order, total }) => {
    console.log(order)
    return (
        <Card style={styles.cartItemContainer}>
        
            <View  style={styles.viewOrders}>
                <Text style={styles.createdAt}>
                    Creada el { Date(order.createdAt).toLocaleString()}
                </Text>
                <Text>User: {order.user}</Text>
                <Text>Items: {order.cartItems.length}</Text>
                <Text style={styles.total}>Total: ${total}</Text>
            </View>
          
        </Card>
    )
}

export default OrderItem

const styles = StyleSheet.create({
    viewOrders: {
        flexDirection: 'col',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cartItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 10
    },
    createdAt: {
        fontFamily: 'RobotoSerif_28pt_Condensed-Regular',
        textTransform: 'capitalize',
        fontSize: 14,
        color: '#ccc'
    },
    total: {
        fontFamily: 'RobotoSerif_28pt_Condensed-Bold',
        textTransform: 'capitalize',
        fontSize: 16,
        color: '#000'
    },
    searchIcon: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 10
    }
})