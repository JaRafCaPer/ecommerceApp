import { FlatList, ActivityIndicator, Text, View } from 'react-native';
import OrderItem from '../components/OrderItem';
import { useGetOrdersQuery } from '../services/shopServices';

const OrdersScreen = () => {
  const { data, error, isLoading } = useGetOrdersQuery();

  const renderOrderItem = ({ item }) => {
    const total = item.total;

    return (
      <OrderItem order={item} total={total} />
    );
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={Object.values(data)}
      renderItem={renderOrderItem}
      keyExtractor={(item, index) => item.id || index.toString()}
    />
  );
};

export default OrdersScreen;
