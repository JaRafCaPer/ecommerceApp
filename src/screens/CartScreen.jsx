import { FlatList, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import { colors } from '../global/colors'
import CartItem from '../components/CartItem'
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../features/cartSlice';
import {usePostOrderMutation} from '../services/shopServices';


const CartScreen = ({navigation}) => {

  const dispatch = useDispatch();
  const cartItems =useSelector(state => state.cartReducer.items);
  const total = useSelector(state => state.cartReducer.total);

  const [triggerPost, result] = usePostOrderMutation();

  const confirmCart = () => {
    triggerPost({user:'loggedUser', cartItems, total});
    dispatch(clearCart())
    Alert.alert('Order Confirmed', 'Your order has been placed successfully', [{text: 'OK', onPress: () => navigation.navigate('Categories')}])
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  const renderCartItem = ({item}) => {
    return (
        <CartItem item={item}/>
    )
}



  return (
    <View style={styles.cartContainer}>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={item => item.id}
        />
        <View style={styles.cartConfirm}>
        <Text style={styles.totalPrice}>Total: ${total.toFixed(2)}</Text>
        <TouchableOpacity style={styles.clearCartButton} onPress={handleClearCart}>
          <Text style={styles.clearCartButtonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmButton} onPress={confirmCart}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
        </View>
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  cartContainer: {
    flex: 1,
  },
  cartConfirm: {
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  totalPrice: {
    fontSize: 16,
    fontFamily: 'RobotoSerif_28pt_Condensed-Bold'
  },
  confirmButton:{
    backgroundColor: colors.textLight,
    padding:10,
    borderRadius:10,
    width: 100,
  },
  clearCartButton:{
   width: 100,
  },
  clearCartButtonText:{
    fontFamily:'RobotoSerif_28pt_Condensed-Bold',
    fontSize:16,
    color: colors.backgroundLight,
    backgroundColor: 'red',
    padding:10,
    borderRadius:10,
    textAlign: 'center',
    
  },
  confirmButtonText:{
    fontFamily:'RobotoSerif_28pt_Condensed-Bold',
    fontSize:16,
    color: colors.textDark,
    textAlign: 'center',
  }  
})