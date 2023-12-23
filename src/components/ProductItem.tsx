/* eslint-disable */

import { Image, StyleSheet, Text, View } from 'react-native'
import React, { PropsWithChildren } from 'react'


type ProductProps = PropsWithChildren<{
    user: User
}>

const ProductItem = ({user}: ProductProps) => {
  return (
    <View style={styles.container}>
      <Image 
      source={{uri: user.avatar_url}}
      style={styles.image}
      />

      <View>

        <View style={[styles.rowContainer, styles.ratingContainer]}>
            <View style={styles.rating}>
                <Text style={styles.ratingText}>{user.score} ★</Text>
            </View>
            <Text style={styles.ratingCount}>
                ({user.login.toLocaleString()})
            </Text>
            </View>
            
            <View style={[styles.rowContainer]}>
                <Text style={styles.name}>
                    {user.login}
                </Text>
                {/* <Text style={styles.discountPrice}>
                    ₹{user.login.toLocaleString()}
                </Text>
                <Text style={styles.offerPercentage}>
                    %{user.login} off
                </Text> */}
        </View>
      </View>

    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      margin: 8,
      flexDirection: 'row',
    },
    rowContainer: {
      flexDirection: 'row',
      width: 250,
      marginTop: 5,
      paddingTop: 10
    },
    image: {
      width: 100,
      height: 100,
      marginRight: 12,
      borderRadius: 150/2,
      overflow: 'hidden',
    },
    name: {
      color: '#000000',
      fontWeight: '600',
      fontSize: 18,
    },
    ratingContainer: {
      marginTop: 10,
    },
    priceContainer: {
      marginBottom: 12,
    },
    rating: {
      borderRadius: 4,
      paddingHorizontal: 8,
      justifyContent: 'center',
      backgroundColor: '#008c00',
  
      marginRight: 4,
    },
    ratingText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: '600',
    },
    ratingCount: {
      color: '#878787',
    },
    originalPrice: {
      fontSize: 18,
      marginRight: 4,
      fontWeight: '600',
  
      color: 'rgba(0, 0, 0, 0.5)',
      textDecorationLine: 'line-through',
    },
    discountPrice: {
      fontSize: 18,
      marginRight: 4,
      fontWeight: '600',
  
      color: '#000000',
    },
    offerPercentage: {
      fontSize: 17,
      fontWeight: '600',
      color: '#4bb550',
    },
  });

export default ProductItem
