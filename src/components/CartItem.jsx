import { View, Text,StyleSheet,Image, TouchableOpacity } from 'react-native'
import Card from './Card'
import { colors } from '../global/colors'
import {  Feather } from '@expo/vector-icons'; 
import { useState, useEffect } from 'react';


const CartItem = ({item}) => {
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
              <Text style={styles.cartTotalPrice}>
                  Cantidad: {item.quantity}, Total: ${item.price*item.quantity}
              </Text>
          </View>
          <TouchableOpacity style={styles.trashCart} onPress={null}>
              <Feather name="trash" size={24} color="black" />
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
            backgroundColor:colors.white,
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
            fontSize:18,
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
            backgroundColor:colors.backgroundDark,
            padding:10,
            borderRadius:10,
            marginLeft:10,
        }
    })