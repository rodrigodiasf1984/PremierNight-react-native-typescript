import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useCallback } from "react"

import { RootStackParamList } from "../../../navigation/routes"

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

export function useDetailsNavigation() {
    const navigation = useNavigation<NavigationProp>()

    const openMovieDetails = useCallback(
        (movieId: number) => {
            return navigation.navigate("Detail", { id: movieId })
        },
        [navigation]
    )

    return {
        openMovieDetails
    }
}
