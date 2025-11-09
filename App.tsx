/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import "react-native-gesture-handler"

import React from "react"
import { StatusBar, StyleSheet, useColorScheme, View } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { enableScreens } from "react-native-screens"

import Routes from "./src/navigation/routes"

enableScreens()

function App() {
    const isDarkMode = useColorScheme() === "dark"

    return (
        <SafeAreaProvider>
            <StatusBar
                barStyle={isDarkMode ? "light-content" : "dark-content"}
            />
            <AppContent />
        </SafeAreaProvider>
    )
}

function AppContent() {
    return (
        <View style={styles.container}>
            <Routes />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default App
