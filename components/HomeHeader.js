import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { colors, parameters } from '../global/styles'
import { Icon, withBadge } from 'react-native-elements'
import Logo from '../images/delivery.png'
import { useNavigation } from '@react-navigation/native'
import { auth, db } from '../config/firebase'
const HomeHeader = () => {
    const navigation = useNavigation();
    const [totalProducts, setTotalProducts] = useState(0);
    const BadgeIcon = withBadge(totalProducts)(Icon);
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user){
                db.collection('Cart ' + user.uid).onSnapshot(snapshot => {
                    const totalQty = snapshot.docs.length;
                    setTotalProducts(totalQty);
                })
            }else {
                console.log("Chua dang nhap")
            }
        }) 
    }, [])
  return (
    <View style={styles.header}>
        <View style={{alignItems: "center", justifyContent: "center", marginLeft: 15}}>
            <Image 
                source={Logo}
                style={{height: 50, width: 50}}
            />
        </View>

        <View style={{alignItems: "center", justifyContent: "center"}}>
            <Text style={{color: colors.cardbackground, fontSize: 25, fontWeight: "bold"}}>GoodFood</Text>
        </View>

        <TouchableOpacity
            onPress={() => {
                navigation.navigate("Cart")
            }}
        >
            <View style={{alignItems: "center", justifyContent: "center", marginRight: 15}}>
                <BadgeIcon 
                    type="material-community"
                    name="cart"
                    size={35}
                    color={colors.cardbackground}
                />
            </View>
        </TouchableOpacity>
       
    </View>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        backgroundColor: colors.buttons,
        height: parameters.headerHeight,
        justifyContent: "space-between"
    }
})