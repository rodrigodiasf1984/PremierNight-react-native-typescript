import { Alert, Linking, Platform } from "react-native"

export const openNetflix = async (netflixUrl: string) => {
    const appScheme = Platform.select({
        ios: "nflx://",
        android: "netflix://"
    })

    const appUrl = appScheme
        ? netflixUrl.replace(/^https?:\/\/(www\.)?/, appScheme)
        : netflixUrl
    try {
        const canOpen = await Linking.canOpenURL(appUrl)
        if (canOpen) {
            await Linking.openURL(appUrl)
        } else {
            await Linking.openURL(netflixUrl)
        }
    } catch (_error) {
        Alert.alert(
            "Error",
            "An error occured while opening netflixApp, trying to open the nextflix website"
        )

        setTimeout(async () => {
            await Linking.openURL(netflixUrl)
        }, 2000)
    }
}
