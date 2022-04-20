import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, {useState} from 'react'

const CashOnDelivery = () => {
    const [cell, setCell] = useState('');
    const [address, setAddress] = useState('');
  return (
    <View>
        <View style={{marginTop: 20}}>
            <TextInput 
                style={styles.textInput}
                placeholder='Số điện thoại'
                value={cell}
                onChangeText={text => setCell(text)}
            />
        </View>
        
    </View>
  )
}

export default CashOnDelivery

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        borderColor: "#86939e",
        marginHorizontal: 20,
        borderRadius: 12,
        marginBottom: 20,
        paddingLeft: 15,
        padding: 5,
        paddingHorizontal: 100
    },
})