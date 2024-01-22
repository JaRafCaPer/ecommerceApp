import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { colors } from '../global/colors';
import { useDispatch } from 'react-redux';
import { setProductIdSelected } from '../features/shopSlice';

export default function ProductItem({ product, navigation }) {

  const dispatch = useDispatch()
  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(setProductIdSelected(product.id))
        navigation.navigate("Details", product.id)}}
      style={styles.productItemContainer}
    >
      <Image
        style={styles.productItemImage}
        resizeMode="cover"
        source={{ uri: product.thumbnail }}
      />
      <View style={styles.productItemDetails}>
        <Text style={styles.productItemTitle}>{product.title}</Text>
        <Text style={styles.productItemPrice}>${product.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  productItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    margin: 10,
    backgroundColor: colors.backgroundLight,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
  },
  productItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productItemDetails: {
    marginLeft: 15,
  },
  productItemTitle: {
    fontFamily: 'RobotoSerif_28pt_Condensed-Regular',
    fontSize: 16,
    color: colors.textDark,
  },
  productItemPrice: {
    fontFamily: 'RobotoSerif_28pt_Condensed-Bold',
    fontSize: 18,
    color: colors.primary,
    marginTop: 5,
  },
});
