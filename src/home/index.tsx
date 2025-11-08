import { LegendList } from "@legendapp/list"
import React, { useEffect, useState } from "react"
import { Alert, Image, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { fetchPopular, posterUrl } from "../api/movies"
import { MovieResultItem } from "../api/types"

const CARD_WIDTH = 140
const CARD_HEIGHT = 210
const CARD_SPACING = 12

export function Home() {
    const [movies, setMovies] = useState<MovieResultItem[]>([])

    useEffect(() => {
        const getPopularMovies = async () => {
            try {
                const response = await fetchPopular()
                setMovies(response.results)
            } catch (error) {
                Alert.alert("Error", "Error fetching popular movies" + error)
            }
        }

        getPopularMovies()
    }, [])

    const renderItem = ({ item }: { item: MovieResultItem }) => (
        <View style={styles.card}>
            {item.poster_path && (
                <Image
                    source={{ uri: posterUrl(item.poster_path) ?? undefined }}
                    style={styles.poster}
                />
            )}
            <Text style={styles.title} numberOfLines={2}>
                {item.title}
            </Text>
        </View>
    )

    return (
        <SafeAreaView testID="safe-area-view-home" style={styles.container}>
            <Text style={styles.header}>Spotlight Home</Text>
            <LegendList
                data={movies ?? []}
                renderItem={renderItem}
                keyExtractor={item => String(item.id)}
                recycleItems
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: CARD_SPACING }}
                ItemSeparatorComponent={() => (
                    <View style={{ width: CARD_SPACING }} />
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    card: {
        alignItems: "center",
        width: CARD_WIDTH
    },
    // eslint-disable-next-line react-native/no-color-literals
    container: { backgroundColor: "white", flex: 1, paddingTop: 16 },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 16,
        marginLeft: 16
    },
    poster: {
        borderRadius: 10,
        height: CARD_HEIGHT,
        resizeMode: "cover",
        width: CARD_WIDTH
    },
    title: {
        fontSize: 14,
        fontWeight: "500",
        marginTop: 6,
        textAlign: "center"
    }
})
