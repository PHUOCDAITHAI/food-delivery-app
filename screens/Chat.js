import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
// import {GiftedChat} from 'react-native-gifted-chat'
import {GiftedChat, Bubble, InputToolbar} from 'react-native-gifted-chat'
import firebase,{ auth, db } from '../config/firebase';
import {Icon} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
const Chat = ({route}) => {
    const navigation = useNavigation();
    const {item} = route.params;
    const [messages, setMessages] = useState([]);
    const uid = auth.currentUser.uid;
    useEffect(() => {
        const docid = item.uid > uid ? uid + "-" + item.uid : item.uid + "-" + uid;
        const messageRef = db.collection('chatrooms').doc(docid).collection('messages').orderBy('createdAt', 'desc')
        messageRef.onSnapshot(snapshot => {
            const allmsg = snapshot.docs.map(doc => {
                const data = doc.data();
                if(data.createdAt){
                    return {
                        ...doc.data(),
                        createdAt: doc.data().createdAt.toDate()
                    }
                }else {
                    return {
                        ...doc.data(),
                        createdAt: new Date()
                    }
                }
            })
            setMessages(allmsg)
        })
    },[])
    const onSend = (messageArray) => {
        const msg = messageArray[0];
        const mymsg = {
            ...msg,
            sentBy: uid,
            sentTo: item.uid,
            createdAt: new Date()
        }
        setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg))
        const docid = item.uid > uid ? uid + "-" + item.uid : item.uid + "-" + uid;
        db.collection('chatrooms').doc(docid).collection('messages').add({
            ...mymsg,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
    }  

    function getImg() {
        const [img, setImg] = useState(null);
        db.collection('users').doc(uid).get().then(doc => {
            setImg(doc.data().Img)
        })
        return img;
    }

    const Img = getImg()
  return (
    <View style={{flex: 1, backgroundColor: "white"}}>
        <View style={styles.header}>
            <View style={{marginHorizontal: 20}}>
                <Icon 
                    type='material-community'
                    name='arrow-left'
                    size={30}
                    onPress={() => navigation.goBack()}
                />
            </View>
            <View style={{marginLeft: 20}}>
                <Text style={{fontSize: 20, fontWeight: "bold"}}>{item.FullName}</Text>
                <Text>onLine</Text>
            </View>
        </View>
       <GiftedChat
            messages={messages}
            onSend={text => onSend(text)}
            user={{
                _id: uid,
                avatar: Img
            }}
            renderBubble={(props) => {
                return <Bubble 
                    {...props}
                    wrapperStyle={{
                        right: {
                            backgroundColor: "green"
                        },
                        
                    }}
                />
            }}

            renderInputToolbar={(props) => {
                return <InputToolbar 
                    {...props}
                    containerStyle={{borderTopWidth: 1.5, borderTopColor: "green"}}
                    textInputStyle = {{color: "black"}}
                />
            }}
        />
    </View>
  )
}

export default Chat

const styles = StyleSheet.create({
    header: {
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        padding: 5,
        flexDirection: "row",
        alignItems: "center"
    }
})