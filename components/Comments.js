import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import { colors } from '../global/styles'
import { Button } from 'react-native-elements'
import firebase,{db, auth} from '../config/firebase';
import CommentDetail from './CommentDetail';
const Comments = ({product}) => {
    const [comment, setComment] = useState('');
    function GetCurrentUser() {
        const [user, setUser] = useState(null);
        useEffect(() => {
          auth.onAuthStateChanged(user => {
            if(user){
              db.collection('users').doc(user.uid).get().then(doc => {
                setUser(doc.data().FullName);
              })
            }else {
              setUser(null)
            }
          })
        }, [])
        return user;
      }

    const uidUser = auth.currentUser.uid;
    
    const user = GetCurrentUser();
    const userName = user
    const handleClick = () => {
        db.collection("Products").doc(product.ID).collection("Comments").add({
            FullName: userName,
            comment: comment,
            currentTime: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            setComment('');
        })   
    }
    const [comments, setComments] = useState([]);
    const getComments =  async () => {
        const Comments = await db.collection('Products').doc(product.ID).collection('Comments').orderBy("currentTime", "desc").get();
        const CommentsArray = [];
        for(var snap of Comments.docs){
            var data = snap.data();
            data.ID = snap.id;
            CommentsArray.push({
                ...data
            })
            if(CommentsArray.length === Comments.docs.length){
                setComments(CommentsArray);
            }
        }
    }
    useEffect(() => {
        getComments();
    })


    


    // const handleUseFul = (idComment, comment, currentTime) => {
    //     db.collection("Products").doc(product.ID).collection("Comments").doc(idComment).set({
    //         FullName: userName,
    //         comment: comment,
    //         currentTime: currentTime,
    //         useFuls: "yes",
    //     })
    // }

    // const handleNotHelpful = (idComment, comment, currentTime) => {
    //     db.collection("Products").doc(product.ID).collection("Comments").doc(idComment).update({
    //         FullName: userName,
    //         comment: comment,
    //         currentTime: currentTime,
    //         useFuls: "no",
    //     })
    // }
  return (
    <View>
         <View style={styles.headerTextView}>
            <Text style={styles.headerText}>Bình luận</Text>
        </View>
        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <TextInput 
                placeholder='Mời bạn bình luận hoặc đặt câu hỏi...'
                style={styles.textInput}
                value={comment}
                onChangeText={(text) => setComment(text)}
            />
            <View style={{marginTop: -1}}>
                <Button 
                    title="Gửi"
                    buttonStyle={{backgroundColor: colors.buttons}}
                    onPress={handleClick}
                />
            </View>
        </View>
        <View>
            {comments && comments.map(comment => (
                <>
                    <CommentDetail 
                        key={comment.ID}
                        comment={comment} 
                        // handleUseFul={handleUseFul}
                        // handleNotHelpful={handleNotHelpful}
                    />
                    
                </>
                
            ))}
        </View>   
    </View>
  )
}

export default Comments

const styles = StyleSheet.create({
    headerText: {
        color: colors.grey2,
        fontSize: 22,
        fontWeight: "bold",
        paddingLeft: 10,
    },
    headerTextView: {
        backgroundColor: colors.grey5,
        paddingVertical: 2,
        marginTop: 10,
        marginBottom: 10,        
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: "#86939e",
        marginBottom: 10,
        paddingLeft: 10,
        padding: 5,
        width: "90%"
    },
    
})