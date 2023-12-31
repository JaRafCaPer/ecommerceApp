import { StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import Card from './Card'
import { Feather } from '@expo/vector-icons';

const OrderItem = ({ order, total }) => {
    return (
        <Card style={styles.cartItemContainer}>
            <View >
                <Text style={styles.createdAt}>
                    Creada el {new Date(order.createdAt).toLocaleString()}
                </Text>
                <Text style={styles.total}>Total: ${total}</Text>
            </View>
            <TouchableOpacity style={styles.searchIcon} onPress={null}>
                <Feather name="search" size={24} color="black" />
            </TouchableOpacity>
        </Card>
    )
}

export default OrderItem

const styles = StyleSheet.create({
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