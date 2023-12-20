import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import products_data from '../data/products_data.json';
import { colors } from '../global/colors';

const ProductDetailScreen = ({ route }) => {
  const [productSelected, setProductSelected] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const productId = route.params;

  useEffect(() => {
    const productFind = products_data.find((product) => product.id === productId);
    setProductSelected(productFind);
    setIsLoading(false);
  }, [productId]);

  const handleBuyPress = () => {

    console.log('Buy button pressed');
  };

  return (
    <>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView>
          <Image
            source={{ uri: productSelected.images[0] }}
            resizeMode="cover"
            style={styles.imageProduct}
          />
          <View style={styles.detailContainer}>
            <Text style={styles.title}>{productSelected.title}</Text>
            <Text style={styles.description}>{productSelected.description}</Text>
            <Text style={styles.price}>${productSelected.price}</Text>
            <TouchableOpacity style={styles.buyButton} onPress={handleBuyPress}>
              <Text style={styles.buyButtonText}>Buy</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  imageProduct: {
    width: '80%',
    height: 300,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  detailContainer: {
    padding: 20,
    backgroundColor: colors.backgroundLight,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: colors.textDark,
    marginBottom: 15,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 15,
  },
  buyButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
  },
  buyButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ProductDetailScreen;
