import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import {db, auth} from '../config/firebase'
import { useNavigation } from '@react-navigation/native'
const Messages = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState(null);
  const getUsers = async () => {
    const querySnap = await db.collection('users').where('uid','!=',auth.currentUser.uid).get();
    const allUser = querySnap.docs.map(doc => doc.data());
    setUsers(allUser);
  }

  useEffect(() => {
    getUsers()
  },[])

  const RenderCard = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Chat", {item: item})}
      >
        <View style={styles.mycard}>
          <Image 
            style={styles.img}
            source={{uri: item.Img}}
          />
          <View>
            <View>
              <Text style={styles.text}>{item.FullName}</Text>
            </View>
            <View>
              <Text style={styles.text}>{item.Email}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View>
      <FlatList 
        data={users}
        keyExtractor={(item) => item.uid}
        renderItem={({item}) => (
          <RenderCard item={item} />
        )}
      />
    </View>
  )
}

export default Messages

const styles = StyleSheet.create({
  img: {
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    backgroundColor: "green"
  },
  text: {
    fontSize: 18,
    marginLeft: 15
  },
  mycard: {
    flexDirection: "row",
    margin: 3,
    padding: 4,
    alignItems: "center",
    backgroundColor: "white",
    borderBottomWidth: 2,
    borderBottomColor: "grey"
  }
})