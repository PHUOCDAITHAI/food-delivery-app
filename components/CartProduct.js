import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import IndividualCartProduct from './IndividualCartProduct';
import { colors } from '../global/styles';

const CartProduct = ({cartProducts, cartProductIncrease, cartProductDecrease, totalPrice}) => {
    let i = 1;
    return (
    <View>
      {cartProducts.map(individualCartProduct => (
        <View key={individualCartProduct.ID}>
            <IndividualCartProduct 
                individualCartProduct={individualCartProduct} 
                cartProductIncrease={cartProductIncrease}
                cartProductDecrease={cartProductDecrease}
                totalPrice={totalPrice}
                i={i++}
            />
        </View>
      ))}
    </View>
  )
}

export default CartProduct

const styles = StyleSheet.create({})