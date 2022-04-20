import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React, {useState, useEffect} from 'react'
import { colors, parameters } from '../global/styles'
import { useNavigation } from '@react-navigation/native'
import { Icon, Button } from 'react-native-elements'
import firebase, { auth, db } from '../config/firebase'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
const PaymentMethod = ({route}) => {
    const navigation = useNavigation();
    const {totalQty, totalPrice} = route.params;
    const [cell, setCell] = useState('');
    const [address, setAddress] = useState(null);
    const [cartQty] = useState(totalQty);
    const [cartPrice] = useState(totalPrice);
    const [latUser, setLatUser] = useState(null);
    const [lngUser, setLngUser] = useState(null);
    const d = new Date();
    let time = d.toString();
    const [orderId, setOrderId] = useState(null);
    useEffect(() => {
        db.collection('Buyer-Personal-Info').orderBy('createdAt','desc').limit(1).onSnapshot(snap => {
            setOrderId(snap.docs.map(doc => doc.data().orderId))
        })
    },[])
    let orId = "" + orderId;
    if(orId === "") orId = 0;
    const handleSubmit = async () => {
      const uid = auth.currentUser.uid;
      const userData = await db.collection('users').doc(uid).get();
      await db.collection('Buyer-Personal-Info').add({
          FullName: userData.data().FullName,
          Email: userData.data().Email,
          PhoneNumber: cell,
          CartPrice: cartPrice,
          CartQty: cartQty,
          uid: uid,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          time: time,
          status: false,
          orderId: parseInt(orId) + 1,
          address: address,
          lat: latUser,
          lng: lngUser,
      })
      const cartData = await db.collection('Cart ' + uid).get();
      for(var snap of cartData.docs){
        var data = snap.data();
        data.ID = snap.id;
        await db.collection('Buyer-Cart ' + uid).add(data);
        await db.collection('Cart ' + uid).doc(snap.id).delete();
      }

      // await db.collection('users').doc(uid).update({
      //   address: address,
      //   lat: latUser,
      //   lng: lngUser,
      //   status: false,
      // })

      navigation.navigate("Home")
      setCell('')
      setAddress('')
      setLatUser('')
      setLngUser('')
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
            <Text style={{color: colors.cardbackground, fontSize: 25, fontWeight: "bold"}}>Thanh toán khi giao hàng</Text>
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
        <GooglePlacesAutocomplete 
        placeholder='Nhập vị trí hiện tại của bạn'
        styles={{
          container: {
            flex: 0,
            marginHorizontal: 20,
            marginTop: 20
          },
          textInput: {
            fontSize: 20
          }
        }}
        onPress={(data, details) => {
          setLatUser(details.geometry.location.lat)
          setLngUser(details.geometry.location.lng)
          setAddress(data.description)
        }}
        fetchDetails={true}
        enablePoweredByContainer={false}
        minLength={2}
        query={{
          key: 'AIzaSyC57Oje5UCWuyjn_alA6iYcNDTft-6IpFs',
          language: 'en'
        }}
        nearbyPlacesAPI='GooglePlacesSearch'
        debounce={400}
        />
        <View style={{width: "90%", backgroundColor: "#888", marginLeft: 20, padding: 10, borderRadius: 5, marginTop:20}}>
          <Text style={{color: "#333", fontSize: 20}}>{cartQty}</Text>
        </View>
        <View style={{width: "90%", backgroundColor: "#888", marginLeft: 20, padding: 10, borderRadius: 5, marginTop:20}}>
          <Text style={{color: "#333", fontSize: 20}}>{cartPrice}₫</Text>
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

export default PaymentMethod

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
      padding: 10,
      fontSize: 20,
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