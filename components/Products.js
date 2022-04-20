import { StyleSheet, Text, View, FlatList, Pressable, Image, ScrollView } from 'react-native'
import React, {useState} from 'react'
import {MenuItems} from '../global/Data';
import { colors } from '../global/styles';
import {Icon} from 'react-native-elements'
import IndividualProduct from './IndividualProduct';
const Products = ({products, addToCart}) => {
    const [indexCheck, setIndexCheck] = useState(1);
    const [productsFilter, setProductsFilter] = useState(products.filter(product => product.itemId === "monquay"));
    const handleClick = (id, itemId) => {
        setIndexCheck(id)
        setProductsFilter(products.filter(product => product.itemId === itemId))
    }
    return (
    <View>
        <View style={styles.headerTextView}>
            <Text style={styles.headerText}>Phân loại </Text>
        </View>
        <View>
            <FlatList 
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={MenuItems}
                keyExtractor={item => item.id}
                extraData={indexCheck}
                renderItem={({item, index}) => (
                    <Pressable
                        onPress={() => handleClick(item.id, item.itemId)}
                    >
                        <View style={indexCheck === item.id ? {...styles.smallCardSelected} : {...styles.smallCard}}>
                            <Image 
                                style={{height: 60, width: 60, borderRadius: 30}}
                                source={{uri: item.imgSrc}}
                            />
                            <View>
                                <Text style={indexCheck === item.id ? {...styles.smallCardTextSelected} : {...styles.smallCardText}}>{item.name}</Text>
                            </View>
                        </View>
                    </Pressable>
                )}
            />
        </View>
        <View style={styles.headerTextView}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <Text style={styles.headerText}>Món ngon cho bạn </Text>
                <View>
                    <Icon 
                        type='material'
                        name='arrow-right'
                    />
                </View>
            </View>
        </View>
        <ScrollView>
            <View style={{marginBottom: 550}}>
                {productsFilter.map(product => (
                    <View key={product.ID}>
                        <IndividualProduct addToCart={addToCart} product={product} />
                    </View>
                ))}
            </View>
        </ScrollView>
    </View>
  )
}

export default Products

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
    smallCard: {
        borderRadius: 30,
        backgroundColor: colors.grey5,
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        width: 80,
        margin: 10,
        height: 100
      },
      smallCardSelected: {
        borderRadius: 30,
        backgroundColor: colors.buttons,
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        width: 80,
        margin: 10,
        height: 100
      },
      smallCardTextSelected :{
        fontWeight: "bold",
        color: colors.cardbackground
      },
      smallCardText :{
        fontWeight: "bold",
        color: colors.grey2
      },
      floatButton: {
        position: 'absolute',
        bottom: 10,
        right: 15,
        backgroundColor: 'white',
        elevation: 10,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center'
      },
      
})