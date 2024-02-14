import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Card from './Card';

const OrderItem = ({ order, total }) => {
    console.log('orders', order);
    const cartItems = order.cartItems;
    return (
        <Card style={styles.cartItemContainer}>
            <View style={styles.viewOrders}>
                <Text style={styles.createdAt}>
                   Created at: {order.createdAt}
                </Text>
                <Text>User: {order.user}</Text>
                <Text style={styles.itemsHeader}>Items:</Text>
                {cartItems.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <Text style={styles.itemDetails}>Quantity: {item.quantity}</Text>
                        <Text style={styles.itemDetails}>Price: ${item.price.toFixed(2)}</Text>
                    </View>
                ))}
                <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
            </View>
        </Card>
    );
};

export default OrderItem;

const styles = StyleSheet.create({
    viewOrders: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start', 
        paddingHorizontal: 15, 
    },
    cartItemContainer: {
        padding: 20,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 4, 
    },
    createdAt: {
        fontFamily: 'RobotoSerif_28pt_Condensed-Regular',
        fontSize: 14,
        color: '#888', 
        marginBottom: 10, 
    },
    itemsHeader: {
        fontFamily: 'RobotoSerif_28pt_Condensed-Bold',
        fontSize: 16,
        marginBottom: 5, 
    },
    itemContainer: {
        marginBottom: 8, 
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold', 
        marginBottom: 3, 
    },
    itemDetails: {
        fontSize: 14,
        color: '#666', 
    },
    total: {
        fontFamily: 'RobotoSerif_28pt_Condensed-Bold',
        fontSize: 18,
        marginTop: 10, 
    },
});
