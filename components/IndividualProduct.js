import { StyleSheet, Text, View, ScrollView, TouchableOpacity,Dimensions, Image } from 'react-native'
import React from 'react'
import { colors } from '../global/styles';
import Products from './Products';
import { useNavigation } from '@react-navigation/native';
const SCREEN_WIDTH = Dimensions.get('window').width;

const IndividualProduct = ({product, addToCart}) => {
    const navigation = useNavigation();
  return (
    <TouchableOpacity
        onPress={() => {
            navigation.navigate("Details", {product: product, addToCart: addToCart})
        }}
    >
        <View style={styles.product}>
            <View>
                <Image 
                    style={{...styles.image, width: SCREEN_WIDTH*0.8}}
                    source={{uri: product.Img}}
                />
            </View>
            <View>
                <View>
                    <Text style={{fontWeight: "bold", fontSize: 20}}>{product.Title}</Text>
                </View>
                <View>
                    <Text style={{fontSize: 18}}>{product.Price} ₫</Text>
                </View>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default IndividualProduct

const styles = StyleSheet.create({
    product: {
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        borderWidth: 1,
        borderColor: colors.grey4,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        width: SCREEN_WIDTH*0.9,
        marginLeft: 20,
    },
    image: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        height: 200,
    },
    restaurantName: {
        fontSize: 17,
        fontWeight: 'bold',
        color: colors.grey1,
        marginTop: 5,
        marginLeft: 10
    },
})