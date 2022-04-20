import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Icon, Button } from 'react-native-elements'
import { colors } from '../global/styles'
const AddToCart = ({product, addToCart}) => {
  return (
        <>
        <View style={styles.addToCart}>
            <View style={{marginLeft: 20}}>
                <View>
                    <Text style={{fontWeight: "bold", fontSize: 20}}>{product.Title}</Text>
                </View>
                <View>
                    <Text style={{color: colors.buttons, fontSize: 18, fontWeight: "bold"}}>$ {product.Price}</Text>
                </View>
            </View>
            <View>
                <Button 
                    title="Thêm vào giỏ hàng"
                    buttonStyle={{marginHorizontal: 20, backgroundColor: colors.buttons}}
                    onPress={() => addToCart(product)}
                />
            </View>
            
        </View>
        <View style={{
            flexDirection: "row", width: "100%",
            marginLeft: 20, alignItems: "center",
            
        }}>
            <Icon 
                name='map-marker'
                type='material-community'
            />
            <Text>{product.address}</Text>
        </View>       
      </>
    
  )
}

export default AddToCart

const styles = StyleSheet.create({
    addToCart: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    
})