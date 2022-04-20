import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react'
import { Icon } from 'react-native-elements';

const ClientTabs = createBottomTabNavigator();

import { StyleSheet, Text, View } from 'react-native'
import Home from '../screens/Home';
import Messages from '../screens/Messages';
import Accounts from '../screens/Accounts';
import { colors } from '../global/styles';
import Cart from '../screens/Cart';


const RootClientTabs = () => {
  return (
    <ClientTabs.Navigator
        tabBarOptions = {{
            activeTintColor: colors.buttons
        }}
    >
        <ClientTabs.Screen 
            name='Home'
            component={Home}
            options={{
                tabBarLabel : "Trang chủ",
                tabBarIcon: ({color, size}) => (
                    <Icon 
                        name='home' type='material'
                        color={color} size={size}
                    />
                ),
                headerShown: false
            }}
        />

        <ClientTabs.Screen 
            name='Cart'
            component={Cart}
            options={{
                tabBarLabel : "Thanh toán",
                tabBarIcon: ({color, size}) => (
                    <Icon 
                        name='payment' type='material'
                        color={color} size={size}
                    />
                ),
                headerShown: false
            }}
        />

        <ClientTabs.Screen 
            name='Message'
            component={Messages}
            options={{
                tabBarLabel : "Tin nhắn",
                tabBarIcon: ({color, size}) => (
                    <Icon 
                        name='message' type='material'
                        color={color} size={size}
                    />
                ),
                headerShown: false
            }}
        />

        <ClientTabs.Screen 
            name='Accounts'
            component={Accounts}
            options={{
                tabBarLabel : "Tài khoản",
                tabBarIcon: ({color, size}) => (
                    <Icon 
                        name='person' type='material'
                        color={color} size={size}
                    />
                ),
                headerShown: false
            }}
        />
    </ClientTabs.Navigator>
  )
}

export default RootClientTabs

const styles = StyleSheet.create({})