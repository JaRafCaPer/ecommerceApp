import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import OrderItem from '../components/OrderItem';
import { useGetOrdersQuery } from '../services/shopServices';
import { useSelector } from 'react-redux';

const OrdersScreen = () => {
  const localId = useSelector((state) => state.authReducer.localId);
  const { data, error, isLoading } = useGetOrdersQuery(localId);
  const [orderData, setOrderData] = React.useState([]);

  React.useEffect(() => {
    if (data) {
      const orderData = Object.values(data);
      setOrderData(orderData);
    }
  }, [data, isLoading]);

  const renderOrderItem = ({ item }) => {
    const total = item.total;
    return <OrderItem order={item} total={total} />;
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  if (!data || orderData.length === 0) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.noOrdersText}>No orders found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orderData}
      renderItem={renderOrderItem}
      keyExtractor={(item, index) => item.id || index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noOrdersText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default OrdersScreen;
