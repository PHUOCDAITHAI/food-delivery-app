import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React, {useState} from 'react'
import { colors } from '../global/styles'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
const DetailHeader = ({product}) => {
    const navigation = useNavigation();
    const [liked, setLiked] = useState(false);
  return (
    <View style={styles.container}>
        <ImageBackground 
            style={styles.container}
            source={{uri: product.Img}}
        >
        <View style={styles.view1}>
            <View style={styles.view2}>
                <Icon 
                    name='arrow-left'
                    type='material-community'
                    color={"black"}
                    size={25}
                    onPress={() => {
                        navigation.goBack()
                    }}
                />
            </View>
            <View style={styles.view3}>
                <Icon 
                    name={liked ? "favorite" : "favorite-border"}
                    type="material"
                    color={"red"}
                    size={25}
                    onPress={() => setLiked(!liked)}
                />
            </View>
        </View>
        <View style={styles.view4}>
            {liked && (
                <Icon 
                    name='favorite' size={100}
                    color="red" type='material'
                />
            )}
        </View>
        
        </ImageBackground>
    </View>
  )
}

export default DetailHeader

const styles = StyleSheet.create({
    container: {
        height: 200,
        overflow: "hidden"
    },
    view1: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between'
    },
    view2: {
        margin: 10,
        width: 40,
        backgroundColor: colors.cardbackground,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20
    },
    view3: {
        marginTop: 0,
        margin: 10,
        width: 40,
        height: 40,
        backgroundColor: colors.cardbackground,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20
    },
    view4: {
        marginTop: 0,
        alignItems: "center",
        justifyContent: "center"
    }
})