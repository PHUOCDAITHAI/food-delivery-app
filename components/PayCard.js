import { StyleSheet, Text, View, TextInput, Alert } from 'react-native'
import React, {useState} from 'react'
import { auth, db } from '../config/firebase';
import { colors, parameters } from '../global/styles';
import { Icon, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import {useStripe} from "@stripe/stripe-react-native"
const PayCard = ({totalQty, totalPrice}) => {
    const navigation = useNavigation();
    const stripe = useStripe();
    const [cell, setCell] = useState('');
    const [address, setAddress] = useState('');
    const [cartQty] = useState(totalQty);
    const [cartPrice] = useState(totalPrice);
    const handleSubmit = async() => {
      const uid = auth.currentUser.uid;
      const userData = await db.collection('users').doc(uid).get();
      const fullName = userData.data().FullName;
      const email = userData.data().Email;
      try {
        // sending request
        const response = await fetch("http://192.168.1.11:8080/pay", {
          method: "POST",
          body: JSON.stringify({ email, cartPrice, fullName, address, cell }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (!response.ok) return Alert.alert(data.message);
        const clientSecret = data.clientSecret;
        const initSheet = await stripe.initPaymentSheet({
          paymentIntentClientSecret: clientSecret,
          merchantDisplayName: 'Merchant Name',
        });
        if (initSheet.error) return Alert.alert(initSheet.error.message);
  
        const presentSheet = await stripe.presentPaymentSheet({
          clientSecret,
        });
        if (presentSheet.error) return Alert.alert(presentSheet.error.message);
        Alert.alert("Payment complete, thank you!");
      } catch (err) {
        console.error(err);
        Alert.alert("Something went wrong, try again later!");
      }
      await db.collection('Buyer-Personal-Info').add({
        Name: userData.data().FullName,
        Email: userData.data().Email,
        CellNo: cell,
        Address: address,
        CartPrice: cartPrice,
        CartQty: cartQty,
        uid: uid
      })
      const cartData = await db.collection('Cart ' + uid).get();
      for(var snap of cartData.docs){
          var data = snap.data();
          data.ID = snap.id;
          await db.collection('Buyer-Cart ' + uid).add(data);
          await db.collection('Cart ' + uid).doc(snap.id).delete();
      }
      navigation.navigate("Home")
      setCell('')
      setAddress('')
    }
  return (
    <View>
       <View style={styles.header}>
        <View style={{alignItems: "center", justifyContent: "center", marginLeft: 15}}>
          <Icon 
              type='material-community'
              name='arrow-left'
              color={colors.headerText}
              size={28}
              onPress={() => {
                navigation.goBack()
              }}
            />
        </View>

        <View style={{alignItems: "center", justifyContent: "center"}}>
            <Text style={{color: colors.cardbackground, fontSize: 25, fontWeight: "bold"}}>Thanh toán bằng thẻ</Text>
        </View>

        <View style={{alignItems: "center", justifyContent: "center", marginRight: 15}}>
            
        </View>
       
      </View>
      <View style={{marginTop: 20}}>
        <TextInput 
          style={styles.textInput}
          placeholder='Số điện thoại'
          value={cell}
          onChangeText={text => setCell(text)}
        />
        <TextInput 
          style={styles.textInput2}
          placeholder='Địa chỉ'
          value={address}
          onChangeText={text => setAddress(text)}
        />
        <View style={{width: "90%", backgroundColor: "#888", marginLeft: 20, padding: 10, borderRadius: 5, marginTop:20}}>
          <Text style={{color: "#333"}}>{cartQty}</Text>
        </View>
        <View style={{width: "90%", backgroundColor: "#888", marginLeft: 20, padding: 10, borderRadius: 5, marginTop:20}}>
          <Text style={{color: "#333"}}>{cartPrice} ₫</Text>
        </View>
        <Button 
          title="Thanh toán"
          buttonStyle={{marginHorizontal: 20, marginVertical: 20, backgroundColor: colors.buttons}}
          titleStyle={{fontSize: 20, fontWeight: "bold"}}
          onPress={handleSubmit}
        />
      </View>
    </View>
  )
}

export default PayCard

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: colors.buttons,
    height: parameters.headerHeight,
    justifyContent: "space-between"
  },
  textInput: {
    borderWidth: 1,
    marginHorizontal: 20,
    borderRadius: 5,
    padding: 5,
    borderColor: "#86939e"
  },
  textInput2: {
    marginTop: 20,
    borderWidth: 1,
    marginHorizontal: 20,
    borderRadius: 5,
    padding: 5,
    borderColor: "#86939e"
  }
})