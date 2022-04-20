import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, {useState} from 'react'
import Header from '../components/Header'
import { colors, parameters } from '../global/styles'
import { Button, SocialIcon } from 'react-native-elements'
import {auth} from "../config/firebase"
import { useNavigation } from '@react-navigation/native'
const SignIn = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = () => {
        auth.signInWithEmailAndPassword(email, password).then(() => {
            setEmail('');
            setPassword('');
            navigation.navigate("RootClientTabs")
            // setTimeout(() => {
            //     navigation.navigate("RootClientTabs")
            // }, 1500);
        }).catch(error => alert(error.message));
      }
  return (
    <View style={styles.container}>
        <Header />

        <View>
            <Text style={styles.title}>Đăng nhập</Text>
        </View>

        <View style={{alignItems: "center"}}>
            <Text style={styles.text1}>Vui lòng nhập email và mật khẩu</Text>
            <Text style={styles.text1}>Đăng ký với tài khoản của bạn</Text>
        </View>

        <View style={{marginTop: 20}}>
            <View>
                <TextInput 
                    style={styles.textInput1}
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
            </View>
            <View>
                <TextInput 
                    style={styles.textInput2}
                    placeholder="Mật khẩu"
                    secureTextEntry
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
            </View>
        </View>

        <View style={{marginHorizontal: 20, marginVertical: 20}}>
            <Button 
                title='Đăng nhập'
                buttonStyle={parameters.styledButton}
                titleStyle={parameters.buttonTitle}
                onPress={handleLogin}
            />
        </View>

        <View style={{alignItems: "center", marginTop: 10, marginBottom: 20}}>
            <Text style={{fontSize: 20, fontWeight: "bold"}}>HOẶC</Text>
        </View>

        <View style={{marginHorizontal: 11}}>
            <SocialIcon 
                title='Đăng nhập với Facebook'
                button
                type='facebook'
                style={styles.SocialIcon}
                onPress={() => {
                    navigation.navigate("RootClientTabs")
                }}
            />
        </View>

        <View style={{marginHorizontal: 11}}>
            <SocialIcon 
                title='Đăng nhập với Google'
                button
                type='google'
                style={styles.SocialIcon}
            />
        </View>

        <View style={{alignItems: "flex-end", marginHorizontal: 20, marginTop: 20}}>
            <Button 
                title="Tạo tài khoản mới"
                buttonStyle={styles.createButton}
                titleStyle={styles.createButtonTitle}
                onPress={() => {
                    navigation.navigate("Register")
                }}
            />
        </View>

    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    title: {
        color: colors.buttons,
        fontWeight: "bold",
        padding: 10,
        fontSize: 18
    },
    text1: {
        color:  colors.grey3,
        fontSize: 16
    },
    textInput1: {
        borderWidth: 1,
        borderColor: "#86939e",
        marginHorizontal: 20,
        borderRadius: 12,
        marginBottom: 20,
        paddingLeft: 15,
        padding: 5
    },
    textInput2: {
        borderWidth: 1,
        borderRadius: 12,
        marginHorizontal: 20,
        borderColor: "#86939e",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        paddingLeft: 15,
        padding: 5
    },
    SocialIcon: {
        borderRadius: 12,
        height: 50
    },
    createButton: {
        backgroundColor: "white",
        alignContent: "center",
        justifyContent: "center",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#ff8c52",
        height: 40,
        paddingHorizontal: 20
    },
    createButtonTitle: {
        color: "#ff8c52",
        fontSize: 16,
        fontWeight: "bold",
        alignItems: "center",
        justifyContent: "center",
        marginTop: -3
    }
})