import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements';
import { colors } from '../global/styles';
import { auth, db } from '../config/firebase';
const IndividualCartProduct = ({individualCartProduct, i, cartProductIncrease, cartProductDecrease}) => {
    const handleDelete = () => {
        const uid = auth.currentUser.uid;
        db.collection("Cart " + uid).doc(individualCartProduct.ID).delete();
    }
    return (
    <>
    <View style={styles.container} >
        <View style={styles.product}>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                {/* <Text style={{fontSize: 16}}>{i++}.</Text> */}
                <Text style={{fontSize: 20, color: colors.grey2, fontWeight: "bold"}}>{individualCartProduct.Title}</Text>
                <TouchableOpacity
                    onPress={handleDelete}
                >
                    <Icon 
                        type='material-community'
                        name='delete'
                        size={25}
                        iconStyle={{color: "red"}}
                    />
                </TouchableOpacity>
            </View>
            
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <View>
                    <Text style={{color: colors.buttons, fontSize: 16}}>{individualCartProduct.TotalProductPrice}₫</Text>
                </View>
                <View style={{flexDirection: "row"}}>
                    <View>
                        <Icon 
                            type='material-community'
                            name='minus'
                            size={25}
                            onPress={() => cartProductDecrease(individualCartProduct)}
                        />
                    </View>
                    <View>
                        <Text style={{color: colors.buttons, fontSize: 16}}>{individualCartProduct.qty}</Text>
                    </View>
                    <View>
                        <Icon 
                            type='material-community'
                            name='plus'
                            size={25}
                            onPress={() => cartProductIncrease(individualCartProduct)}
                        />
                    </View>
                </View>
            </View>
        </View>
        
    </View>
        </>
  )
}

export default IndividualCartProduct

const styles = StyleSheet.create({
    container: {
        // backgroundColor: "blue",
        marginTop: 10,
    },
    product: {
        // flexDirection: "row", 
        justifyContent: "space-between", 
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey4
    }
})