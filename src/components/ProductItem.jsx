import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'

export default function ProductItem({product}) {
  return (
    <TouchableOpacity style={styles.productItemContainer} >
            <Text style={styles.productItemTitle}>{product.title}</Text>
            <Image
                style={styles.productItemImage}
                reziseMode="cover"
                source={{uri: product.thumbnail}}
            />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    productItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        margin: 20,
    },
    productItemTitle: {
        fontFamily: 'RobotoSerif_28pt_Condensed-Regular',
        paddingVertical: 20,
    },
    productItemImage: {
        width: 60,
    }
}) 