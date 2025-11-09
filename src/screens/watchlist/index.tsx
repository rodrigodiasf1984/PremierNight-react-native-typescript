import { LegendList } from "@legendapp/list"
import React, { useCallback, useMemo } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { Poster } from "../../components/poster"
import { Movie } from "../../domain/types"
import { useWatchlist } from "../../store/watchlistStore"
import { openNetflix } from "../../utils/linking"
import { useDetailsNavigation } from "../details/hooks/useDetailsNavigation"
import { styles } from "./styles"

export function Watchlist() {
    const { items, remove } = useWatchlist()
    const { openMovieDetails } = useDetailsNavigation()

    const handleOpen = useCallback(
        async (item: { url: string; id: number }) => {
            const url = item.url?.toLowerCase() ?? ""
            if (url.includes("netflix")) {
                await openNetflix(item.url)
            } else {
                openMovieDetails(item.id)
            }
        },
        [openMovieDetails]
    )

    const renderItem = useCallback(
        ({ item }: { item: Movie }) => {
            return (
                <View style={styles.row}>
                    <TouchableOpacity
                        onPress={() =>
                            handleOpen({
                                id: item.id,
                                url: item.homepage
                            })
                        }
                        style={styles.left}
                    >
                        <Poster
                            path={item.poster_path}
                            size="w300"
                            style={{ width: 80, height: 120 }}
                        />
                    </TouchableOpacity>
                    <View style={styles.right}>
                        <Text style={styles.title}>{item.title}</Text>
                        <View style={{ height: 8 }} />
                        <TouchableOpacity onPress={() => remove(item.id)}>
                            <Text style={styles.remove}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        },
        [remove, handleOpen]
    )

    const keyExtractor = useCallback((item: Movie) => item.id.toString(), [])

    const contentContainerStyle = useMemo(() => ({ padding: 16 }), [])

    const itemSeparatorComponent = useCallback(
        () => <View style={{ width: 12 }} />,
        []
    )

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text style={styles.header}>Watchlist</Text>
            {items.length === 0 ? (
                <View style={styles.empty}>
                    <Text>No saved films yet.</Text>
                </View>
            ) : (
                <LegendList
                    data={items}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    contentContainerStyle={contentContainerStyle}
                    ItemSeparatorComponent={itemSeparatorComponent}
                />
            )}
        </SafeAreaView>
    )
}

export default Watchlist
