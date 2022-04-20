import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import DetailHeader from '../components/DetailHeader';
import AddToCart from '../components/AddToCart';
import Comments from '../components/Comments';

const Details = ({route}) => {
    const {product, addToCart} = route.params;
  return (
    <View>
        <ScrollView>
          <DetailHeader product={product} />
          <AddToCart addToCart={addToCart} product={product} />
          <Comments product={product} />
        </ScrollView>
    </View>
  )
}

export default Details

const styles = StyleSheet.create({})