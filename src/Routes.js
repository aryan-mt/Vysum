import {
    StyleSheet,
    Image
} from 'react-native';
import { Provider } from 'react-redux'
import { NavigationContainer, StackActions } from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';

import HomeScreen from './HomeScreen'
import SplashScreen from './SplashScreen'
import SignupScreen from './SignupScreen'
import LoginScreen from './LoginScreen'
import RewardScreen from './RewardScreen'
import ProgressScreen from './ProgressScreen'
import ProfileScreen from './ProfileScreen'
import DeviceScreen from './DeviceScreen'
import store from './redux/store'


const HomeStack = createStackNavigator()

function HomeStackScreen() {
    return (
        <HomeStack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false
            }}
        >
            <HomeStack.Screen
                name="HomeScreen"
                options={{
                    header: () => null
                }}
                component={HomeScreen}
            />
        </HomeStack.Navigator>
    )
}

const ProfileStack = createStackNavigator()

function ProfileStackScreen() {
    return (
        <HomeStack.Navigator
            initialRouteName="ProfileScreen"
            screenOptions={{
                headerShown: false
            }}
        >
            <HomeStack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
            />
            <HomeStack.Screen
                name="Device"
                component={DeviceScreen}
            />
        </HomeStack.Navigator>
    )
}



const Tab = createBottomTabNavigator()

function TabScreen() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor:"#004b31",
                tabBarInactiveTintColor:"grey",
            }}

        >
            <Tab.Screen
                name="Home"
                component={HomeStackScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        color = focused ? "#004b31" : "grey"
                        return (
                            <Image
                                source={require("../assets/icons/home_icon.png")}
                                style={{ height: 30, width: 30, tintColor: color }}
                            />
                        )
                    }
                }}
            />
            <Tab.Screen
                name="Rewards"
                component={RewardScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        color = focused ? "#004b31" : "grey"
                        return (
                            <Image
                                source={require("../assets/icons/reward_icon.png")}
                                style={{ height: 30, width: 30, tintColor: color }}
                            />
                        )
                    }
                }}
            />
            <Tab.Screen
                name="Progress"
                component={ProgressScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        color = focused ? "#004b31" : "grey"
                        return (
                            <Image
                                source={require("../assets/icons/progress_icon.png")}
                                style={{ height: 30, width: 30, tintColor: color }}
                            />
                        )
                    }
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStackScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        color = focused ? "#004b31" : "grey"
                        return (
                            <Image
                                source={require("../assets/icons/profile_icon.png")}
                                style={{ height: 30, width: 30, tintColor: color }}
                            />
                        )
                    }
                }}
            />
        </Tab.Navigator>
    )
}

const LoginStack = createStackNavigator()

export default function Routes() {
    return (
        <Provider store={store}>
                <NavigationContainer>
                    <LoginStack.Navigator
                        initialRouteName="Splash"
                        screenOptions={{
                            headerShown: false
                        }}
                    >
                        <LoginStack.Screen
                            name="Splash"
                            component={SplashScreen}
                        />
                        <LoginStack.Screen
                            name="Signup"
                            component={SignupScreen}
                        />
                        <LoginStack.Screen
                            name="Login"
                            component={LoginScreen}
                        />
                        <LoginStack.Screen
                            name="Tab"
                            component={TabScreen}
                        />
                    </LoginStack.Navigator>
                </NavigationContainer>
        </Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
    },
    text: {
        textAlign: 'center'
    }

});