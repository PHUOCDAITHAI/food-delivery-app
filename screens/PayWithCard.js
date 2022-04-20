import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PayCard from '../components/PayCard';
import {StripeProvider} from '@stripe/stripe-react-native'
const PayWithCard = ({route}) => {
    const {totalQty, totalPrice} = route.params;
  return (
    <StripeProvider publishableKey='pk_test_51KRuasCuCEpZtrGGMtCd8DusQfsvpikqOrIgyuLlkHXFFrQr1FP77KTxBVqiKB1hfRiBhS2rTPRbzKuwJu46Kzlt00UHsJpwO9'>
      <PayCard totalQty={totalQty} totalPrice={totalPrice} />
    </StripeProvider>
  )
}

export default PayWithCard

const styles = StyleSheet.create({})