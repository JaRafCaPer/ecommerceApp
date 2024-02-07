import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity, Alert } from 'react-native';
import { useDispatch } from 'react-redux'; // Import useDispatch hook from react-redux
import products_data from '../data/products_data.json';
import { colors } from '../global/colors';
import { addItem } from '../features/cartSlice';

const ProductDetailScreen = ({ route }) => {
  const [productSelected, setProductSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedQuantity, setSelectedQuantity] = useState(1); // Default quantity
  const dispatch = useDispatch(); // Initialize dispatch function

  const productId = route.params;

  useEffect(() => {
    const productFind = products_data.find((product) => product.id === productId);
    if (productFind) {
      setProductSelected(productFind);
    } else {
      setProductSelected(null);
    }
    setIsLoading(false);
  }, [productId]);

  const handleAddToCart = () => {
    if (selectedQuantity > productSelected.stock) {
      Alert.alert("Insufficient Stock", "The selected quantity exceeds available stock. Please choose a lower quantity.");
    } else {
      dispatch(addItem({...productSelected, quantity: selectedQuantity}));
      Alert.alert("Success", "Item added to cart!");
    }
  };

  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <ScrollView>
          <Image
            source={{ uri: productSelected.thumbnail }}
            resizeMode="cover"
            style={styles.imageProduct}
          />
          <View style={styles.detailContainer}>
            <Text style={styles.title}>{productSelected.title}</Text>
            <Text style={styles.description}>{productSelected.description}</Text>
            <Text style={styles.price}>${productSelected.price}</Text>
            <Text style={styles.stock}>Stock: {productSelected.stock}</Text>
            <View style={styles.quantityContainer}>
              <Text style={styles.quantityText}>Quantity:</Text>
              <TouchableOpacity onPress={() => setSelectedQuantity(selectedQuantity - 1)} disabled={selectedQuantity <= 1} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.selectedQuantity}>{selectedQuantity}</Text>
              <TouchableOpacity onPress={() => setSelectedQuantity(selectedQuantity + 1)} disabled={selectedQuantity >= productSelected.stock} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
              <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    marginBottom: 10,
  },
  stock: {
    fontSize: 16,
    color: colors.textDark,
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  quantityText: {
    fontSize: 16,
    marginRight: 10,
  },
  quantityButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  selectedQuantity: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  addToCartButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
  },
  addToCartButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ProductDetailScreen;
