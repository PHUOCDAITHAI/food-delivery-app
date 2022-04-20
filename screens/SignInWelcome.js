import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { colors, parameters } from '../global/styles'
import Swiper from 'react-native-swiper'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
const SignInWelcome = () => {
    const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
        <View style={{flex: 3, alignItems: "center", marginTop: 20}}>
            <Text style={styles.text}>CHÀO MỪNG BẠN ĐẾN VỚI</Text>
            <Text style={styles.text}>GOODFOOD</Text>
        </View>

        <View style={{flex: 4, justifyContent: "center"}}>
            <Swiper autoplay={true}>
                <View style={styles.slide1}>
                    <Image 
                        source={{uri: "https://firebasestorage.googleapis.com/v0/b/fooddeliveryapp-d5dfd.appspot.com/o/product-images%2Fburger6.png?alt=media&token=f717db12-d3ad-4be0-bc71-e51ff1bd5131"}}
                        style={{height: "100%", width: "100%"}}
                    />
                </View>
                <View style={styles.slide2}>
                    <Image 
                        source={{uri: "https://firebasestorage.googleapis.com/v0/b/fooddeliveryapp-d5dfd.appspot.com/o/product-images%2Fhdog4.png?alt=media&token=eb265621-ee6a-4e10-b4e9-c9573e091517"}}
                        style={{height: "100%", width: "100%"}}
                    />
                </View>
                
                <View style={styles.slide3}>
                    <Image 
                        source={{uri: "https://firebasestorage.googleapis.com/v0/b/fooddeliveryapp-d5dfd.appspot.com/o/product-images%2Fsnack6.png?alt=media&token=f8d53a85-ef25-4fee-a943-f8303cc892e5"}}
                        style={{height: "100%", width: "100%"}}
                    />
                </View>
            </Swiper>
        </View>

        <View style={{flex: 4, justifyContent: "flex-end", marginBottom: 20}}>
            <View style={{marginHorizontal: 20, marginTop: 20}}>
                <Button 
                    title="Đăng nhập"
                    buttonStyle={parameters.styledButton}
                    titleStyle={parameters.buttonTitle}
                    onPress={() => {
                        navigation.navigate("SignIn")
                    }}
                />
            </View>
            <View style={{marginHorizontal: 20, marginTop: 20}}>
                <Button 
                    title="Tạo một tài khoản mới"
                    buttonStyle={styles.createButton}
                    titleStyle={styles.createButtonTitle}
                    onPress={() => {
                        navigation.navigate("Register")
                    }}
                />
            </View>
        </View>

    </View>
  )
}

export default SignInWelcome

const styles = StyleSheet.create({
    text: {
        fontSize: 26,
        color: colors.buttons,
        fontWeight: "bold"
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#9DD6EB"
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#97CAE5"
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#92BBD9"
    },
    createButton: {
        backgroundColor: "white",
        alignContent: "center",
        justifyContent: "center",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#ff8c52",
        height: 40,
        paddingHorizontal: 20,
        borderColor: colors.buttons
    },
    createButtonTitle: {
        color: colors.grey1,
        fontSize: 20,
        fontWeight: "bold",
        alignItems: "center",
        justifyContent: "center",
        marginTop: -3
    }
})