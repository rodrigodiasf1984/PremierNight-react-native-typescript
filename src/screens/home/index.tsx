import React, { useCallback, useMemo } from "react"
import { ScrollView, Text, TextInput, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { MovieCard } from "../../components/movie-card"
import { Movie } from "../../domain/types"
import { useDetailsNavigation } from "./hooks/useDetailsNavigation"
import { useHomeViewModel } from "./hooks/useHomeViewModel"
import { LegendListSection } from "./legend-list-section"
import { styles } from "./styles"

const CARD_WIDTH = 140
const SPACING = 12

export function Home() {
    const { loading, search, onSearchChange, popular, topRated, upcoming } =
        useHomeViewModel()
    const { openMovieDetails } = useDetailsNavigation()

    const renderItem = useCallback(
        ({ item }: { item: Movie }) => (
            <MovieCard
                movie={item}
                width={CARD_WIDTH}
                onPress={() => openMovieDetails(item.id)}
            />
        ),
        [openMovieDetails]
    )

    const keyExtractor = useCallback((item: Movie) => item.id.toString(), [])

    const contentContainerStyle = useMemo(
        () => ({ paddingHorizontal: SPACING }),
        []
    )

    const itemSeparatorComponent = useCallback(
        () => <View style={{ width: 12 }} />,
        []
    )

    return (
        <SafeAreaView testID="safe-area-view-home" style={styles.container}>
            <Text style={styles.header}>Spotlight Home</Text>

            <TextInput
                placeholder="Search by title..."
                value={search}
                onChangeText={onSearchChange}
                style={styles.search}
                returnKeyType="search"
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50 }}
            >
                {popular.length > 0 && (
                    <LegendListSection
                        title="Popular"
                        data={popular}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        contentContainerStyle={contentContainerStyle}
                        itemSeparatorComponent={itemSeparatorComponent}
                    />
                )}
                {topRated.length > 0 && (
                    <LegendListSection
                        title="Top Rated"
                        data={topRated}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        contentContainerStyle={contentContainerStyle}
                        itemSeparatorComponent={itemSeparatorComponent}
                    />
                )}
                {upcoming.length > 0 && (
                    <LegendListSection
                        title="Upcoming"
                        data={upcoming}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        contentContainerStyle={contentContainerStyle}
                        itemSeparatorComponent={itemSeparatorComponent}
                    />
                )}
                {loading && <Text style={styles.loading}>Loading...</Text>}
            </ScrollView>
        </SafeAreaView>
    )
}
