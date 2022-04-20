import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {colors, parameters} from "../global/styles";
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
        <View style={{marginLeft: 20, marginTop: 4}}>
            <Icon 
              type='material-community'
              name='arrow-left'
              color={colors.headerText}
              size={28}
              onPress={() => {
                navigation.goBack()
              }}
            />
        </View>
        <View>
            <Text style={styles.headerText}>TÀI KHOẢN CỦA TÔI</Text>
        </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        backgroundColor: colors.buttons,
        height: 40
    },
    headerText: {
        color:  colors.headerText,
        fontSize: 22,
        fontWeight: "bold",
        marginLeft: 30,
        marginTop: 4
    }
})