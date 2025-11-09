import { RouteProp, useRoute } from "@react-navigation/native"
import React from "react"
import { Button, ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { Poster } from "../../components/poster"
import { RootStackParamList } from "../../navigation/routes"
import { useDetailViewModel } from "./hooks/useDetailViewModel"
import { styles } from "./styles"

type DetailRoute = RouteProp<RootStackParamList, "Detail">

const Details = () => {
    const route = useRoute<DetailRoute>()
    const movieId = route.params.id

    const { movie, isSaved, toggleWatchlist } = useDetailViewModel(movieId)
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <View style={styles.posterWrap}>
                    <Poster
                        path={movie?.poster_path}
                        size="w500"
                        style={styles.poster}
                    />
                </View>
                <Text style={styles.title}>{movie?.title}</Text>
                <Text style={styles.meta}>
                    {movie?.release_date} •{" "}
                    {movie?.genres.map(g => g.name).join(", ")}
                </Text>
                <View style={{ height: 12 }} />
                <Text style={styles.overview}>{movie?.overview}</Text>
                <View style={{ height: 18 }} />
                <Button
                    title={
                        isSaved ? "Remove from Watchlist" : "Add to Watchlist"
                    }
                    onPress={toggleWatchlist}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Details
