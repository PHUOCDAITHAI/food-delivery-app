import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, {useState, useEffect} from 'react'
import Header from '../components/Header'
import { colors, parameters } from '../global/styles'
import { Button } from 'react-native-elements'
import {auth, db, storage} from "../config/firebase"
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

const Register = () => {
    const navigation = useNavigation();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);
    useEffect(() => {
        (async () => {
            if(Platform.OS !== "web"){
                const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if(status !== "granted"){
                    alert("Sorry, we need camera roll permissions to make this work!")
                }
            }
        })();
    },[])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });    
        const blob = await new Promise((resolve, reject) => {
            const xhr =  new XMLHttpRequest();
            xhr.onload = function() {
                resolve(xhr.response);
            };
            xhr.onerror = function() {
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', result.uri, true);
            xhr.send(null);
        });
        var uploadTask = storage.ref().child(`userprofile/${Date.now()}`).put(blob);
            uploadTask.on('state_changed', 
            (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if(progress===100){
                    alert("image uploaded")
                }
                
            }, 
            (error) => {
                alert("error uploading image")
            }, 
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    setImage(downloadURL)
                });
            }
        );
    };
    const handleSignUp = () => {
        auth.createUserWithEmailAndPassword(email, password).then((credentials) => {
            db.collection('users').doc(credentials.user.uid).set({
                FullName: fullName,
                Email: email,
                uid: credentials.user.uid,
                Img: image,
                address: "",
                lat: 0,
                lng: 0,
                status:  true
            }).then(() => {
                setFullName('');
                setEmail('');
                setPassword('');
                setImage('');
                navigation.navigate("SignIn")
            }).catch(error => alert(error.message));
        }).catch(error => alert(error.message));
      }
  return (
    <>
        <Header />
        <View style={styles.container}>
        

        <View>
            <Text style={styles.title}>Đăng ký</Text>
        </View>

        <View style={{alignItems: "center"}}>
            <Text style={styles.text1}>Vui lòng nhập họ tên, email và mật khẩu</Text>
            <Text style={styles.text1}>Đăng ký với tài khoản của bạn</Text>
        </View>

        <View style={{marginTop: 20}}>
            <View>
                <TextInput 
                    style={styles.textInput1}
                    placeholder="Họ và tên"
                    value={fullName}
                    onChangeText={text => setFullName(text)}
                />
            </View>
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

        <View style={{marginHorizontal: 20, marginTop: 20}}>
            <Button 
                title='Chọn ảnh'
                buttonStyle={parameters.styledButton}
                titleStyle={parameters.buttonTitle}
                onPress={pickImage}
            />
        </View>

        <View style={{marginHorizontal: 20, marginVertical: 20}}>
            <Button 
                title='Đăng ký'
                disabled={image?false:true}
                buttonStyle={parameters.styledButton}
                titleStyle={parameters.buttonTitle}
                onPress={handleSignUp}
            />
        </View>

    </View>
    </>
    
  )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center"
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