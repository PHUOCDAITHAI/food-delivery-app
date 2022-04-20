import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Chat from "../screens/Chat";
import Details from "../screens/Details";
import EditAccount from "../screens/EditAccount";
import PaymentMethod from "../screens/PaymentMethod";
import PayWithCard from "../screens/PayWithCard";
import Register from "../screens/Register";
import SignIn from "../screens/SignIn"
import SignInWelcome from "../screens/SignInWelcome";
import RootClientTabs from "./ClientTabs";
const Auth = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Auth.Navigator>
            <Auth.Screen 
                name="SignInWelcome" 
                component={SignInWelcome} 
                options={{
                    headerShown: false,
                }}
            />
            <Auth.Screen 
                name="SignIn" 
                component={SignIn} 
                options={{headerShown: false}}
            />
            <Auth.Screen 
                name="Register" 
                component={Register} 
                options={{headerShown: false}}
            />
            <Auth.Screen 
                name="RootClientTabs" 
                component={RootClientTabs} 
                options={{headerShown: false}}
            />
            <Auth.Screen 
                name="Details" 
                component={Details} 
                options={{headerShown: false}}
            />

            <Auth.Screen 
                name="PaymentMethod" 
                component={PaymentMethod} 
                options={{headerShown: false}}
            />

            <Auth.Screen 
                name="PayWithCard" 
                component={PayWithCard} 
                options={{headerShown: false}}
            />

            <Auth.Screen 
                name="EditAccount" 
                component={EditAccount} 
                options={{headerShown: false}}
            />

            <Auth.Screen 
                name="Chat" 
                component={Chat} 
                options={{headerShown: false}}
            />

           
        </Auth.Navigator>
    )
}

export default AuthStack