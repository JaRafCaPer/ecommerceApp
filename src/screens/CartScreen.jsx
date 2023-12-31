import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { colors } from '../global/colors'
import cart_data from '../data/cart_data.json'
import CartItem from '../components/CartItem'
import { useState, useEffect } from 'react';


const CartScreen = () => {
  const [total, setTotal] = useState(0)
  useEffect(() => {
    const total = cart_data.reduce((acc, item) =>( 
      acc+=item.price*item.quantity
      ), 0)
  
    setTotal(total)
  }, [cart_data])

  const renderCartItem = ({item}) => {
    return (
        <CartItem item={item}/>
    )
}



  return (
    <View style={styles.cartContainer}>
      <FlatList
        data={cart_data}
        renderItem={renderCartItem}
        keyExtractor={item => item.id}
        />
        <View style={styles.cartConfirm}>
        <Text style={styles.totalPrice}>Total: ${total}</Text>
        <TouchableOpacity style={styles.confirmButton} onPress={null}>
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
    backgroundColor: colors.primary,
    padding:10,
    borderRadius:10,
  },
  confirmButtonText:{
    fontFamily:'RobotoSerif_28pt_Condensed-Bold',
    fontSize:16,
    color: '#fff'
  }  
})