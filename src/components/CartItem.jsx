import { View, Text,StyleSheet,Image, TouchableOpacity } from 'react-native'
import Card from './Card'
import { colors } from '../global/colors'
import {  Feather } from '@expo/vector-icons'; 
import { useState, useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { removeItem } from '../features/cartSlice';


const CartItem = ({item}) => {
    const dispatch = useDispatch();
    const handleRemoveItem = () => {
        dispatch(removeItem(item.id))
    }
    const subTotal = item.price*item.quantity
    return (
      <Card style={styles.cartItemContainer}>
          <Image
                  style={styles.imageCartItem}
                  resizeMode='cover'
                  source={{ uri: item.thumbnail }}
              />
          <View >       
              <Text style={styles.cartTitle}>{item.title}</Text>
              <Text style={styles.cartLightText}>{item.brand}</Text>
              <Text style={styles.cartLightText}>${item.price} c/u</Text>
              <Text numberOfLines={1} style={styles.cartTotalPrice}>
                  Cantidad: {item.quantity}, Total: ${subTotal.toFixed(2)}
              </Text>
          </View>
          <TouchableOpacity style={styles.trashCart} onPress={handleRemoveItem}>
              <Feather name="trash" size={24} color="white" />
          </TouchableOpacity>
      </Card>
    )
  }

    export default CartItem

    const styles = StyleSheet.create({
        cartItemContainer:{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            padding:20,
            marginVertical:10,
            backgroundColor:colors.card,
            borderRadius:10
        },
        imageCartItem:{
            width:50,
            height:50,
            borderRadius:10,
            marginRight:10
        },
        cartTitle:{
            fontFamily:'RobotoSerif_28pt_Condensed-Bold',
            textTransform: 'capitalize',
            fontSize:14,
            color:colors.black
        },
        cartLightText:{
            fontFamily:'RobotoSerif_28pt_Condensed-Regular',
            textTransform: 'capitalize',
            fontSize:14,
            color:colors.lightGray
        },
        cartTotalPrice:{
            fontFamily:'RobotoSerif_28pt_Condensed-Bold',
            textTransform: 'capitalize',
            fontSize:16,
            color:colors.borderDark
            
        },
        trashCart:{
            
            backgroundColor:'red',
            padding:10,
            borderRadius:20,
            marginLeft:10,
        }
    })