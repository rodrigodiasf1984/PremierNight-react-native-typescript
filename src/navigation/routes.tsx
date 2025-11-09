import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Heart, HomeIcon } from "lucide-react-native"
import React from "react"

import Details from "../screens/details"
import { Home } from "../screens/home"
import Watchlist from "../screens/watchlist"

export type RootStackParamList = {
    Main: undefined
    Detail: { id: number }
}

const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator()

const MainTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "blue",
                tabBarInactiveTintColor: "black"
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: color => (
                        <HomeIcon color={color.color} size={24} />
                    )
                }}
            />
            <Tab.Screen
                name="Watchlist"
                component={Watchlist}
                options={{
                    tabBarIcon: color => <Heart color={color.color} size={24} />
                }}
            />
        </Tab.Navigator>
    )
}

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Main"
                    component={MainTabs}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Detail"
                    component={Details}
                    options={{ title: "Movie" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
