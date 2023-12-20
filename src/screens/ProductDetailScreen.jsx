import { useEffect, useState } from 'react';
import products_data from '../data/products_data.json';
import { View, ScrollView, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';

const ProductDetailScreen = ({ route }) => {
  const [productSelected, setProductSelected] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const productId = route.params;

  useEffect(() => {
    const productFind = products_data.find((product) => product.id === productId);
    setProductSelected(productFind);
    setIsLoading(false);
  }, [productId]);

  return (
    <>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView>
          <View>
            <Image
              source={{ uri: productSelected.images[0] }}
              resizeMode="cover"
              style={styles.imageProduct}
            />
            <View style={styles.DetailContainer}>
              <Text style={styles.title}> {productSelected.title}</Text>
              <Text style={styles.description}> {productSelected.description}</Text>
              <Text style={styles.price}> ${productSelected.price}</Text>
              <TouchableOpacity style={styles.buyButton} onPress={() => null}>
                <Text style={styles.buyButtonText}>Buy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  imageProduct: {
    width: '100%',
    height: 300,
  },
  DetailContainer: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buyButton: {
    marginTop: 10,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  buyButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
