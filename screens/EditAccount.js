import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'
import { colors, parameters } from '../global/styles';
import { Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../config/firebase';
const EditAccount = ({route}) => {
    const navigation = useNavigation();
    const {fullName, email, phone, img} = route.params;
    const [name, setName] = useState(fullName);
    const [cell, setCell] = useState(phone);
    const [email1, setEmail1] = useState(email);
    const uid = auth.currentUser.uid;
    const handleUpdate = () => {
        db.collection('users').doc(uid).update({
            Email: email1,
            FullName: name,
            PhoneNumber: cell,
        }).then(() => {
            navigation.navigate("Home")
        })
    }
    const handleSignOut = () => {
        auth.signOut().then(() => {
            navigation.navigate("SignIn");
        })
    }
  return (
      <>
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
            <Text style={{color: colors.cardbackground, fontSize: 25, fontWeight: "bold"}}>Chỉnh sửa tài khoản</Text>
        </View>

        <View style={{alignItems: "center", justifyContent: "center", marginRight: 15}}>
            
        </View>
       
        </View>
        <View style={{alignItems: "center", justifyContent: "center", marginTop: 10}}>
            <Image 
                style={{width: 50, height: 50, borderRadius: 50}}
                source={{uri: img}}
            />
      </View>
        <View style={{marginLeft: 20}}>
            <Text style={{fontSize: 18, color: colors.grey2}}>Tên</Text>
            <TextInput 
                value={name}
                onChangeText={text => setName(text)}
                style={{borderBottomWidth: 1,borderBottomColor: colors.grey4,marginRight: 20, paddingTop: 5, paddingBottom: 5, fontSize: 16}}
            />
            <Text style={{fontSize: 18, color: colors.grey2, marginTop: 10}}>Số điện thoại</Text>
            <TextInput 
                value={cell}
                onChangeText={text => setCell(text)}
                style={{borderBottomWidth: 1,borderBottomColor: colors.grey4,marginRight: 20, paddingBottom: 5, fontSize: 16}}
            />
            <Text style={{fontSize: 18, color: colors.grey2, marginTop: 10}}>Địa chỉ email</Text>
            <TextInput 
                value={email1}
                onChangeText={text => setEmail1(text)}
                style={{borderBottomWidth: 1,borderBottomColor: colors.grey4,marginRight: 20, paddingBottom: 5, fontSize: 16}}
            />
            <View style={{marginRight: 20, marginTop: 10}}>
                <Button 
                    onPress={handleUpdate}
                    title="Sửa"
                    buttonStyle={{backgroundColor: colors.buttons}}
                    titleStyle={{fontSize: 20}}
                />
            </View>
        </View>
        <View style={styles.headerTextView}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <Text style={styles.headerText}>Đã liên kết tài khoản </Text>
            </View>
        </View>
        <View style={{marginLeft: 20}}>
            <View style={{flexDirection: "row", alignItems: "center", marginTop: 20, borderBottomWidth: 1, marginRight: 20, paddingBottom: 20, borderBottomColor: colors.grey4}}>
                <Icon 
                    type='material-community'
                    name='facebook'
                    size={30}
                    iconStyle={{color: "blue"}}
                />
                <Text style={{fontSize: 16,marginLeft: 10}}>Facebook</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: "center", marginTop: 20, borderBottomWidth: 1, marginRight: 20, paddingBottom: 20, borderBottomColor: colors.grey4}}>
                <Icon 
                    type='material-community'
                    name='google'
                    size={28}
                    iconStyle={{color: "red"}}
                />
                <Text style={{fontSize: 16,marginLeft: 10}}>Google</Text>
            </View>
        </View>
        
        </View>
        <View style={styles.bottom}> 
            <View>
                <TouchableOpacity
                    onPress={handleSignOut}
                >
                    <Text style={{fontSize: 20, fontWeight: "bold", color: colors.grey2}}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
            <View style={{marginTop: 5, marginBottom: 10}}>
                <Text style={{fontSize: 18, color: "red", fontWeight: "bold"}}>Trung tâm trợ giúp</Text>
            </View>
        </View>
    </>
  )
}

export default EditAccount

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        backgroundColor: colors.buttons,
        height: parameters.headerHeight,
        justifyContent: "space-between"
    },
    bottom: {
        marginTop: 10,
        backgroundColor: colors.grey5,
        height: 80,
        justifyContent: "center",
        alignItems: "center"
    },
    headerText: {
        color: colors.grey2,
        fontSize: 18,
        fontWeight: "bold",
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    headerTextView: {
        backgroundColor: colors.grey5,
        paddingVertical: 2,
        marginTop: 20,
        marginBottom: 10,        
    },
})