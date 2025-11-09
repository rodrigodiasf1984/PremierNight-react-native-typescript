import React, { memo } from "react"
import { Text, TouchableOpacity, View } from "react-native"

import { Movie } from "../../domain/types"
import { Poster } from "../poster"
import { styles } from "./styles"

type MovieCardProps = {
    movie: Movie
    width?: number
    onPress?: () => void
}

export const MovieCard = memo(
    ({ movie, width = 140, onPress }: MovieCardProps) => {
        return (
            <TouchableOpacity
                style={[styles.card, { width }]}
                onPress={onPress}
                accessibilityLabel={`Open details for ${movie.title}`}
                activeOpacity={0.8}
            >
                <View style={{ width, height: (width * 3) / 2 }}>
                    <Poster path={movie.poster_path} />
                </View>
                <Text style={styles.title} numberOfLines={2}>
                    {movie.title}
                </Text>
            </TouchableOpacity>
        )
    }
)

MovieCard.displayName = "MovieCard"
