import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import { auth, db } from '../config/firebase'
import { Icon } from 'react-native-elements'
import { colors } from '../global/styles'
import { useNavigation } from '@react-navigation/native'
const Accounts = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [img, setImg] = useState('');
  const uid = auth.currentUser.uid;
  useEffect(() => {
    db.collection('users').doc(uid).get().then((doc) => {
      setFullName(doc.data().FullName);
      setEmail(doc.data().Email);
      setPassword(doc.data().Password);
      setPhone(doc.data().PhoneNumber);
      setImg(doc.data().Img)
    })
  }, [])
  return (
    <ScrollView>
      <View style={{flexDirection: "row", alignItems: "center", margin: 10}}>
        <View>
          {img ? (
            <Image 
              style={{width: 50, height: 50, borderRadius: 50}}
              source={{uri: img}}
            />
          ) : <Text>...</Text>}
        </View>
        <View style={{marginLeft: 10}}>
          <Text style={{fontSize: 20, fontWeight: "bold"}}>{fullName}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditAccount", {fullName: fullName, email: email, password: password, phone: phone, img: img})
            }}
          >
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <Text style={{color: colors.grey3, fontSize: 15, marginRight: 10}}>Chỉnh sửa tài khoản</Text>
              <Icon 
                iconStyle={{color: colors.grey3}} 
                type='material-community' 
                name="chevron-right" 
                size={20}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{margin: 20}}>
        <Text style={{fontSize: 20, fontWeight: "bold"}}>Ưu đãi và tiết kiệm</Text>
      </View>

      <View style={{paddingBottom: 20,flexDirection: "row", justifyContent: "space-between",borderBottomWidth: 1, borderBottomColor: colors.grey4, marginHorizontal: 20}}>
        <Text style={{color: colors.grey3}}>Ưu đãi</Text>
        <Icon 
          iconStyle={{color: colors.grey3}} 
          type='material-community' 
          name="chevron-right" 
          size={20}
        />
      </View>

      <View style={{paddingBottom: 20, flexDirection: "row", justifyContent: "space-between",marginHorizontal: 20, marginVertical: 20,borderBottomWidth: 1, borderBottomColor: colors.grey4,}}>
        <Text style={{color: colors.grey3}}>Gói hội viên</Text>
        <Icon 
          iconStyle={{color: colors.grey3}} 
          type='material-community' 
          name="chevron-right" 
          size={20}
        />
      </View>

      <View style={{paddingBottom: 20, flexDirection: "row", justifyContent: "space-between",marginHorizontal: 20, borderBottomWidth: 1, borderBottomColor: colors.grey4,}}>
        <Text style={{color: colors.grey3}}>Thử thách</Text>
        <Icon 
          iconStyle={{color: colors.grey3}} 
          type='material-community' 
          name="chevron-right" 
          size={20}
        />
      </View>

      <View style={{paddingBottom: 20, flexDirection: "row", justifyContent: "space-between",marginHorizontal: 20, marginVertical: 20,borderBottomWidth: 1, borderBottomColor: colors.grey4,}}>
        <Text style={{color: colors.grey3}}>Giới thiệu</Text>
        <Icon 
          iconStyle={{color: colors.grey3}} 
          type='material-community' 
          name="chevron-right" 
          size={20}
        />
      </View>

      <View style={{marginLeft: 20, marginTop: 10, marginBottom: 10}}>
        <Text style={{fontSize: 20, fontWeight: "bold"}}>Tài khoản của tôi</Text>
      </View>
      
      <View style={{paddingBottom: 20, flexDirection: "row", justifyContent: "space-between",marginHorizontal: 20, marginVertical: 20,borderBottomWidth: 1, borderBottomColor: colors.grey4,}}>
        <Text style={{color: colors.grey3}}>Ưu đãi cho thành viên</Text>
        <Icon 
          iconStyle={{color: colors.grey3}} 
          type='material-community' 
          name="chevron-right" 
          size={20}
        />
      </View>

      <View style={{paddingBottom: 20, flexDirection: "row", justifyContent: "space-between",marginHorizontal: 20,borderBottomWidth: 1, borderBottomColor: colors.grey4,}}>
        <Text style={{color: colors.grey3}}>Đã đặt trước</Text>
        <Icon 
          iconStyle={{color: colors.grey3}} 
          type='material-community' 
          name="chevron-right" 
          size={20}
        />
      </View>

      <View style={{paddingBottom: 20, flexDirection: "row", justifyContent: "space-between",marginHorizontal: 20, marginVertical: 20,borderBottomWidth: 1, borderBottomColor: colors.grey4,}}>
        <Text style={{color: colors.grey3}}>Hồ sơ doanh nghiệp</Text>
        <Icon 
          iconStyle={{color: colors.grey3}} 
          type='material-community' 
          name="chevron-right" 
          size={20}
        />
      </View>

      <View style={{paddingBottom: 20, flexDirection: "row", justifyContent: "space-between",marginHorizontal: 20,borderBottomWidth: 1, borderBottomColor: colors.grey4,}}>
        <Text style={{color: colors.grey3}}>Số liên hệ S.O.S</Text>
        <Icon 
          iconStyle={{color: colors.grey3}} 
          type='material-community' 
          name="chevron-right" 
          size={20}
        />
      </View>

    </ScrollView>
  )
}

export default Accounts

const styles = StyleSheet.create({})