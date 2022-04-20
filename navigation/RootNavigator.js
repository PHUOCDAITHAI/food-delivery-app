import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./authNavigator";
const RootNavigator = () => {
    return (
        <NavigationContainer>
            <AuthStack />
        </NavigationContainer>
    )
}

export default RootNavigator