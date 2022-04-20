import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../global/styles'
const CommentDetail = ({comment, useFul, handleUseFul, handleNotHelpful}) => {
    // console.log(comment.useFuls)
    return (
    <View style={styles.container} key={comment.ID}>
        <View style={styles.comment}>
            <View style={styles.nameImg}>
                <Text style={{color: "white"}}>{comment.FullName[0]}</Text>
            </View>
            <Text style={styles.fullName}>{comment.FullName}</Text>
        </View>
        <View style={{marginTop: 5, marginBottom: 5}}>
            <Text style={{fontWeight: "bold"}}>{comment.comment}</Text>
        </View>
        {comment.useFuls ==="yes" && (
            <View>
                <Text>1 người thấy bài đánh giá này hữu ích</Text>
            </View>
        )}
        
        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            <Text>Bài đánh giá này có hữu ích không?</Text>
            <View  
                style={{...styles.useFul}}
                // style={{...styles.useFul, backgroundColor : `${comment.useFuls ==="yes" ? colors.buttons : "white"}`, borderColor : `${comment.useFuls ==="yes" ? colors.buttons : "#86939e"}`}}
            >
                <Text 
                    style={{...styles.textUseful}}
                    // style={{...styles.textUseful, color: `${comment.useFuls ==="yes" ? "white" : "black"}`}}
                    // onPress={() => handleUseFul(comment.ID, comment.comment, comment.currentTime)}
                >Có</Text>
            </View>
            
            <View 
                // style={{...styles.useFul, marginRight: 20, backgroundColor : `${comment.useFuls ==="yes" ? "white" : colors.buttons}`, borderColor : `${comment.useFuls ==="yes" ? "#86939e" : colors.buttons}`}}
                style={{...styles.useFul, marginRight: 20}}
            >
                <Text
                    style={{color: "black"}}
                    // style={{color: `${comment.useFuls ==="yes" ? "black" : "white"}`}}
                    // onPress={() => handleNotHelpful(comment.ID, comment.comment, comment.currentTime)}
                >Không</Text>
            </View>
            
        </View>
    </View>
  )
}

export default CommentDetail

const styles = StyleSheet.create({
    container: {
        marginLeft: 20,
        paddingTop: 10,
        marginBottom: 10
    },
    comment: {
        flexDirection: "row", 
        alignItems: "center",
    },
    nameImg: {
        width: 30,
        height: 30,
        backgroundColor: "blue",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    fullName: {
        marginLeft: 10
    },
    useFul: {
        height: 30,
        width: 50,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        backgroundColor: "white",
        marginRight: -20,
        borderColor: "#86939e"
    },
    textUseful: {
        color: "black"
    },
    isActive: {
        color: "white"
    },
    isActiveBg: {
        backgroundColor: colors.buttons
    }
})